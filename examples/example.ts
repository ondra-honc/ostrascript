async function nactiData(url: string) {
    try {
        let data = await console.log(url) ;
        return data ;
    } catch (chyba: any) {
        console.log("Se to posralo: " + chyba) ;
    }
}

function pozdrav(jmeno: string) {
    let zprava = "Zdar " + jmeno ;
    console.log(zprava) ;
    return true ;
}

pozdrav("Chachare") ;
const chaskar: string = "Ahoj" ;
function rekniAhoj(jmeno: number): void {
    console.log(jmeno) ;
}