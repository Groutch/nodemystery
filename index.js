//utilisation d'express
var app = require("express")();
const bodyParser = require('body-parser');
//utilisation de unique-random
const uniqueRandom = require('unique-random');
//definition du moteur de template: ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const rand = uniqueRandom(1, 10);
var tries = 3;
var randnum = rand();
//definition de ce qu'il se passe lorsqu'on accede à la racine du serveur (/)
app.get('/', function (req, res) {
    res.render('index', {
        guess: "",
        gsentence: "",
        gtries: tries
    });
});

app.post('/', function (req, res) {
    var gsentence = "";
    tries--;
    var number1 = req.body.guessnumber;
    console.log("input: "+number1);
    if (parseInt(number1) > randnum) {
        gsentence = "Trop grand";
    }
    if (parseInt(number1) < randnum) {
        gsentence = "Trop petit";
    }
    if (parseInt(number1) == randnum) {
        gsentence = "Bravo! Retente ta chance";
        randnum = rand();
        tries = 3;
    }
    if (tries == 0) {
        gsentence = "Dommage, plus d'essai, retente ta chance!";
        randnum = rand();
        tries = 3;
    }
    console.log("a trouver: "+randnum);
    res.render('index', {guess: number1, gsentence: gsentence, gtries: tries});
    
});
//lancement du serveur sur le port 8080 le ou est pour heroku
app.listen(process.env.PORT || 8080);
