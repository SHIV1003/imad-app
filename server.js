var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

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

app.get('/create-user/:username/:password',function(req,res)
{
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbString],function (err,result)
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
