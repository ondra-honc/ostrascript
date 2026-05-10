import * as vscode from 'vscode';

const legend = new vscode.SemanticTokensLegend(['parameter'], []);

const ostrascriptDocs: { [key: string]: string } = {
    // Funkce a vracení
    "kalfas": "Definuje novou funkci. Tady se míchá kód.",
    "fajront": "Končíme! Vyhodí výsledek z funkce ven (return).",

    // Podmínky a logika
    "kaj": "Když (if). Jestli to platí, tak se rubá dál.",
    "inak": "Jinak (else). Když to předtím neklaplo.",
    "kajinak": "Nebo když (else if). Další šance pro tvůj kód.",
    "ci": "Nebo (||). Stačí, když platí aspoň jedna věc.",
    "aj": "A zároveň (&&). Musí platit oboje, jinak máš smůlu.",
    "cibit": "Bitové NEBO (|).",
    "ajbit": "Bitové A (&).",

    // Proměnné
    "toz": "Deklaruje proměnnou (let). Do tohohle si můžeš něco schovat.",
    "konstatuj": "Konstanta (const). Na tohle se nesahá, to je dané napevno.",

    // Hodnoty
    "laces": "Jasná věc (true). Pravda, o které se nediskutuje.",
    "bokdepa": "Ani náhodou (false). Tohle prostě neplatí.",
    "chuj": "Prázdnota (null). Vůbec nic tam není.",
    "kokot": "Nedefinováno (undefined). Kdo ví, co to je za nesmysl.",

    // Cykly a ukončení
    "rubat": "Dokud (while). Bude se makat, dokud podmínka dovolí.",
    "pyco": "Tečka za větou (;). Bez tohohle příkaz neprojde.",

    // Systémové věci
    "hovor": "Vypíše hlášku (console.log). Ať lidi vidí, co se děje.",
    "tryda": "Šablona pro objekty (class). Tady se rodí ty tvoje buchty.",

    // Error handling a asynchronita
    "zkus": "Zkus to provést (try). Uvidíme, jestli se to nepodělá.",
    "chujstym": "Když se to posralo (catch). Tady se řeší průšvihy.",
    "fofrem": "Asynchronní funkce (async). Nebude to zdržovat ostatní.",
    "pockej": "Počkej na výsledek (await). Žádný spěch, až to bude, tak to bude.",

    // Objekty a moduly
    "novabuchta": "Vytvoří novou instanci (new). Nový kousek do sbírky.",
    "tohle": "Odkaz na sebe sama (this). Tohle je moje!",
    "zrus": "Smaže vlastnost nebo objekt (delete). Už to nepotřebujeme.",
    "vythani": "Natáhne kód odjinud (import).",
    "posly": "Pošle kód do světa (export). Ať ho můžou rubat i ostatní."
};

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { language: 'ostrascript' },
            new OstraSemanticProvider(),
            legend
        )
    );

    const hoverProvider = vscode.languages.registerHoverProvider('ostrascript', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            const documentation = ostrascriptDocs[word];

            if (documentation) {
                return new vscode.Hover(new vscode.MarkdownString(`**Ostrascript:** ${documentation}`));
            }

            return undefined;
        }
    });

    context.subscriptions.push(hoverProvider);
}

class OstraSemanticProvider implements vscode.DocumentSemanticTokensProvider {
    async provideDocumentSemanticTokens(document: vscode.TextDocument): Promise<vscode.SemanticTokens> {
        const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
        const text = document.getText();
        
        const definedParams = new Set<string>();
        const paramRegex = /(?:kalfas\s+\w+\s*\(|chujstym\s*\()\s*([^)]+)\)/g;
        let match;
        
        while ((match = paramRegex.exec(text)) !== null) {
            const params = match[1].split(',').map(p => p.trim());
            params.forEach(p => definedParams.add(p));
        }

        const lines = text.split(/\r?\n/);
        lines.forEach((lineText, lineNum) => {
            definedParams.forEach(paramName => {
                const regex = new RegExp(`\\b${paramName}\\b`, 'g');
                let m;
                while ((m = regex.exec(lineText)) !== null) {
                    tokensBuilder.push(lineNum, m.index, paramName.length, 0, 0);
                }
            });
        });

        return tokensBuilder.build();
    }
}