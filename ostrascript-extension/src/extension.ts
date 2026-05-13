import * as vscode from "vscode";

const legend = new vscode.SemanticTokensLegend(
  ["parameter", "type", "function"],
  [],
);
const diagnostics = vscode.languages.createDiagnosticCollection("ostrascript");

const ostrascriptDocs: { [key: string]: string } = {
  kalfas: "Definuje novou funkci. Tady se míchá kód.",
  fajront: "Končíme! Vyhodí výsledek z funkce ven (return).",
  kaj: "Když (if). Jestli to platí, tak se rubá dál.",
  inak: "Jinak (else). Když to předtím neklaplo.",
  kajinak: "Nebo když (else if). Další šance pro tvůj kód.",
  ci: "Nebo (||). Stačí, když platí aspoň jedna věc.",
  aj: "A zároveň (&&). Musí platit oboje, jinak máš smůlu.",
  cibit: "Bitové NEBO (|).",
  ajbit: "Bitové A (&).",
  toz: "Deklaruje proměnnou (let). Do tohohle si můžeš něco schovat.",
  konstatuj: "Konstanta (const). Na tohle se nesahá, to je dané napevno.",
  laces: "Jasná věc (true). Pravda, o které se nediskutuje.",
  bokdepa: "Ani náhodou (false). Tohle prostě neplatí.",
  rubat: "Dokud (while). Bude se makat, dokud podmínka dovolí.",
  pyco: "Tečka za větou (;). Bez tohohle příkaz neprojde.",
  hovor: "Vypíše hlášku (console.log). Ať lidi vidí, co se děje.",
  tryda: "Šablona pro objekty (class). Tady se rodí ty tvoje buchty.",
  zkus: "Zkus to provést (try). Uvidíme, jestli se to nepodělá.",
  chujstym: "Když se to posralo (catch). Tady se řeší průšvihy.",
  fofrem: "Asynchronní funkce (async). Nebude to zdržovat ostatní.",
  pockej: "Počkej na výsledek (await). Žádný spěch, až to bude, tak to bude.",
  novabuchta: "Vytvoří novou instanci (new). Nový kousek do sbírky.",
  tohle: "Odkaz na sebe sama (this). Tohle je moje!",
  zrus: "Smaže vlastnost nebo objekt (delete). Už to nepotřebujeme.",
  vythani: "Natáhne kód odjinud (import).",
  posly: "Pošle kód do světa (export). Ať ho můžou rubat i ostatní.",
  dynamit:
    "Dynamický typ (any). Můžeš tam vrazit co chceš, ale na vlastní nebezpečí!",
  cyslo: "Typ pro čísla. Na sčítání výplaty nebo piv.",
  dryst: "Typ pro textové řetězce.",
  lacesnebochuj: "Logický typ (true/false).",
  chuj: "Prázdnota (null). Vůbec nic tam není.",
  kokot: "Nedefinováno (undefined). Kdo ví, co to je za nesmysl.",
  nist: "Prázdnota (void)",
  slyb: "Použito u fofr funkcí, aby bylo jedno jestli se to posere",
  preber: "Vybere ze seznamu jenom to, co stoji za to.",
  premapuj: "Prekopane kazdy prvek v seznamu na neco jineho.",
  vsecky: "Projede vsecky prvky v seznamu, nenecha ani jeden.",
  prypychni: "Hodi novou vec na konec seznamu.",
  pro: "Klasicky cyklus. Rubas, dokud ti staci dech.",
  jebnato: "Okamzite s tim sekne a vyskoci z cyklu.",
  dalsy: "Vysere se na zbytek v tomhle kolecku a jede hned dalsi).",
  mrdni: "Vysle do sveta chybu, kdyz se ti neco nezda.",
  naposled: "Tohle se stane vzdycky, i kdyby cely kod lehnul.",
  pruser: "Objekt s prusvihem, kdyz se neco posere.",
  typni: "Zjisti, co je to sakra za typ.",
  vrat: "Vrati hodnotu z generatoru (yield).",
  buchta: "Slovnik plny klicu a hodnot.",
  seznam: "Klasicke pole.",
  vlastnost: "Vytahne vsecky klice z buchty.",
  typ: "Definovani vlastnich typu, kdyz ti dryst a cyslo nestaci",
  buchtoklyce: "Vytahne vsecky nazvy (klice) z tvoji buchty.",
  buchtohody: "Vytahne vsecky hodnoty, co jsou v buchte schovane.",
  rozemel: "Rozsype pole nebo buchtu na kousky.",
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
    provideHover(document, position) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);
      const documentation = ostrascriptDocs[word];
      if (documentation) {
        return new vscode.Hover(new vscode.MarkdownString(`**Ostrascript:** ${documentation}`));
      }
    },
  });
  context.subscriptions.push(hoverProvider);

  const completionProvider = vscode.languages.registerCompletionItemProvider(
    "ostrascript",
    {
      provideCompletionItems(document, position, token, context) {
        if (context.triggerCharacter === ".") {
          const linePrefix = document.lineAt(position).text.substring(0, position.character);
          const variableMatch = linePrefix.match(/(\b[a-zA-Z_$][\w$]*)\s*\.$/);

          if (variableMatch) {
            const variableName = variableMatch[1];
            const documentText = document.getText();
            
            const typeRegex = new RegExp(
                `(?:konstatuj|toz|let)\\s+${variableName}\\s*:\\s*([\\w\\d\\[\\]]+)` + 
                `|` +
                `\\b${variableName}\\s*:\\s*([\\w\\d\\[\\]]+)`, 
                "g"
            );
            
            let match;
            let varType: string | null = null;
            while ((match = typeRegex.exec(documentText)) !== null) {
              varType = match[1] || match[2] || null;
            }

            if (varType) {
              if (varType.includes("[]") || varType === "seznam") {
                return getArrayMethods();
              }
              // if (varType === 'dryst') { return getStringMethods(); }
            }
          }
          return [];
        }

        const completions: vscode.CompletionItem[] = [];
        const text = document.getText();
        const varRegex = /\b(?:toz|konstatuj|typ|let)\s+([a-zA-Z_$][\w$]*)/g;
        let varMatch;
        const seenVariables = new Set<string>();

        while ((varMatch = varRegex.exec(text)) !== null) {
            const varName = varMatch[1];
            if (!seenVariables.has(varName)) {
                const item = new vscode.CompletionItem(varName, vscode.CompletionItemKind.Variable);
                item.detail = "Tvoje promenna/typ z Ostrascriptu";
                completions.push(item);
                seenVariables.add(varName);
            }
        }

        for (const key in ostrascriptDocs) {
          const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Keyword);
          item.documentation = new vscode.MarkdownString(ostrascriptDocs[key]);
          completions.push(item);
        }
        
        return completions;
      },
    },
    "." // Trigger character
  );
  context.subscriptions.push(completionProvider);

  function getArrayMethods(): vscode.CompletionItem[] {
    const completions: vscode.CompletionItem[] = [];
    const arrayMethods = ["preber", "premapuj", "vsecky", "prypychni"];
    arrayMethods.forEach(m => {
        const item = new vscode.CompletionItem(m, vscode.CompletionItemKind.Method);
        item.documentation = new vscode.MarkdownString(ostrascriptDocs[m]);
        completions.push(item);
    });
    return completions;
  }

  const validateTypes = (document: vscode.TextDocument) => {
    if (document.languageId !== "ostrascript") return;
    const text = document.getText();
    const errors: vscode.Diagnostic[] = [];
    const activeEditor = vscode.window.activeTextEditor;
    const currentLine = activeEditor?.selection.active.line;

    const missingTypeRegex = /\b(konstatuj|toz)\s+([a-zA-Z_$][\w$]*)\s*=(?![^=]*:)/g;
    let missingTypeMatch;
    while ((missingTypeMatch = missingTypeRegex.exec(text))) {
        const keyword = missingTypeMatch[1];
        const varName = missingTypeMatch[2];
        const line = document.positionAt(missingTypeMatch.index).line;
        const range = new vscode.Range(
            line, 
            missingTypeMatch[0].indexOf(varName), 
            line, 
            missingTypeMatch[0].indexOf(varName) + varName.length
        );

        errors.push(
            new vscode.Diagnostic(
              range,
              `Chachare, u promenne '${varName}' ti chybi typova anotace! Pridej tam dvojtecku a typ.`,
              vscode.DiagnosticSeverity.Error,
            ),
        );
    }
    
    for (let i = 0; i < document.lineCount; i++) {
        if (i === currentLine) continue;
        const line = document.lineAt(i);
        const rawText = line.text;
        const trimmed = rawText.trim();
        if (!trimmed || trimmed.endsWith("{") || trimmed.endsWith("}") || trimmed.endsWith("[") || trimmed.endsWith("]") || trimmed.endsWith(",") || trimmed.startsWith("//")) {
            continue;
        }
        const codePart = rawText.split("//")[0].trim();
        if (codePart.length > 0 && !codePart.endsWith("pyco")) {
            const endPos = line.firstNonWhitespaceCharacterIndex + codePart.length;
            const range = new vscode.Range(i, Math.max(0, endPos - 4), i, endPos);
            errors.push(new vscode.Diagnostic(range, "Chachare, chybi ti 'pyco' na konci radku! Bez toho to nerubne.", vscode.DiagnosticSeverity.Error));
        }
    }

    diagnostics.set(document.uri, errors);
  };
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(validateTypes),
    vscode.workspace.onDidChangeTextDocument((e) => validateTypes(e.document)),
    vscode.workspace.onDidCloseTextDocument((doc) => diagnostics.delete(doc.uri)),
  );
  vscode.workspace.textDocuments.forEach(validateTypes);
}


