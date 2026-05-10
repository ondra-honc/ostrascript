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