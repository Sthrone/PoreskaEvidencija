var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var osnovnaBaza = require('../config/database');
var Kir = require('../Klase/Kir');

router.use(bodyParser.json());


//------------- DODAJ RACUN -------------
router.post('/dodaj_racun', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let k = new Kir();
    k.id_partnera = req.body.id_partnera;
    k.datum_knjizenja_isprave = req.body.datum_knjizenja_isprave;
    k.broj_racuna = req.body.broj_racuna;
    k.datum_racuna = req.body.datum_racuna;
    k.ukupna_naknada_sa_pdv = req.body.ukupna_naknada_sa_pdv;
    k.ukupni_promet_sa_i_bez_prava_na_pdv = req.body.ukupni_promet_sa_i_bez_prava_na_pdv;
    k.promet_sa_pravom_na_pdv = req.body.promet_sa_pravom_na_pdv;
    k.osnovica_20 = req.body.osnovica_20;
    k.pdv_20 = req.body.pdv_20;
    k.osnovica_10 = req.body.osnovica_10;
    k.pdv_10 = req.body.pdv_10;
    k.oslobodjeni_promet_sa_odbitkom = req.body.oslobodjeni_promet_sa_odbitkom;
    k.oslobodjeni_promet_bez_odbitka = req.body.oslobodjeni_promet_bez_odbitka;
    k.promet_u_inostranstvu_sa_pravom_na_odbitak = req.body.promet_u_inostranstvu_sa_pravom_na_odbitak;
    k.promet_u_inostranstvu_bez_naknade = req.body.promet_u_inostranstvu_bez_naknade;

    // Odrediti redni broj.
    // Koliko je jos racuna zavedeno tog meseca?
    let niz = k.datum_knjizenja_isprave.split('-');     // yyyy-MM-dd

    let sql = `SELECT COALESCE(MAX(redni_broj), 0) as BrojRacuna 
               FROM Kir 
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
        `INSERT INTO Kir 
        (
            id_partnera,
            redni_broj,
            datum_knjizenja_isprave,
            broj_racuna,
            datum_racuna,
            ukupna_naknada_sa_pdv,
            ukupni_promet_sa_i_bez_prava_na_pdv,
            promet_sa_pravom_na_pdv,
            osnovica_20,
            pdv_20,
            osnovica_10,
            pdv_10,
            oslobodjeni_promet_sa_odbitkom,
            oslobodjeni_promet_bez_odbitka,
            promet_u_inostranstvu_sa_pravom_na_odbitak,
            promet_u_inostranstvu_bez_naknade
        ) 
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

        podaci = 
        [
            k.id_partnera,
            k.redni_broj,
            k.datum_knjizenja_isprave,
            k.broj_racuna,
            k.datum_racuna,
            k.ukupna_naknada_sa_pdv,
            k.ukupni_promet_sa_i_bez_prava_na_pdv,
            k.promet_sa_pravom_na_pdv,
            k.osnovica_20,
            k.pdv_20,
            k.osnovica_10,
            k.pdv_10,
            k.oslobodjeni_promet_sa_odbitkom,
            k.oslobodjeni_promet_bez_odbitka,
            k.promet_u_inostranstvu_sa_pravom_na_odbitak,
            k.promet_u_inostranstvu_bez_naknade
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
               FROM Kir k JOIN Partner p ON p.id_korisnika = ? AND k.id_partnera = p.id_partnera 
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
    let k = new Kir();
    k.id_kir = req.body.id_kir;
    k.redni_broj = req.body.redni_broj;
    k.id_partnera = req.body.id_partnera;
    k.datum_knjizenja_isprave = req.body.datum_knjizenja_isprave;
    k.broj_racuna = req.body.broj_racuna;
    k.datum_racuna = req.body.datum_racuna;
    k.ukupna_naknada_sa_pdv = req.body.ukupna_naknada_sa_pdv;
    k.ukupni_promet_sa_i_bez_prava_na_pdv = req.body.ukupni_promet_sa_i_bez_prava_na_pdv;
    k.promet_sa_pravom_na_pdv = req.body.promet_sa_pravom_na_pdv;
    k.osnovica_20 = req.body.osnovica_20;
    k.pdv_20 = req.body.pdv_20;
    k.osnovica_10 = req.body.osnovica_10;
    k.pdv_10 = req.body.pdv_10;
    k.oslobodjeni_promet_sa_odbitkom = req.body.oslobodjeni_promet_sa_odbitkom;
    k.oslobodjeni_promet_bez_odbitka = req.body.oslobodjeni_promet_bez_odbitka;
    k.promet_u_inostranstvu_sa_pravom_na_odbitak = req.body.promet_u_inostranstvu_sa_pravom_na_odbitak;
    k.promet_u_inostranstvu_bez_naknade = req.body.promet_u_inostranstvu_bez_naknade;

    let sql = 
    `UPDATE Kir SET 
        id_partnera = ?,
        datum_knjizenja_isprave = ?,
        broj_racuna = ?,
        datum_racuna = ?,
        ukupna_naknada_sa_pdv = ?,
        ukupni_promet_sa_i_bez_prava_na_pdv = ?,
        promet_sa_pravom_na_pdv = ?,
        osnovica_20 = ?,
        pdv_20 = ?,
        osnovica_10 = ?,
        pdv_10 = ?,
        oslobodjeni_promet_sa_odbitkom = ?,
        oslobodjeni_promet_bez_odbitka = ?,
        promet_u_inostranstvu_sa_pravom_na_odbitak = ?,
        promet_u_inostranstvu_bez_naknade = ? 
    WHERE id_kir = ?`;

    let podaci = 
    [
        k.id_partnera,
        k.datum_knjizenja_isprave,
        k.broj_racuna,
        k.datum_racuna,
        k.ukupna_naknada_sa_pdv,
        k.ukupni_promet_sa_i_bez_prava_na_pdv,
        k.promet_sa_pravom_na_pdv,
        k.osnovica_20,
        k.pdv_20,
        k.osnovica_10,
        k.pdv_10,
        k.oslobodjeni_promet_sa_odbitkom,
        k.oslobodjeni_promet_bez_odbitka,
        k.promet_u_inostranstvu_sa_pravom_na_odbitak,
        k.promet_u_inostranstvu_bez_naknade,
        k.id_kir
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
    let id_kir = req.body.id_kir;

    let sql = `DELETE FROM Kir 
               WHERE id_kir = ?`;
    
    let podaci = [id_kir];

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