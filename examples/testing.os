// --- TESTOVACÍ SADA PRO KOMPILÁTOR ---

konstatuj faktorial = (n: cyslo): cyslo => {
    kaj (n <= 1) fajront 1 pyco
    fajront n * faktorial(n - 1) pyco
}

konstatuj vytvorScitac = (zaklad: cyslo) => {
    fajront (hodnota: cyslo): cyslo => {
        fajront zaklad + hodnota pyco
    }
}

konstatuj zpracujData = (cisla: cyslo[]): dryst[] => {
    fajront cisla.preber(n => n % 2 === 0).premapuj(n => `Cislo ${n}`) pyco
}

konstatuj ziskejDataServeru = fofrem (id: cyslo): slyb<dryst> => {
    pockej novabuchta slyb(resolve => setTimeout(resolve, 100)) pyco

    kaj (id < 0) {
        mrdni novabuchta pruser("ID nesmi byt zaporne!") pyco
    }

    fajront `Data pro ID: ${id}` pyco
}

konstatuj spustTesty = fofrem (): nist => {
    hovor("Startuju testy...") pyco

    konstatuj vysledekFaktorialu: cyslo= faktorial(5) pyco
    hovor(vysledekFaktorialu) pyco

    konstatuj pridejDeset = vytvorScitac(10) pyco
    hovor(pridejDeset(5)) pyco

    konstatuj mojeCisla: cyslo[] = [1,2,3,4,5] pyco
    konstatuj vysledekPole: dryst[] = zpracujData(mojeCisla) pyco
    hovor(vysledekPole) pyco

    zkus {
        konstatuj text = pockej ziskejDataServeru(42) pyco
        hovor(text) pyco

        pockej (ziskejDataServeru(-1)) pyco
    } chujstym (chyba: dynamit) {
        hovor("Chyba pyco:", (chyba as pruser).message) pyco
    } naposled {
        hovor("Hotovo pyco") pyco
    }
}

spustTesty() pyco