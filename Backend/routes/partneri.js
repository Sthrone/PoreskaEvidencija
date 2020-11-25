var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var osnovnaBaza = require('../config/database');
var Partner = require('../Klase/Partner');

router.use(bodyParser.json());


//------------- DODAJ PARTNERA -------------
router.post('/dodaj_partnera', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let p = new Partner();
    p.id_korisnika = req.body.id_korisnika;
    p.id_uloge = req.body.id_uloge;
    p.sifra_partnera = req.body.sifra_partnera;
    p.naziv = req.body.naziv;
    p.ulica = req.body.ulica;
    p.broj_objekta = req.body.broj_objekta;
    p.postanski_broj = req.body.postanski_broj;
    p.mesto = req.body.mesto;
    p.telefon = req.body.telefon;
    p.ime_vlasnika = req.body.ime_vlasnika;
    p.prezime_vlasnika = req.body.prezime_vlasnika;
    p.pib = req.body.pib;
    p.ziro_racun = req.body.ziro_racun;
    p.maticni_broj = req.body.maticni_broj;
    p.sifra_delatnosti = req.body.sifra_delatnosti;
    p.email = req.body.email;

    let sql = `INSERT INTO Partner (id_korisnika, id_uloge, sifra_partnera, naziv, ulica, broj_objekta, postanski_broj, mesto, telefon, ime_vlasnika, prezime_vlasnika, pib, ziro_racun, maticni_broj, sifra_delatnosti, email) 
               VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
               
    let podaci = [p.id_korisnika, p.id_uloge, p.sifra_partnera, p.naziv, p.ulica, p.broj_objekta, p.postanski_broj, p.mesto, p.telefon, p.ime_vlasnika, p.prezime_vlasnika, p.pib, p.ziro_racun, p.maticni_broj, p.sifra_delatnosti, p.email];

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


//------------- VRATI PARTNERE -------------
router.post('/vrati_partnere', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let id_korisnika = req.body.id_korisnika;
    let id_uloge = req.body.id_uloge;

    let sql = `SELECT * 
               FROM Partner 
               WHERE id_korisnika = ? AND id_uloge = ?  
               ORDER BY sifra_partnera`;

    let podaci = [id_korisnika, id_uloge];

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


//------------- IZMENI PARTNERA -------------
router.post('/izmeni_partnera', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let p = new Partner();
    p.id_partnera = req.body.id_partnera;
    p.id_korisnika = req.body.id_korisnika;
    p.id_uloge = req.body.id_uloge;
    p.sifra_partnera = req.body.sifra_partnera;
    p.naziv = req.body.naziv;
    p.ulica = req.body.ulica;
    p.broj_objekta = req.body.broj_objekta;
    p.postanski_broj = req.body.postanski_broj;
    p.mesto = req.body.mesto;
    p.telefon = req.body.telefon;
    p.ime_vlasnika = req.body.ime_vlasnika;
    p.prezime_vlasnika = req.body.prezime_vlasnika;
    p.pib = req.body.pib;
    p.ziro_racun = req.body.ziro_racun;
    p.maticni_broj = req.body.maticni_broj;
    p.sifra_delatnosti = req.body.sifra_delatnosti;
    p.email = req.body.email;

    let sql = `UPDATE Partner 
               SET sifra_partnera = ?, naziv = ?, ulica = ?, broj_objekta = ?, postanski_broj = ?, mesto = ?, telefon = ?, ime_vlasnika = ?, prezime_vlasnika = ?, pib = ?, ziro_racun = ?, maticni_broj = ?, sifra_delatnosti = ?, email = ? 
               WHERE id_partnera = ?`;
               
    let podaci = [p.sifra_partnera, p.naziv, p.ulica, p.broj_objekta, p.postanski_broj, p.mesto, p.telefon, p.ime_vlasnika, p.prezime_vlasnika, p.pib, p.ziro_racun, p.maticni_broj, p.sifra_delatnosti, p.email, p.id_partnera];

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


//------------- OBRISI PARTNERA -------------
router.post('/obrisi_partnera', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let id_partnera = req.body.id_partnera;

    let sql = `DELETE FROM Partner 
               WHERE id_partnera = ?`;
    
    let podaci = [id_partnera];

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


//------------- VRATI PARTNERE MINIMALNO -------------
router.post('/vrati_partnere_minimalno', function(req, res, next) 
{  
  osnovnaBaza.db.serialize(function()
  {
    let id_korisnika = req.body.id_korisnika;
    let id_uloge = req.body.id_uloge;

    let sql =`SELECT id_partnera, sifra_partnera, naziv, pib  
              FROM Partner 
              WHERE id_korisnika = ? AND id_uloge = ?  
              ORDER BY naziv`;

    let podaci = [id_korisnika, id_uloge];

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




module.exports = router;