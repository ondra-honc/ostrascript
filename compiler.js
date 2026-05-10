const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];

if (!inputFile) {
    console.error("Chybi ti soubor, pyco! Napis: node ostra.js jmeno_souboru.os");
    process.exit(1);
}

const outputFile = inputFile.replace(/\.os$/, '.js');

const mapping = {
    'kalfas': 'function',
    'fajront': 'return',
  
    'kaj': 'if',
    'inak': 'else',
    'kajinak': 'else if',
    'ci': '||',
    'aj': '&&',
    'cibit': '|',
    'ajbit': '&',
  
    'toz': 'let',
    'konstatuj': 'const',

    'laces': 'true',
    'bokdepa': 'false',
    'dryst': 'string',
    'lacesnebochuj': 'boolean',
    'cyslo': 'number',
    'chuj': 'null',
    'kokot': 'undefined',
    'ništ': 'void',
    'dynamit': 'any',

    'rubat': 'while',

    'pyco': ';',

    'hovor': 'console.log',
    
    'tryda': 'class',
    
    //Metody
    'chujstym': 'catch',
    'zkus': 'try',
    'fofrem': 'async',
    'pockej': 'await',
    'novabuchta': 'new',
    'tohle': 'this',
    'zrus': 'delete',
    'vythani': 'import',
    'posly': 'export',
};

function transpile(code) {
    const regex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[\s\S]*?`|\b\w+\b)/g;
    return code.replace(regex, (match) => {
        if (match.startsWith('/') || match.startsWith('"') || match.startsWith("'") || match.startsWith('`')) {
            return match;
        }
        return mapping[match] || match;
    });
}

try {
    console.log(`[OstraScript] 🛠️  Root soubor: ${inputFile}`);
    const inputCode = fs.readFileSync(inputFile, 'utf8');
    const outputJS = transpile(inputCode);
    
    fs.writeFileSync(outputFile, outputJS);
    console.log(`[OstraScript] ✅ Hotovo, pyco! Najdes to v: ${outputFile}`);
} catch (err) {
    console.error("Doslo k chybe:", err.message);
}