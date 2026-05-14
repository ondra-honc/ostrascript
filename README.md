# Ostrascript

**Ostrascript** je nejostřejší nadstavba nad TypeScriptem, určená pro ty, co nemají čas na zbytečné kecy kolem webového programování. Zatímco se ostatní patlají s TypeScriptem, ty už máš hotovo, bo píšeš v jazyce, který má řád.

> "Bo na webu neni čas na pičoviny!"

## Proč Ostrascript?
TypeScript je dneska všude, ale chybí mu ta správná ocelová nátura. Ostrascript bere to nejlepší z JS a dává tomu ostravský punc. 

- Žádné `function`, ale **kalfas**.
- Žádné `return`, ale **fajront**.
- Žádný `console.log`, prostě **hovor**.

## Příklad ##
Zde je takový průměrný TypeScriptový program:
```typescript
async function nactiData(url: string): Promise<any> {
    try {
        let data = await console.log(url) ;
        return data ;
    } catch (chyba: any) {
        console.log("Se to posralo: " + chyba) ;
    }
}

function pozdrav(jmeno: string): boolean {
    let zprava = "Zdar " + jmeno ;
    console.log(zprava) ;
    return true ;
}

pozdrav("Chachare") ;
```

Ale takhle by vypadal v inovativním jazyku pro ostraváky:
```typescript
fofrem kalfas nactiData(url: dryst): slyb<dynamit> {
    zkus {
        toz data = pockej hovor(url) pyco
        fajront data pyco
    } chujstym (chyba: dynamit) {
        hovor("Se to posralo: " + chyba) pyco
    }
}

kalfas pozdrav(jmeno: dryst): lacesnebochuj {
    toz zprava: dryst = "Zdar " + jmeno pyco
    hovor(zprava) pyco
    fajront laces pyco
}

pozdrav("Chachare") pyco
```

- Jazyk ostrascript obsahuje striktní typování a středník na konci řádku

## Klíčový slova ##

| Ostrascript | TypeScript 
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
| `typ` | `type`
| `preber` | `filter`
| `premapuj` | `map`
| `vsecky` | `forEach`
| `prypychni` | `push`
| `pro` | `for`
| `jebnato` | `break`
| `dalsy` | `continue`
| `mrdni` | `throw`
| `naposled` | `finally`
| `pruser` | `Error`
| `typni` | `typeof`
| `vrat` | `yield`
| `buchta` | `Record`
| `seznam` | `Array`
| `vlastnost` | `keyof`
| `buchtoklyce` | `Object.keys`
| `buchtohody` | `Object.values`
| `rozemel` | `...`

## Logické operátory a hodnoty

| Ostrascript | TypeScript 
| :--- | :--- 
| `aj` | `&&` 
| `ci` | `\|\|` 
| `ajbit` | `&` 
| `cibit` | `\|` 
| `mensy` | `<`
| `mensyrovno` | `<=`
| `vetsy` | `>`
| `vetsyrovno` | `>=`
| `laces` | `true` 
| `bokdepa` | `false` 

## Asynchronní robota a chyby

| Ostrascript | TypeScript 
| :--- | :--- 
| `zkus` | `try` 
| `chujstym` | `catch` 
| `fofrem` | `async` 
| `pockej` | `await` 
| `vythani` | `import`
| `posly` | `export`
| `slyb` | `Promise`

## Typy v Ostrascriptu
| Ostrascript | TypeScript 
| :--- | :--- 
| `dryst` | `string` 
| `cyslo` | `number` 
| `lacesnebochuj` | `boolean` 
| `dynamit` | `any` 
| `nist` | `void`
| `chuj` | `null` 
| `kokot` | `undefined` 


## Podpora pro editory 

Pokud chceš Ostrascript editovat jako pán a mít všechno správně obarvené musíš si zprovoznit extension.

### Příprava vývojového prostředí
V adresáři `/ostrascript-extension` je potřeba nejdříve stáhnout závislosti, aby fungovalo inteligentní barvení:

1. Otevři terminál v složce extension.
2. Inicializuj a stáhni moduly:
   ```bash
   npm init -y
   npm install --save-dev typescript vscode-test @types/vscode @types/node
   ```
3. Zkompiluj do Typescriptu:
   ```bash
   npm run compile
   ```
4. Udělej `.vsix` balíček:
    ```bash
    npx vsce package 
    ```
    - na úrovni package.json (`/ostrascript-extension`)

5. Instalace:
    - Po té můžeš v adresáři najít hotový  `.vsix` balíček, který potom přes `Install from VSIX` v extension menu stáhneš. Po instalaci se doporučuje restartvoat VS Code.

A pokud tohle nechceš dělat, tak si můžeš rovou stáhnout předpřipravený balíček

### Kompilace
Kód v Ostrascriptu převedeš na standardní TypeScript příkazem:
```bash
node compiler.js tvuj_kod.os
```
Tím zkompiluješ `.os` na `.ts` a ihned to můžeš použít na webu.

## License
- Dělej si s tím co chceš, ale nebuď chuj a přiznej barvu, odkud to máš.
- Velmi inspirováno projektem OSTRAJava od Tomáše Kohouta (https://github.com/tkohout/ostrajava)