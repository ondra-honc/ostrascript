import * as vscode from 'vscode';

const legend = new vscode.SemanticTokensLegend(['parameter'], []);

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { language: 'ostrascript' },
            new OstraSemanticProvider(),
            legend
        )
    );
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