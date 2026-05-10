import * as vscode from "vscode";

const legend = new vscode.SemanticTokensLegend(["parameter", "type"], []);
const diagnostics = vscode.languages.createDiagnosticCollection("ostrascript");

const ostrascriptDocs: { [key: string]: string } = {
  // Funkce a vracení
  kalfas: "Definuje novou funkci. Tady se míchá kód.",
  fajront: "Končíme! Vyhodí výsledek z funkce ven (return).",

  // Podmínky a logika
  kaj: "Když (if). Jestli to platí, tak se rubá dál.",
  inak: "Jinak (else). Když to předtím neklaplo.",
  kajinak: "Nebo když (else if). Další šance pro tvůj kód.",
  ci: "Nebo (||). Stačí, když platí aspoň jedna věc.",
  aj: "A zároveň (&&). Musí platit oboje, jinak máš smůlu.",
  cibit: "Bitové NEBO (|).",
  ajbit: "Bitové A (&).",

  // Proměnné
  toz: "Deklaruje proměnnou (let). Do tohohle si můžeš něco schovat.",
  konstatuj: "Konstanta (const). Na tohle se nesahá, to je dané napevno.",

  // Hodnoty
  laces: "Jasná věc (true). Pravda, o které se nediskutuje.",
  bokdepa: "Ani náhodou (false). Tohle prostě neplatí.",

  // Cykly a ukončení
  rubat: "Dokud (while). Bude se makat, dokud podmínka dovolí.",
  pyco: "Tečka za větou (;). Bez tohohle příkaz neprojde.",

  // Systémové věci
  hovor: "Vypíše hlášku (console.log). Ať lidi vidí, co se děje.",
  tryda: "Šablona pro objekty (class). Tady se rodí ty tvoje buchty.",

  // Error handling a asynchronita
  zkus: "Zkus to provést (try). Uvidíme, jestli se to nepodělá.",
  chujstym: "Když se to posralo (catch). Tady se řeší průšvihy.",
  fofrem: "Asynchronní funkce (async). Nebude to zdržovat ostatní.",
  pockej: "Počkej na výsledek (await). Žádný spěch, až to bude, tak to bude.",

  // Objekty a moduly
  novabuchta: "Vytvoří novou instanci (new). Nový kousek do sbírky.",
  tohle: "Odkaz na sebe sama (this). Tohle je moje!",
  zrus: "Smaže vlastnost nebo objekt (delete). Už to nepotřebujeme.",
  vythani: "Natáhne kód odjinud (import).",
  posly: "Pošle kód do světa (export). Ať ho můžou rubat i ostatní.",

  // Datové typy
  dynamit:
    "Dynamický typ (any). Můžeš tam vrazit co chceš, ale na vlastní nebezpečí!",
  cyslo: "Typ pro čísla. Na sčítání výplaty nebo piv.",
  dryst: "Typ pro textové řetězce.",
  lacesnebochuj: "Logický typ (true/false).",
  chuj: "Prázdnota (null). Vůbec nic tam není.",
  kokot: "Nedefinováno (undefined). Kdo ví, co to je za nesmysl.",
  ništ: "Prázdnota (void)",
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider(
      { language: "ostrascript" },
      new OstraSemanticProvider(),
      legend,
    ),
  );

  const hoverProvider = vscode.languages.registerHoverProvider("ostrascript", {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      const documentation = ostrascriptDocs[word];

      if (documentation) {
        return new vscode.Hover(
          new vscode.MarkdownString(`**Ostrascript:** ${documentation}`),
        );
      }

      return undefined;
    },
  });

  context.subscriptions.push(hoverProvider);

  const validateTypes = (document: vscode.TextDocument) => {
    if (document.languageId !== "ostrascript") return;

    const text = document.getText();
    const errors: vscode.Diagnostic[] = [];

    const paramRegex = /(?:kalfas\s+\w*\s*|chujstym\s*)\(([^)]+)\)/g;
    let m: any;
    while ((m = paramRegex.exec(text)) !== null) {
      const content = m[1];
      const openingParenIndex = m[0].indexOf("(");
      const params = content.split(",");
      let currentOffset = 0;

      params.forEach((p: any) => {
        if (!p.includes(":") && p.trim().length > 0) {
          const trimmed = p.trim();
          const startIdx =
            m.index +
            openingParenIndex +
            1 +
            content.indexOf(trimmed, currentOffset);
          const startPos = document.positionAt(startIdx);
          const endPos = document.positionAt(startIdx + trimmed.length);

          errors.push(
            new vscode.Diagnostic(
              new vscode.Range(startPos, endPos),
              "Chachare, u parametru ti chybi typ! Napis tam aspon ': dynamit'.",
              vscode.DiagnosticSeverity.Error,
            ),
          );
        }
        currentOffset += p.length + 1;
      });
    }

    const constRegex = /\bkonstatuj\s+([a-zA-Z_$][\w$]*)/g;
    let c: any;
    while ((c = constRegex.exec(text)) !== null) {
      const varName = c[1];
      const matchEnd = c.index + c[0].length;

      const restOfText = text.substring(matchEnd);

      if (!/^\s*:/.test(restOfText)) {
        const startIdx = c.index + c[0].lastIndexOf(varName);
        const startPos = document.positionAt(startIdx);
        const endPos = document.positionAt(startIdx + varName.length);

        errors.push(
          new vscode.Diagnostic(
            new vscode.Range(startPos, endPos),
            `U konstanty '${varName}' musis uvest typ! Napis: konstatuj ${varName}: dryst = ...`,
            vscode.DiagnosticSeverity.Error,
          ),
        );
      }
    }

    diagnostics.set(document.uri, errors);
  };

  const completionProvider = vscode.languages.registerCompletionItemProvider(
    "ostrascript",
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
      ) {
        const completions: vscode.CompletionItem[] = [];

        const range = document.getWordRangeAtPosition(position);

        for (const key in ostrascriptDocs) {
          const item = new vscode.CompletionItem(key);

          if (range) {
            item.range = range;
          }

          if (
            ["dryst", "cyslo", "lacesnebochuj", "dynamit", "ništ"].includes(key)
          ) {
            item.kind = vscode.CompletionItemKind.TypeParameter;
          } else {
            item.kind = vscode.CompletionItemKind.Keyword;
          }

          item.documentation = new vscode.MarkdownString(ostrascriptDocs[key]);
          completions.push(item);
        }

        return completions;
      },
    },
  );

  context.subscriptions.push(completionProvider);

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(validateTypes),
    vscode.workspace.onDidChangeTextDocument((e) => validateTypes(e.document)),
    vscode.workspace.onDidCloseTextDocument((doc) =>
      diagnostics.delete(doc.uri),
    ),
  );

  vscode.workspace.textDocuments.forEach(validateTypes);
}

