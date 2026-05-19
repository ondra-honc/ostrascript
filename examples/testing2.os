// --- TESTOVACÍ SADA PRO KOMPILÁTOR ---

typ PolozkaSkladu = {
    id: cyslo,
    nazev: dryst,
    cena: cyslo,
    dostupno: lacesnebochuj,
}

typ StatistikaSkladu = buchta<dryst, cyslo> pyco

konstatuj nactiDataSkladu = fofrem (): slyb<PolozkaSkladu[]> => {
    fajront novabuchta slyb((resolve: dynamit) => {
        setTimeout(() => {
            resolve([
                { id: 1, nazev: "Chleba", cena: 42, dostupno: laces },
                { id: 2, nazev: "Pivo", cena: 28, dostupno: laces },
                { id: 3, nazev: "Klobasa", cena: 85, dostupno: bokdepa },
                { id: 4, nazev: "Rohlik", cena: 3, dostupno: laces }
            ]) pyco
        }, 50) pyco
    }) pyco
}

konstatuj analyzujSklad = fofrem (): slyb<nist> => {
    hovor("Startuju analyzu skladu...") pyco

    toz celkovaCena: cyslo = 0 pyco
    konstatuj nedostupneZbozi: dryst[] = [] pyco

    zkus {
        konstatuj polozky: dynamit = pockej nactiDataSkladu() pyco

        kaj (!Array.isArray(polozky)) {
            mrdni novabuchta pruser("Data nejsou validni seznam") pyco
        }

        pro (konstatuj prvek zeseznamu polozky) {
            kaj (prvek.cena vetsyrovno 100) dalsy pyco

            kaj (prvek.dostupno === laces aj typeof prvek.nazev === "string") {
                celkovaCena += prvek.cena pyco
            }
            kajinak (prvek.dostupno === bokdepa ci prvek.cena < 0) {
                nedostupneZbozi.prypychni(prvek.nazev) pyco
            }
        }

        konstatuj levneVeci: dynamit = polozky.preber((p: dynamit) => p.cena < 30) pyco
        konstatuj nazvyLevnych: dynamit = levneVeci.premapuj((p: dynamit) => p.nazev) pyco
        konstatuj kopieNazvu: dynamit = [...nazvyLevnych] pyco

        hovor("Levne polozky na sklade: ") pyco
        kopieNazvu.vsecky((nazev: dynamit) => hovor(nazev)) pyco

        konstatuj inventura: StatistikaSkladu = {
            celkem: polozky.length,
            chybi: nedostupneZbozi.length,
        }

        pro (konstatuj klic uvnitr inventura) {
            hovor(`Statistika - ${klic}: ${inventura[klic]}`) pyco
        }

        konstatuj vsechnyKlice: dynamit = buchtoklyce(inventura) pyco
        konstatuj vsechnyHodnoty: dynamit = buchtohody(inventura) pyco
        konstatuj vsechnyDvojice: dynamit = Object.entries(inventura) pyco

        konstatuj docesnyObjekt: dynamit = { ...inventura } pyco 
        zrus docesnyObjekt.chybi pyco

        kaj (docesnyObjekt.chybi !== kokot) {
            hovor("Mazani se nepovedlo") pyco
        }
    } chujstym (chyba: dynamit) {
        hovor ("Zasáhla vyšší moc, neco kleklo.") pyco
    } naposled {
        hovor("Analyza dokoncena") pyco
    }
}

analyzujSklad() pyco