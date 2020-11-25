var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var whitelist = ['http://localhost:4200','http://147.91.204.116:11022','http://147.91.204.116:11023']
var corsOptions = 
{
  origin: function (origin, callback) 
  {
    if (whitelist.indexOf(origin) !== -1) 
    {
      callback(null, true)
    } 
    else 
    {
      callback(new Error('Access denied!'))
    }
  }
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//----------------------- RUTE ----------------------------

var check = require('./routes/check');
app.use('/check', check);

var prijava = require('./routes/prijava');
app.use('/prijava', prijava);

var registracija = require('./routes/registracija');
app.use('/registracija', registracija);

var partneri = require('./routes/partneri');
app.use('/partneri', partneri);

var kpr = require('./routes/kpr');
app.use('/kpr', kpr);

var kir = require('./routes/kir');
app.use('/kir', kir);

var poreska_prijava = require('./routes/poreska_prijava');
app.use('/poreska_prijava', poreska_prijava);


/*
var pocetna = require('./routes/pocetna');
app.use('/pocetna', pocetna);
*/

//------------------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;