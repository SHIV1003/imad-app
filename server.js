var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');

var config = 
{
    user: 'goyalshivam1003',
    database: 'goyalshivam1003',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
})

function hash(input,salt)
{
    var hashed =  crypto.pbkdf2Sync(input, salt, 100000, 128, 'sha512');
    return['pbkdf2', salt ,hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req,res)
{
    var hashedString = hash(req.params.input,'this is a salt');
    res.send(hashedString);
})

app.post('/create-user',function(req,res)
{
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(req.params.password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[req.params.username,dbString],function (err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('user successfully created'+user);
        }
    });
});

app.post('/login/:username/:password',function(req,res)
{
    var username = req.params.username;
    var password = req.params.password;
    
    pool.query('select * from "user" where username=$1'[username],function(err,result)
    {
        if(err)
        {
            res.satus(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.send(403).send('username/password is invalid');
            }
            else
            {
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password,salt);
                if(hashedpassword===dbstring)
                {
                    res.send('succesfully login');
                }
                else
                {
                    res.send(403).send('wrong password');
                }
            }
        }
    });
    
});
var pool = new Pool(config);

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
