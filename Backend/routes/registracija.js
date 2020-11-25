var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var osnovnaBaza = require('../config/database');
var Korisnik = require('../Klase/Korisnik');

router.use(bodyParser.json());

router.post('/', function(req, res, next) 
{
  osnovnaBaza.db.serialize(function()
  {
    let k = new Korisnik();
    k.naziv_firme = req.body.naziv_firme;
    k.email = req.body.email;
    k.lozinka = req.body.lozinka;

    let sql = "INSERT INTO Korisnik(naziv_firme, email, lozinka) VALUES(?,?,?)";
    let podaci = [k.naziv_firme, k.email, sha1(k.lozinka)];

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