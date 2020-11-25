var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var osnovnaBaza = require('../config/database');
var Poreska_prijava = require('../Klase/Poreska_prijava');

router.use(bodyParser.json());


//------------- NAPRAVI PRIJAVU  -------------
router.post('/napravi_prijavu', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let pp = new Poreska_prijava();

    let godina = req.body.godina + "";
    let mesec = req.body.mesec + "";
    let id_korisnika = req.body.id_korisnika;

    if (mesec.length == 1)
        mesec = "0" + mesec;

    let brojDanaUmesecu = new Date(godina, mesec, 0).getDate();

    pp.datum_od = '01.' + mesec + '.' + godina;
    pp.datum_do = brojDanaUmesecu + '.' + mesec + '.' + godina;

    pp.vrsta_prijave = 0;
    pp.id_prijave = 0;
    pp.tip_podnosioca = 1;
    pp.oznaka_poreskog_perioda = 1;


    let sql = `SELECT * 
               FROM Korisnik 
               WHERE id_korisnika = ?`;

    let podaci = [id_korisnika];

    osnovnaBaza.db.get(sql, podaci, function (err, row)
    {
        if (err)
            return console.log(err);
        else
        {
            pp.pib = row.pib;
            pp.naziv = row.naziv_firme + ' d.o.o. ' + row.mesto;
            pp.adresa = row.ulica + ', ' + row.broj_objekta + ' ' + row.mesto;
            pp.email = row.email;

            pp.promet_sa_pravom = 0;
            pp.promet_bez_prava = 0;

            sql = 
            `SELECT SUM(osnovica_20) as naknada_sum, SUM(pdv_20) as pdv_sum 
             FROM Kir 
             WHERE strftime('%Y',datum_knjizenja_isprave) = ? AND strftime('%m', datum_knjizenja_isprave) = ?`;

            podaci = [godina, mesec];

            osnovnaBaza.db.get(sql, podaci, function (err, row)
            {
                if (err)
                   return console.log(err);
                else
                {
                    pp.opsta_stopa_bpdv = parseFloat(row.naknada_sum).toFixed(0);
                    pp.opsta_stopa_spdv = parseFloat(row.pdv_sum).toFixed(0);
                    
                    if (isNaN(pp.opsta_stopa_bpdv))
                        pp.opsta_stopa_bpdv = 0;

                    if (isNaN(pp.opsta_stopa_spdv))
                        pp.opsta_stopa_spdv = 0;
                    
                    pp.posebna_stopa_bpdv = 0;
                    pp.posebna_stopa_spdv = 0;

                    pp.uvoz_bpdv = 0;
                    pp.uvoz_spdv = 0;
                    pp.polj_bpdv = 0;
                    pp.polj_spdv = 0;

                    sql = 
                    `SELECT SUM(ukupna_naknada_sa_pdv) as naknada_sum, SUM(ukupan_iznos_obracunatog_prethodnog_pdv) as pdv_sum 
                     FROM Kpr 
                     WHERE strftime('%Y',datum_knjizenja_isprave) = ? AND strftime('%m', datum_knjizenja_isprave) = ?`;

                    podaci = [godina, mesec];

                    osnovnaBaza.db.get(sql, podaci, function (err, row)
                    {
                        if (err)
                            return console.log(err);
                        else
                        {
                            pp.ostalo_bpdv = parseFloat(row.naknada_sum) - parseFloat(row.pdv_sum);
                            pp.ostalo_bpdv = pp.ostalo_bpdv.toFixed(0);
                            pp.ostalo_spdv = parseFloat(row.pdv_sum).toFixed(0);

                            if (isNaN(pp.ostalo_bpdv))
                                pp.ostalo_bpdv = 0;
                            
                            if (isNaN(pp.ostalo_spdv))
                                pp.ostalo_spdv = 0;

                            res.send(JSON.stringify(pp));
                        }
                    });
                }
            });
        }
    });
  });  
});



module.exports = router;