export class Kpr
{
    public id_kpr: number;
    public id_partnera: number;
    public redni_broj: number;
    public datum_knjizenja_isprave: string;
    public broj_racuna: string;
    public datum_racuna: string;
    public ukupna_naknada_sa_pdv: number;
    public ukupan_iznos_obracunatog_prethodnog_pdv: number;
    public iznos_prethodnog_pdv_koji_se_moze_odbiti: number;
    public iznos_prethodnog_pdv_koji_se_ne_moze_odbiti: number;
    public oslobodjena_nabavka: number;
    public nabavka_od_lica_koja_nisu_obveznici_pdv: number;
    public naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv: number;
    public vrednost_uvoza_bez_pdv: number;
    public iznos_pdv: number;
    public datum_placanja_pri_uvozu_placanje_poljoprivredniku: string;
    public vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika: number;
    public iznos_naknade_od_5_poljoprivredniku: number;
    
    public naziv: string;
    public sifra_partnera: string;
    public pib: string;

    //--- --- --- --- --- --- --- --- --- --- 

    public static FromJSON(objekat:any): Kpr
    {  
        let kpr = new Kpr();

        kpr.id_kpr = objekat.id_kpr;
        kpr.id_partnera = objekat.id_partnera;
        kpr.redni_broj = objekat.redni_broj;
        kpr.datum_knjizenja_isprave = objekat.datum_knjizenja_isprave;
        kpr.broj_racuna = objekat.broj_racuna;
        kpr.datum_racuna = objekat.datum_racuna;
        kpr.ukupna_naknada_sa_pdv = objekat.ukupna_naknada_sa_pdv;
        kpr.ukupan_iznos_obracunatog_prethodnog_pdv = objekat.ukupan_iznos_obracunatog_prethodnog_pdv;
        kpr.iznos_prethodnog_pdv_koji_se_moze_odbiti = objekat.iznos_prethodnog_pdv_koji_se_moze_odbiti;
        kpr.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = objekat.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti;
        kpr.oslobodjena_nabavka = objekat.oslobodjena_nabavka;
        kpr.nabavka_od_lica_koja_nisu_obveznici_pdv = objekat.nabavka_od_lica_koja_nisu_obveznici_pdv;
        kpr.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = objekat.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv;
        kpr.vrednost_uvoza_bez_pdv = objekat.vrednost_uvoza_bez_pdv;
        kpr.iznos_pdv = objekat.iznos_pdv;
        kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku = objekat.datum_placanja_pri_uvozu_placanje_poljoprivredniku;
        kpr.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = objekat.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika;
        kpr.iznos_naknade_od_5_poljoprivredniku = objekat.iznos_naknade_od_5_poljoprivredniku;

        return kpr;
    }


    public static FromJSONToArray(objekat:any): Kpr[]
    {
        let n = objekat.length;
        let kprs: Kpr[] = []; 

        for(let i=0 ; i<n ; i++)
        {
            kprs.push(this.FromJSON(objekat[i]));
        }

        return kprs;
    }


    public static FromJSONxPartner(objekat:any): Kpr
    {  
        let kpr = new Kpr();

        kpr.id_kpr = objekat.id_kpr;
        kpr.id_partnera = objekat.id_partnera;
        kpr.redni_broj = objekat.redni_broj;
        kpr.datum_knjizenja_isprave = this.TransformisiDatum(objekat.datum_knjizenja_isprave);
        kpr.broj_racuna = objekat.broj_racuna;
        kpr.datum_racuna = this.TransformisiDatum(objekat.datum_racuna);
        kpr.ukupna_naknada_sa_pdv = objekat.ukupna_naknada_sa_pdv;
        kpr.ukupan_iznos_obracunatog_prethodnog_pdv = objekat.ukupan_iznos_obracunatog_prethodnog_pdv;
        kpr.iznos_prethodnog_pdv_koji_se_moze_odbiti = objekat.iznos_prethodnog_pdv_koji_se_moze_odbiti;
        kpr.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = objekat.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti;
        kpr.oslobodjena_nabavka = objekat.oslobodjena_nabavka;
        kpr.nabavka_od_lica_koja_nisu_obveznici_pdv = objekat.nabavka_od_lica_koja_nisu_obveznici_pdv;
        kpr.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = objekat.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv;
        kpr.vrednost_uvoza_bez_pdv = objekat.vrednost_uvoza_bez_pdv;
        kpr.iznos_pdv = objekat.iznos_pdv;
        kpr.datum_placanja_pri_uvozu_placanje_poljoprivredniku = this.TransformisiDatum(objekat.datum_placanja_pri_uvozu_placanje_poljoprivredniku);
        kpr.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = objekat.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika;
        kpr.iznos_naknade_od_5_poljoprivredniku = objekat.iznos_naknade_od_5_poljoprivredniku;

        kpr.naziv = objekat.naziv;
        kpr.sifra_partnera = objekat.sifra_partnera;
        kpr.pib = objekat.sifra_partnera;

        return kpr;
    }


    public static FromJSONToArrayxPartner(objekat:any): Kpr[]
    {
        let n = objekat.length;
        let kprs: Kpr[] = []; 

        for(let i=0 ; i<n ; i++)
        {
            kprs.push(this.FromJSONxPartner(objekat[i]));
        }

        return kprs;
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

TABELA: KPR
id_kpr: INT (NOT NULL)  PK
id_partnera: INT (NOT NULL) FK
redni_broj: INT (NOT NULL)
datum_knjizenja_isprave: DATE (NOT NULL)
broj_racuna: STRING (NOT NULL)
datum_racuna: DATE (NOT NULL)
ukupna_naknada_sa_pdv: DECIMAL (NOT NULL) (DEFAULT 0.00)
ukupan_iznos_obracunatog_prethodnog_pdv: DECIMAL (NOT NULL) (DEFAULT 0.00)
iznos_prethodnog_pdv_koji_se_moze_odbiti: DECIMAL (NOT NULL) (DEFAULT 0.00)
iznos_prethodnog_pdv_koji_se_ne_moze_odbiti: DECIMAL (NOT NULL) (DEFAULT 0.00)
oslobodjena_nabavka: DECIMAL (NOT NULL) (DEFAULT 0.00)
nabavka_od_lica_koja_nisu_obveznici_pdv: DECIMAL (NOT NULL) (DEFAULT 0.00)
naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv: DECIMAL (NOT NULL) (DEFAULT 0.00)
vrednost_uvoza_bez_pdv: DECIMAL (NOT NULL) (DEFAULT 0.00)
iznos_pdv: DECIMAL (NOT NULL) (DEFAULT 0.00)
datum_placanja_pri_uvozu_placanje_poljoprivredniku: DATE (NULL)
vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika: DECIMAL (NOT NULL) (DEFAULT 0.00)
iznos_naknade_od_5_poljoprivredniku: DECIMAL (NOT NULL) (DEFAULT 0.00)

*/