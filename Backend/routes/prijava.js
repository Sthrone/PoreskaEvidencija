var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var osnovnaBaza = require('../config/database');
var Korisnik = require('../Klase/Korisnik');
var jwt = require('../config/jwt');

router.use(bodyParser.json());

router.post('/', function(req, res, next) 
{
    k = new Korisnik();
    k.email = req.body.email;
    k.lozinka = req.body.lozinka;

    osnovnaBaza.db.serialize(() =>
    {
        let sql;
        let podaci;

        sql = `SELECT * 
               FROM Korisnik 
               WHERE email = ? AND lozinka = ?`;

        podaci = [k.email, sha1(k.lozinka)];
        
        osnovnaBaza.db.get(sql, podaci, (err, row) =>
        {
            if (err)
            {
                console.log(err);
            }
            else
            {
                if (row !== undefined)
                {
                    let user = new Korisnik();
                    user.Napravi(row.id_korisnika, row.naziv_firme, row.email, '');
                    let token = jwt.PotpisiToken(JSON.stringify(user));
                    res.status(200).send({user: user, token: token});
                }
                else
                {
                    res.status(404).send({errorMessage: "Wrong username or password"});
                }
            }   
        });
    });
});


module.exports = router;