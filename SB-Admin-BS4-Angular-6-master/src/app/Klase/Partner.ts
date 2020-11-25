export class Partner
{
    public id_partnera: number;
    public id_korisnika: number;
    public id_uloge: number;
    public sifra_partnera: string;
    public naziv: string;
    public ulica: string;                    
    public broj_objekta: string;
    public postanski_broj: string;              
    public mesto: string;                
    public telefon: string;
    public ime_vlasnika: string;
    public prezime_vlasnika: string;
    public pib: string;                  
    public ziro_racun: string;
    public maticni_broj: string;
    public sifra_delatnosti: string;
    public email: string;

    //--- --- --- --- --- --- --- --- --- --- 

    public static FromJSON(objekat:any): Partner
    {  
        let partner = new Partner();

        partner.id_partnera = objekat.id_partnera;
        partner.id_korisnika = objekat.id_korisnika;
        partner.id_uloge = objekat.id_uloge;
        partner.sifra_partnera = objekat.sifra_partnera;
        partner.naziv = objekat.naziv;
        partner.ulica = objekat.ulica;
        partner.broj_objekta = objekat.broj_objekta;
        partner.postanski_broj = objekat.postanski_broj;
        partner.mesto = objekat.mesto;
        partner.telefon = objekat.telefon;
        partner.ime_vlasnika = objekat.ime_vlasnika;
        partner.prezime_vlasnika = objekat.prezime_vlasnika;
        partner.pib = objekat.pib;
        partner.ziro_racun = objekat.ziro_racun;
        partner.maticni_broj = objekat.maticni_broj;
        partner.sifra_delatnosti = objekat.sifra_delatnosti;
        partner.email = objekat.email;

        return partner;
    }


    public static FromJSONToArray(objekat:any): Partner[]
    {
        let n = objekat.length;
        let partneri: Partner[] = []; 

        for(let i=0 ; i<n ; i++)
        {
            partneri.push(this.FromJSON(objekat[i]));
        }

        return partneri;
    }


    public static CopyPartner(objekat: Partner): Partner
    {
        let partner = new Partner();

        partner.id_partnera = objekat.id_partnera;
        partner.id_korisnika = objekat.id_korisnika;
        partner.id_uloge = objekat.id_uloge;
        partner.sifra_partnera = objekat.sifra_partnera;
        partner.naziv = objekat.naziv;
        partner.ulica = objekat.ulica;
        partner.broj_objekta = objekat.broj_objekta;
        partner.postanski_broj = objekat.postanski_broj;
        partner.mesto = objekat.mesto;
        partner.telefon = objekat.telefon;
        partner.ime_vlasnika = objekat.ime_vlasnika;
        partner.prezime_vlasnika = objekat.prezime_vlasnika;
        partner.pib = objekat.pib;
        partner.ziro_racun = objekat.ziro_racun;
        partner.maticni_broj = objekat.maticni_broj;
        partner.sifra_delatnosti = objekat.sifra_delatnosti;
        partner.email = objekat.email;

        return partner;
    }

}

/*

TABELA: Partner
id_partnera: INT (NOT NULL)  PK
id_korisnika: INT (NOT NULL) FK
id_uloge: INT (NOT NULL)  FK 
sifra_partnera: STRING (NOT NULL)       
naziv: STRING (NOT NULL)                
ulica: STRING (NULL)                    
broj_objekta: STRING (NULL)                     
postanski_broj: STRING (NULL)              
mesto: STRING (NOT NULL)                
telefon: STRING (NULL)                  
ime_vlasnika: STRING (NULL)             
prezime_vlasnika: STRING (NULL)         
pib: STRING (NOT NULL)                  
ziro_racun: STRING (NULL)               
maticni_broj: STRING (NULL)             
sifra_delatnosti: STRING (NULL) 
email: STRING (NULL)

*/