export class Korisnik
{
    public id_korisnika: number;
    public naziv_firme: string;
    public lozinka: string;
    public email: string;

    //--- --- --- --- --- --- --- --- --- --- 

    toString()
    {
        return `${this.id_korisnika} | ${this.naziv_firme}  | ${this.email} | ${this.lozinka} `;
    }

    public static FromJSON(objekat:any): Korisnik
    {  
        let korisnik = new Korisnik();
        
        korisnik.id_korisnika = objekat.id_korisnika;
        korisnik.naziv_firme = objekat.naziv_firme;
        korisnik.email = objekat.email;
        korisnik.lozinka = objekat.lozinka;

        return korisnik;
    }

}