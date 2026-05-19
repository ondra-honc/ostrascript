// --- KOMPILOVANO Z OSTRASCRIPTU ---
// --- NEEDITOVAT ---  

// --- TESTOVACÍ SADA PRO KOMPILÁTOR ---

type PolozkaSkladu = {
    id: number,
    nazev: string,
    cena: number,
    dostupno: boolean,
}

type StatistikaSkladu = Record<string, number> ;

const nactiDataSkladu = async (): Promise<PolozkaSkladu[]> => {
    return new Promise((resolve: any) => {
        setTimeout(() => {
            resolve([
                { id: 1, nazev: "Chleba", cena: 42, dostupno: true },
                { id: 2, nazev: "Pivo", cena: 28, dostupno: true },
                { id: 3, nazev: "Klobasa", cena: 85, dostupno: false },
                { id: 4, nazev: "Rohlik", cena: 3, dostupno: true }
            ]) ;
        }, 50) ;
    }) ;
}

const analyzujSklad = async (): Promise<void> => {
    console.log("Startuju analyzu skladu...") ;

    let celkovaCena: number = 0 ;
    const nedostupneZbozi: string[] = [] ;

    try {
        const polozky: any = await nactiDataSkladu() ;

        if (!Array.isArray(polozky)) {
            throw new Error("Data nejsou validni seznam") ;
        }

        for (const prvek of polozky) {
            if (prvek.cena >= 100) continue ;

            if (prvek.dostupno === true && typeof prvek.nazev === "string") {
                celkovaCena += prvek.cena ;
            }
            else if (prvek.dostupno === false || prvek.cena < 0) {
                nedostupneZbozi.push(prvek.nazev) ;
            }
        }

        const levneVeci: any = polozky.filter((p: any) => p.cena < 30) ;
        const nazvyLevnych: any = levneVeci.map((p: any) => p.nazev) ;
        const kopieNazvu: any = [...nazvyLevnych] ;

        console.log("Levne polozky na sklade: ") ;
        kopieNazvu.forEach((nazev: any) => console.log(nazev)) ;

        const inventura: StatistikaSkladu = {
            celkem: polozky.length,
            chybi: nedostupneZbozi.length,
        }

        for (const klic in inventura) {
            console.log(`Statistika - ${klic}: ${inventura[klic]}`) ;
        }

        const vsechnyKlice: any = Object.keys(inventura) ;
        const vsechnyHodnoty: any = Object.values(inventura) ;
        const vsechnyDvojice: any = Object.entries(inventura) ;

        const docesnyObjekt: any = { ...inventura } ; 
        delete docesnyObjekt.chybi ;

        if (docesnyObjekt.chybi !== undefined) {
            console.log("Mazani se nepovedlo") ;
        }
    } catch (chyba: any) {
        console.log ("Zasáhla vyšší moc, neco kleklo.") ;
    } finally {
        console.log("Analyza dokoncena") ;
    }
}

analyzujSklad() ;