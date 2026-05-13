// --- KOMPILOVANO Z OSTRASCRIPTU ---
// --- NEEDITOVAT ---  

// --- TESTOVACÍ SADA PRO KOMPILÁTOR ---

const faktorial = (n: number): number => {
    if (n <= 1) return 1 ;
    return n * faktorial(n - 1) ;
}

const vytvorScitac = (zaklad: number) => {
    return (hodnota: number): number => {
        return zaklad + hodnota ;
    }
}

const zpracujData = (cisla: number[]): string[] => {
    return cisla.filter(n => n % 2 === 0).map(n => `Cislo ${n}`) ;
}

const ziskejDataServeru = async (id: number): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 100)) ;

    if (id < 0) {
        throw new Error("ID nesmi byt zaporne!") ;
    }

    return `Data pro ID: ${id}` ;
}

const spustTesty = async () => {
    console.log("Startuju testy...") ;

    const vysledekFaktorialu = faktorial(5) ;
    console.log(vysledekFaktorialu) ;

    const pridejDeset = vytvorScitac(10) ;
    console.log(pridejDeset(5)) ;

    const mojeCisla: number[] = [1,2,3,4,5] ;
    const vysledekPole = zpracujData(mojeCisla) ;
    console.log(vysledekPole) ;

    try {
        const text = await ziskejDataServeru(42) ;
        console.log(text) ;

        await (ziskejDataServeru(-1)) ;
    } catch (chyba: any) {
        console.log("Chyba pyco:", (chyba as Error).message) ;
    } finally {
        console.log("Hotovo pyco") ;
    }
}

spustTesty() ;