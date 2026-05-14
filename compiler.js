const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];

if (!inputFile) {
    console.error("Chybi ti soubor, pyco! Napis: node compiler.js jmeno_souboru.os");
    process.exit(1);
}

const outputFile = inputFile.replace(/\.os$/, '.ts');

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
    'mensy': '<',
    'mensyrovno': '<=',
    'vetsy': '>',
    'vetsyrovno': '>=',
  
    'toz': 'let',
    'konstatuj': 'const',

    'laces': 'true',
    'bokdepa': 'false',
    'dryst': 'string',
    'lacesnebochuj': 'boolean',
    'cyslo': 'number',
    'chuj': 'null',
    'kokot': 'undefined',
    'nist': 'void',
    'dynamit': 'any',
    'slyb': 'Promise',

    'rubat': 'while',
    'typ': 'type',

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

    // Pole 
    'preber': 'filter',
    'premapuj': 'map',
    'vsecky': 'forEach',
    'prypychni': 'push',
    
    // Cykly
    'pro': 'for',
    'jebnato': 'break',
    'dalsy': 'continue',

    // Logika / Error
    'mrdni': 'throw',
    'naposled': 'finally',
    'pruser': 'Error',
    'typni': 'typeof',
    
    'vrat': 'yield',

    'buchta': 'Record', 
    'seznam': 'Array', 
    'vlastnost': 'keyof', 
    
    'buchtoklyce': 'Object.keys',
    'buchtohody': 'Object.values',
    'rozemel': '...'
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
    const outputTS = transpile(inputCode);
    
    const head = `// --- KOMPILOVANO Z OSTRASCRIPTU ---
// --- NEEDITOVAT ---  

`;

    const finalCode = head + outputTS;

    fs.writeFileSync(outputFile, finalCode);
    console.log(`[OstraScript] ✅ Hotovo, pyco! Najdes to v: ${outputFile}`);
} catch (err) {
    console.error("Doslo k chybe:", err.message);
}