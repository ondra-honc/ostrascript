// --- KOMPILOVANO Z OSTRASCRIPTU ---
// --- NEEDITOVAT ---  

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