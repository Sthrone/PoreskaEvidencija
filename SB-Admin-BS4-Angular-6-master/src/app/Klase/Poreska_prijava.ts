export class Poreska_prijava
{
    public datum_od: string;
    public datum_do: string;
    public vrsta_prijave: number;
    public id_prijave: number;
    public tip_podnosioca: number;
    public oznaka_poreskog_perioda: number;
    public pib: string;
    public naziv: string;
    public adresa: string;
    public email: string;

    public promet_sa_pravom: number;
    public promet_bez_prava: number;
    public opsta_stopa_bpdv: number;
    public opsta_stopa_spdv: number;
    public posebna_stopa_bpdv: number;
    public posebna_stopa_spdv: number;

    public uvoz_bpdv: number;
    public uvoz_spdv: number;
    public polj_bpdv: number;
    public polj_spdv: number;
    public ostalo_bpdv: number;
    public ostalo_spdv: number;

    public zbir_promet_bpdv: number;
    public zbir_promet_spdv: number;
    public zbir_porez_bpdv: number;
    public zbir_porez_spdv: number;
    public poreska_obaveza: number;

    //--- --- --- --- --- --- --- --- --- --- 

    public static FromJSON(objekat:any): Poreska_prijava
    {  
        let pp = new Poreska_prijava();

        pp.datum_od = objekat.datum_od;
        pp.datum_do = objekat.datum_do;
        pp.vrsta_prijave = objekat.vrsta_prijave;
        pp.id_prijave = objekat.id_prijave;
        pp.tip_podnosioca = objekat.tip_podnosioca;
        pp.oznaka_poreskog_perioda = objekat.oznaka_poreskog_perioda;
        pp.pib = objekat.pib;
        pp.naziv = objekat.naziv;
        pp.adresa = objekat.adresa;
        pp.email = objekat.email;
        pp.promet_sa_pravom = parseInt(objekat.promet_sa_pravom);
        pp.promet_bez_prava = parseInt(objekat.promet_bez_prava);
        pp.opsta_stopa_bpdv = parseInt(objekat.opsta_stopa_bpdv);
        pp.opsta_stopa_spdv = parseInt(objekat.opsta_stopa_spdv);
        pp.posebna_stopa_bpdv = parseInt(objekat.posebna_stopa_bpdv);
        pp.posebna_stopa_spdv = parseInt(objekat.posebna_stopa_spdv);
        pp.uvoz_bpdv = parseInt(objekat.uvoz_bpdv);
        pp.uvoz_spdv = parseInt(objekat.uvoz_spdv);
        pp.polj_bpdv = parseInt(objekat.polj_bpdv);
        pp.polj_spdv = parseInt(objekat.polj_spdv);
        pp.ostalo_bpdv = parseInt(objekat.ostalo_bpdv);
        pp.ostalo_spdv = parseInt(objekat.ostalo_spdv);

        pp.zbir_promet_bpdv = pp.promet_sa_pravom + pp.promet_bez_prava + pp.opsta_stopa_bpdv + pp.posebna_stopa_bpdv;
        pp.zbir_promet_spdv = pp.opsta_stopa_spdv + pp.posebna_stopa_spdv;
        pp.zbir_porez_bpdv = pp.uvoz_bpdv + pp.polj_bpdv + pp.ostalo_bpdv;
        pp.zbir_porez_spdv = pp.uvoz_spdv + pp.polj_spdv + pp.ostalo_spdv;
        pp.poreska_obaveza = (pp.opsta_stopa_spdv + pp.posebna_stopa_spdv) - (pp.uvoz_spdv + pp.polj_spdv + pp.ostalo_spdv);

        return pp;
    }


}

