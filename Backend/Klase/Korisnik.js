class Korisnik
{
    constructor()
    {
        this.id_korisnika = '';
        this.naziv_firme = '';
        this.lozinka = '';
        this.email = '';
    }

    Napravi(id_korisnika, naziv_firme, email, lozinka)
    {
        this.id_korisnika = id_korisnika;
        this.naziv_firme = naziv_firme;
        this.email = email;
        this.lozinka = lozinka;
    }

    toString()
    {
        return `${this.id_korisnika} | ${this.naziv_firme} | ${this.email}  | ${this.lozinka}`;
    }

    Print()
    {
        console.log(this.toString());
    }
}


module.exports = Korisnik;