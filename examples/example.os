fofrem kalfas nactiData(url: dryst) {
    zkus {
        toz data = pockej hovor(url) pyco
        fajront data pyco
    } chujstym (chyba: dryst) {
        hovor("Se to posralo: " + chyba) pyco
    }
}

kalfas pozdrav(jmeno: dryst) {
    toz zprava = "Zdar " + jmeno pyco
    hovor(zprava) pyco
    fajront laces pyco
}

pozdrav("Chachare") pyco
konstatuj chaskar: dryst = "Ahoj" pyco