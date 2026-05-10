# Ostrascript

**Ostrascript** je nejostřejší nadstavba nad JavaScriptem, určená pro ty, co nemají čas na zbytečné kecy kolem webového programování. Zatímco se ostatní patlají s JavaScriptem, ty už máš hotovo, bo píšeš v jazyce, který má řád.

> "Bo na webu neni čas na pičoviny!"

## Proč Ostrascript?
JavaScript je dneska všude, ale chybí mu ta správná ocelová nátura. Ostrascript bere to nejlepší z JS a dává tomu ostravský punc. 

- Žádné `function`, ale **kalfas**.
- Žádné `return`, ale **fajront**.
- Žádný `console.log`, prostě **hovor**.

## Příklad ##
Zde je takový průměrný JavaScriptový program:
```javascript
async function nactiData(url) {
    try {
        let data = await console.log(url) ;
        return data ;
    } catch (chyba) {
        console.log("Se to posralo: " + chyba) ;
    }
}

function pozdrav(jmeno) {
    let zprava = "Zdar " + jmeno ;
    console.log(zprava) ;
    return true ;
}

pozdrav("Chachare") ;
```

Ale takhle by vypadal v inovativním jazyku pro ostraváky:
```javascript
fofrem kalfas nactiData(url) {
    zkus {
        toz data = pockej hovor(url) pyco
        fajront data pyco
    } chujstym (chyba) {
        hovor("Se to posralo: " + chyba) pyco
    }
}

kalfas pozdrav(jmeno) {
    toz zprava = "Zdar " + jmeno pyco
    hovor(zprava) pyco
    fajront laces pyco
}

pozdrav("Chachare") pyco
```

## Klíčový slova ##

| Ostrascript | JavaScript 
| :--- | :--- 
| `kalfas` | `function`
| `fajront` | `return`
| `toz` | `let` 
| `konstatuj` | `const` 
| `kaj` | `if` 
| `inak` | `else` 
| `kajinak` | `else if`
| `rubat` | `while` 
| `hovor` | `console.log` 
| `pyco` | `;` 
| `novabuchta` | `new` 
| `tohle` | `this` 

## Logické operátory a hodnoty

| Ostrascript | JavaScript 
| :--- | :--- 
| `aj` | `&&` 
| `ci` | `\|\|` 
| `ajbit` | `&` 
| `cibit` | `\|` 
| `laces` | `true` 
| `bokdepa` | `false` 
| `chuj` | `null` 
| `kokot` | `undefined` 

## Asynchronní robota a chyby

| Ostrascript | JavaScript 
| :--- | :--- 
| `zkus` | `try` 
| `chujstym` | `catch` 
| `fofrem` | `async` 
| `pockej` | `await` 
| `vythani` | `import`
| `posly` | `export`

## Podpora pro editory

Pokud nejsi blázen a nepíšeš kód v poznámkovém bloku, tak v adresáři `/ostrascript-extension` najseš podporu pro VS Code.¨
- Barví klíčová slova
- Automaticky doplňuje závorky
- Poznává `.os` soubory
Instalaci provedeš přes `Install from VSIX` v extension menu.

### Kompilace
Kód v Ostrascriptu převedeš na standardní JavaScript příkazem:
```bash
node compiler.js tvuj_kod.os
```
Tím zkompiluješ `.os` na `.js` a ihned to můžeš použít na webu.

## License
Dělej si s tím co chceš, ale nebuď chuj a přiznej barvu, odkud to máš.