class OstraSemanticProvider implements vscode.DocumentSemanticTokensProvider {
  async provideDocumentSemanticTokens(
    document: vscode.TextDocument,
  ): Promise<vscode.SemanticTokens> {
    const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
    const text = document.getText();

    const definedParams = new Set<string>();
    const paramContainerRegex =
      /(?:kalfas\s+\w+\s*\(|chujstym\s*\()\s*([^)]+)\)/g;
    let match: any;

    while ((match = paramContainerRegex.exec(text)) !== null) {
      const containerContent = match[1];
      const params = containerContent.split(",");

      params.forEach((p: any) => {
        const parts = p.split(":");
        const paramName = parts[0].trim();
        const typeName = parts[1] ? parts[1].trim() : null;

        if (paramName) {
          definedParams.add(paramName);

          const nameIdx = p.indexOf(paramName);
          const absNameIdx = match.index + match[0].indexOf(p) + nameIdx;
          const startPosName = document.positionAt(absNameIdx);
          tokensBuilder.push(
            new vscode.Range(
              startPosName,
              startPosName.translate(0, paramName.length),
            ),
            "parameter",
          );

          if (typeName) {
            const typeIdx = p.indexOf(typeName);
            const absTypeIdx = match.index + match[0].indexOf(p) + typeIdx;
            const startPosType = document.positionAt(absTypeIdx);
            tokensBuilder.push(
              new vscode.Range(
                startPosType,
                startPosType.translate(0, typeName.length),
              ),
              "type",
            );
          }
        }
      });
    }

    const lines = text.split(/\r?\n/);
    lines.forEach((lineText, lineNum) => {
      definedParams.forEach((paramName) => {
        const regex = new RegExp(`\\b${paramName}\\b`, "g");
        let m;
        while ((m = regex.exec(lineText)) !== null) {
          tokensBuilder.push(lineNum, m.index, paramName.length, 0, 0);
        }
      });
    });

    return tokensBuilder.build();
  }
}
