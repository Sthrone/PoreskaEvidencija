export class Kir
{
    public id_kir: number;
    public id_partnera: number;
    public redni_broj: number;
    public datum_knjizenja_isprave: string;
    public broj_racuna: string;
    public datum_racuna: string;
    public ukupna_naknada_sa_pdv: number;
    public ukupni_promet_sa_i_bez_prava_na_pdv: number;
    public promet_sa_pravom_na_pdv: number;
    public osnovica_20: number;
    public pdv_20: number;
    public osnovica_10: number;
    public pdv_10: number;
    public oslobodjeni_promet_sa_odbitkom: number;
    public oslobodjeni_promet_bez_odbitka: number;
    public promet_u_inostranstvu_sa_pravom_na_odbitak: number;
    public promet_u_inostranstvu_bez_naknade: number;

    public naziv: string;
    public sifra_partnera: string;
    public pib: string;

    //--- --- --- --- --- --- --- --- --- --- 

    public static FromJSON(objekat:any): Kir
    {  
        let kir = new Kir();

        kir.id_kir = objekat.id_kir;
        kir.id_partnera = objekat.id_partnera;
        kir.redni_broj = objekat.redni_broj;
        kir.datum_knjizenja_isprave = objekat.datum_knjizenja_isprave;
        kir.broj_racuna = objekat.broj_racuna;
        kir.datum_racuna = objekat.datum_racuna;
        kir.ukupna_naknada_sa_pdv = objekat.ukupna_naknada_sa_pdv;
        kir.ukupni_promet_sa_i_bez_prava_na_pdv = objekat.ukupni_promet_sa_i_bez_prava_na_pdv;
        kir.promet_sa_pravom_na_pdv = objekat.promet_sa_pravom_na_pdv;
        kir.osnovica_20 = objekat.osnovica_20;
        kir.pdv_20 = objekat.pdv_20;
        kir.osnovica_10 = objekat.osnovica_10;
        kir.pdv_10 = objekat.pdv_10;
        kir.oslobodjeni_promet_sa_odbitkom = objekat.oslobodjeni_promet_sa_odbitkom;
        kir.oslobodjeni_promet_bez_odbitka = objekat.oslobodjeni_promet_bez_odbitka;
        kir.promet_u_inostranstvu_sa_pravom_na_odbitak = objekat.promet_u_inostranstvu_sa_pravom_na_odbitak;
        kir.promet_u_inostranstvu_bez_naknade = objekat.promet_u_inostranstvu_bez_naknade;

        return kir;
    }


    public static FromJSONToArray(objekat:any): Kir[]
    {
        let n = objekat.length;
        let kirs: Kir[] = []; 

        for(let i=0 ; i<n ; i++)
        {
            kirs.push(this.FromJSON(objekat[i]));
        }

        return kirs;
    }


    public static FromJSONxPartner(objekat:any): Kir
    {  
        let kir = new Kir();

        kir.id_kir = objekat.id_kir;
        kir.id_partnera = objekat.id_partnera;
        kir.redni_broj = objekat.redni_broj;
        kir.datum_knjizenja_isprave = this.TransformisiDatum(objekat.datum_knjizenja_isprave);
        kir.broj_racuna = objekat.broj_racuna;
        kir.datum_racuna = this.TransformisiDatum(objekat.datum_racuna);
        kir.ukupna_naknada_sa_pdv = objekat.ukupna_naknada_sa_pdv;
        kir.ukupni_promet_sa_i_bez_prava_na_pdv = objekat.ukupni_promet_sa_i_bez_prava_na_pdv;
        kir.promet_sa_pravom_na_pdv = objekat.promet_sa_pravom_na_pdv;
        kir.osnovica_20 = objekat.osnovica_20;
        kir.pdv_20 = objekat.pdv_20;
        kir.osnovica_10 = objekat.osnovica_10;
        kir.pdv_10 = objekat.pdv_10;
        kir.oslobodjeni_promet_sa_odbitkom = objekat.oslobodjeni_promet_sa_odbitkom;
        kir.oslobodjeni_promet_bez_odbitka = objekat.oslobodjeni_promet_bez_odbitka;
        kir.promet_u_inostranstvu_sa_pravom_na_odbitak = objekat.promet_u_inostranstvu_sa_pravom_na_odbitak;
        kir.promet_u_inostranstvu_bez_naknade = objekat.promet_u_inostranstvu_bez_naknade;

        kir.naziv = objekat.naziv;
        kir.sifra_partnera = objekat.sifra_partnera;
        kir.pib = objekat.sifra_partnera;

        return kir;
    }


    public static FromJSONToArrayxPartner(objekat:any): Kir[]
    {
        let n = objekat.length;
        let kirs: Kir[] = []; 

        for(let i=0 ; i<n ; i++)
        {
            kirs.push(this.FromJSONxPartner(objekat[i]));
        }

        return kirs;
    }


    public static TransformisiDatum(datum: string): string
    {
        // yyyy-MM-dd => dd.MM.yyyy
        if (datum != null && datum != "")
        {  
            let niz = datum.split('-');
            return niz[2] + "." + niz[1] + "." + niz[0];
        }

        return "";
    }

}

/*

TABELA: KIR
id_kir: INT (NOT NULL) PK
id_partnera: INT (NOT NULL) FK
redni_broj: INT (NOT NULL)
datum_knjizenja_isprave: DATE (NOT NULL)
broj_racuna: STRING (NOT NULL)
datum_racuna: DATE (NOT NULL)
ukupna_naknada_sa_pdv: DECIMAL (NOT NULL) (DEFAULT 0.00)
oslobodjeni_promet_sa_odbitkom: DECIMAL (NOT NULL) (DEFAULT 0.00)
oslobodjeni_promet_bez_odbitka: DECIMAL (NOT NULL) (DEFAULT 0.00)
promet_u_inostranstvu_sa_pravom_na_odbitak: DECIMAL (NOT NULL) (DEFAULT 0.00)
promet_u_inostranstvu_bez_naknade: DECIMAL (NOT NULL) (DEFAULT 0.00)
osnovica_20: DECIMAL (NOT NULL)
pdv_20: DECIMAL (NOT NULL)
osnovica_10: DECIMAL (NOT NULL) (DEFAULT 0.00)
pdv_10: DECIMAL (NOT NULL) (DEFAULT 0.00)
ukupni_promet_sa_i_bez_prava_na_pdv: DECIMAL (NOT NULL)
promet_sa_pravom_na_pdv: DECIMAL (NOT NULL)

*/