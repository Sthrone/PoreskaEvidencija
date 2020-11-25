var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var osnovnaBaza = require('../config/database');
var Kpr = require('../Klase/Kpr');

router.use(bodyParser.json());


//------------- DODAJ RACUN -------------
router.post('/dodaj_racun', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let k = new Kpr();
    k.id_partnera = req.body.id_partnera;
    k.datum_knjizenja_isprave = req.body.datum_knjizenja_isprave;
    k.broj_racuna = req.body.broj_racuna;
    k.datum_racuna = req.body.datum_racuna;
    k.ukupna_naknada_sa_pdv = req.body.ukupna_naknada_sa_pdv;
    k.ukupan_iznos_obracunatog_prethodnog_pdv = req.body.ukupan_iznos_obracunatog_prethodnog_pdv;
    k.iznos_prethodnog_pdv_koji_se_moze_odbiti = req.body.iznos_prethodnog_pdv_koji_se_moze_odbiti;
    k.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = req.body.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti;
    k.oslobodjena_nabavka = req.body.oslobodjena_nabavka;
    k.nabavka_od_lica_koja_nisu_obveznici_pdv = req.body.nabavka_od_lica_koja_nisu_obveznici_pdv;
    k.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = req.body.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv;
    k.vrednost_uvoza_bez_pdv = req.body.vrednost_uvoza_bez_pdv;
    k.iznos_pdv = req.body.iznos_pdv;
    k.datum_placanja_pri_uvozu_placanje_poljoprivredniku = req.body.datum_placanja_pri_uvozu_placanje_poljoprivredniku;
    k.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = req.body.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika;
    k.iznos_naknade_od_5_poljoprivredniku = req.body.iznos_naknade_od_5_poljoprivredniku;

    // Odrediti redni broj.
    // Koliko je jos racuna zavedeno tog meseca?
    let niz = k.datum_knjizenja_isprave.split('-');     // yyyy-MM-dd

    let sql = `SELECT COALESCE(MAX(redni_broj), 0) as BrojRacuna 
               FROM Kpr 
               WHERE strftime('%Y',datum_knjizenja_isprave) = ? AND strftime('%m', datum_knjizenja_isprave) = ?`

    let podaci = [niz[0], niz[1]];
    
    osnovnaBaza.db.get(sql, podaci, (err, row) => 
    {
        if (err)
        {
            res.status(404).send({success: false});
            return console.log(err.message);
        }

        k.redni_broj = parseInt(row.BrojRacuna) + 1;
        
        sql = 
        `INSERT INTO Kpr 
        (
            id_partnera,
            redni_broj,
            datum_knjizenja_isprave,
            broj_racuna,
            datum_racuna,
            ukupna_naknada_sa_pdv,
            ukupan_iznos_obracunatog_prethodnog_pdv,
            iznos_prethodnog_pdv_koji_se_moze_odbiti,
            iznos_prethodnog_pdv_koji_se_ne_moze_odbiti,
            oslobodjena_nabavka,
            nabavka_od_lica_koja_nisu_obveznici_pdv,
            naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv,
            vrednost_uvoza_bez_pdv,
            iznos_pdv,
            datum_placanja_pri_uvozu_placanje_poljoprivredniku,
            vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika,
            iznos_naknade_od_5_poljoprivredniku
        ) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        podaci = 
        [
            k.id_partnera,
            k.redni_broj,
            k.datum_knjizenja_isprave,
            k.broj_racuna,
            k.datum_racuna,
            k.ukupna_naknada_sa_pdv,
            k.ukupan_iznos_obracunatog_prethodnog_pdv,
            k.iznos_prethodnog_pdv_koji_se_moze_odbiti,
            k.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti,
            k.oslobodjena_nabavka,
            k.nabavka_od_lica_koja_nisu_obveznici_pdv,
            k.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv,
            k.vrednost_uvoza_bez_pdv,
            k.iznos_pdv,
            k.datum_placanja_pri_uvozu_placanje_poljoprivredniku,
            k.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika,
            k.iznos_naknade_od_5_poljoprivredniku
        ];

        osnovnaBaza.db.run(sql, podaci, (err) =>
        {
            if (err)
            {
                res.status(404).send({success: false});
                return console.log(err.message);
            }
        
            res.status(200).send({success: true});
        });
    });
  });  
});


//------------- VRATI RACUNE -------------
router.post('/vrati_racune', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let id_korisnika = req.body.id_korisnika;

    let sql = `SELECT k.*, p.naziv, p.sifra_partnera, p.pib 
               FROM Kpr k JOIN Partner p ON p.id_korisnika = ? AND k.id_partnera = p.id_partnera 
               ORDER BY k.redni_broj`;

    let podaci = [id_korisnika];

    osnovnaBaza.db.all(sql, podaci, function (err, rows)
    {
        if (err)
            console.log(err);
        else
        {
          res.send(JSON.stringify(rows));
        }
    });
  });
});


//------------- IZMENI RACUN -------------
router.post('/izmeni_racun', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let k = new Kpr();
    k.id_kpr = req.body.id_kpr;
    k.redni_broj = req.body.redni_broj;
    k.id_partnera = req.body.id_partnera;
    k.datum_knjizenja_isprave = req.body.datum_knjizenja_isprave;
    k.broj_racuna = req.body.broj_racuna;
    k.datum_racuna = req.body.datum_racuna;
    k.ukupna_naknada_sa_pdv = req.body.ukupna_naknada_sa_pdv;
    k.ukupan_iznos_obracunatog_prethodnog_pdv = req.body.ukupan_iznos_obracunatog_prethodnog_pdv;
    k.iznos_prethodnog_pdv_koji_se_moze_odbiti = req.body.iznos_prethodnog_pdv_koji_se_moze_odbiti;
    k.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = req.body.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti;
    k.oslobodjena_nabavka = req.body.oslobodjena_nabavka;
    k.nabavka_od_lica_koja_nisu_obveznici_pdv = req.body.nabavka_od_lica_koja_nisu_obveznici_pdv;
    k.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = req.body.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv;
    k.vrednost_uvoza_bez_pdv = req.body.vrednost_uvoza_bez_pdv;
    k.iznos_pdv = req.body.iznos_pdv;
    k.datum_placanja_pri_uvozu_placanje_poljoprivredniku = req.body.datum_placanja_pri_uvozu_placanje_poljoprivredniku;
    k.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = req.body.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika;
    k.iznos_naknade_od_5_poljoprivredniku = req.body.iznos_naknade_od_5_poljoprivredniku;

    let sql = 
    `UPDATE Kpr SET 
        id_partnera = ?,
        datum_knjizenja_isprave = ?,
        broj_racuna = ?,
        datum_racuna = ?,
        ukupna_naknada_sa_pdv = ?,
        ukupan_iznos_obracunatog_prethodnog_pdv = ?,
        iznos_prethodnog_pdv_koji_se_moze_odbiti = ?,
        iznos_prethodnog_pdv_koji_se_ne_moze_odbiti = ?,
        oslobodjena_nabavka = ?,
        nabavka_od_lica_koja_nisu_obveznici_pdv = ?,
        naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv = ?,
        vrednost_uvoza_bez_pdv = ?,
        iznos_pdv = ?,
        datum_placanja_pri_uvozu_placanje_poljoprivredniku = ?,
        vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika = ?,
        iznos_naknade_od_5_poljoprivredniku = ? 
    WHERE id_kpr = ?`;

    let podaci = 
    [
        k.id_partnera,
        k.datum_knjizenja_isprave,
        k.broj_racuna,
        k.datum_racuna,
        k.ukupna_naknada_sa_pdv,
        k.ukupan_iznos_obracunatog_prethodnog_pdv,
        k.iznos_prethodnog_pdv_koji_se_moze_odbiti,
        k.iznos_prethodnog_pdv_koji_se_ne_moze_odbiti,
        k.oslobodjena_nabavka,
        k.nabavka_od_lica_koja_nisu_obveznici_pdv,
        k.naknada_za_uvezena_dobra_na_koja_se_ne_placa_pdv,
        k.vrednost_uvoza_bez_pdv,
        k.iznos_pdv,
        k.datum_placanja_pri_uvozu_placanje_poljoprivredniku,
        k.vrednost_primljenih_dobara_i_usluga_od_poljoprivrednika,
        k.iznos_naknade_od_5_poljoprivredniku,
        k.id_kpr
    ];

    osnovnaBaza.db.run(sql, podaci, (err) =>
    {
        if (err)
        {
            res.status(404).send({success: false});
            return console.log(err.message);
        }
    
        res.status(200).send({success: true});
    });
   });  
});


//------------- OBRISI RACUN -------------
router.post('/obrisi_racun', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let id_kpr = req.body.id_kpr;

    let sql = `DELETE FROM Kpr 
               WHERE id_kpr = ?`;
    
    let podaci = [id_kpr];

    osnovnaBaza.db.run(sql, podaci, (err) =>
    {
      if (err)
      {
        res.status(404).send({success: false});
        return console.log(err.message);
      }
  
      res.status(200).send({success: true});
    });    
  });  
});






module.exports = router;