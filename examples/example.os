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