class OstraSemanticProvider implements vscode.DocumentSemanticTokensProvider {
  async provideDocumentSemanticTokens(
    document: vscode.TextDocument,
  ): Promise<vscode.SemanticTokens> {
    const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
    const text = document.getText();
    const allTokens: { range: vscode.Range; type: string }[] = [];
    const definedParams = new Set<string>();

    const definedFunctionNames = new Set<string>();

    const funcDecRegex =
      /(?:konstatuj|toz)\s+([a-zA-Z_$][\w$]*)\s*=\s*(?:fofrem\s*)?(?:(?:\(.*\):.*?=\s*\{)|(?:.*=>))/g;
    let funcMatch: RegExpExecArray | null;
    while ((funcMatch = funcDecRegex.exec(text))) {
      const funcName = funcMatch[1];
      if (funcName) {
        definedFunctionNames.add(funcName);

        const nameIndex = funcMatch.index + funcMatch[0].indexOf(funcName);
        allTokens.push({
          range: new vscode.Range(
            document.positionAt(nameIndex),
            document.positionAt(nameIndex + funcName.length),
          ),
          type: "function",
        });
      }
    }

    const lines = text.split(/\r?\n/);
    lines.forEach((lineText, lineNum) => {
      definedFunctionNames.forEach((funcName) => {
        const regex = new RegExp(`\\b${funcName}\\b`, "g");
        let usageMatch: RegExpExecArray | null;
        while ((usageMatch = regex.exec(lineText))) {
          const isAlreadyTokenized = allTokens.some(
            (t) =>
              t.range.start.line === lineNum &&
              t.range.start.character === usageMatch!.index,
          );

          if (!isAlreadyTokenized) {
            allTokens.push({
              range: new vscode.Range(
                lineNum,
                usageMatch.index,
                lineNum,
                usageMatch.index + funcName.length,
              ),
              type: "function",
            });
          }
        }
      });
    });

    const paramRegex =
      /(?:\(([^)]*)\)\s*(?::\s*[\w<>\[\]]+)?\s*=>)|(\w+)\s*=>|(?:(?:kalfas|chujstym)\s*\w*\s*\(([^)]*)\))/g;
    let match: RegExpExecArray | null;
    while ((match = paramRegex.exec(text)) !== null) {
      const containerContent = match[1] ?? match[2] ?? match[3] ?? "";
      if (!containerContent.trim()) continue;

      const params = containerContent.split(",");
      params.forEach((p: any) => {
        const parts = p.split(":");
        const paramName = parts[0].trim();
        const typeName = parts[1] ? parts[1].trim() : null;

        if (paramName && !/^[0-9]/.test(paramName)) {
          definedParams.add(paramName);

          const nameIdxInP = p.indexOf(paramName);
          const absNameIdx =
            match!.index +
            (match![0].lastIndexOf(p) >= 0 ? match![0].lastIndexOf(p) : 0) +
            nameIdxInP;

          allTokens.push({
            range: new vscode.Range(
              document.positionAt(absNameIdx),
              document.positionAt(absNameIdx + paramName.length),
            ),
            type: "parameter",
          });

          if (typeName) {
            const typeIdxInP = p.indexOf(typeName);
            const absTypeIdx =
              match!.index +
              (match![0].lastIndexOf(p) >= 0 ? match![0].lastIndexOf(p) : 0) +
              typeIdxInP;

            allTokens.push({
              range: new vscode.Range(
                document.positionAt(absTypeIdx),
                document.positionAt(absTypeIdx + typeName.length),
              ),
              type: "type",
            });
          }
        }
      });
    }

    lines.forEach((lineText, lineNum) => {
      definedParams.forEach((paramName) => {
        const regex = new RegExp(`\\b${paramName}\\b`, "g");
        let m;
        while ((m = regex.exec(lineText)) !== null) {
          const isDuplicate = allTokens.some(
            (t) =>
              t.range.start.line === lineNum &&
              t.range.start.character === m!.index,
          );

          if (!isDuplicate) {
            allTokens.push({
              range: new vscode.Range(
                lineNum,
                m.index,
                lineNum,
                m.index + paramName.length,
              ),
              type: "parameter",
            });
          }
        }
      });
    });

    allTokens.sort((a, b) => {
      if (a.range.start.line !== b.range.start.line)
        return a.range.start.line - b.range.start.line;
      return a.range.start.character - b.range.start.character;
    });

    allTokens.forEach((t) => tokensBuilder.push(t.range, t.type));
    return tokensBuilder.build();
  }
}
