'use strict';
var express = require('express');
var db = require('./db');
var generator = require('./generator');

var app = express();

app.set('view engine', 'ejs');
app.set('trust proxy', 'loopback, linklocal, uniquelocal');


function checkRow(row, id) {
    if (row.id != id)
        return false;

    var generatedUser = generator(id);

    if (row.password != generatedUser.password)
        return false;

    if (row.name != generatedUser.name)
        return false;

    if (row.email != generatedUser.email)
        return false;

    return true;
}

function injectMe(req, res) {
    var id = getId(req);

    if (id == -1) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.render("index", {
            rows: null,
            fullUrl: fullUrl
        });
        return;
    }
    var referrer = req.get('Referrer');
    if (referrer != undefined && referrer.startsWith("http")) {
        // Matches http:// and https://
        res.end();
        return;
    }

    db.all("SELECT id, name, email, password FROM users WHERE id = " + id + ";", function(err, rows) {
        if (err) {
            // console.log(err);
            res.write("An error occured: " + err);
            res.end();
            return;
        }

        if (rows.length == 0) {
            // do nothing
        } else if (rows.length == 1) {
            var row = rows[0];
            if (!checkRow(row, id)) {
                console.trace("Unexpected row data with id=<" + id + "> from " + req.ip);
            }
        } else {
            console.trace("Unexpected rows.length:" + rows.length + ", expected 1 with id=<" + id + "> from " + req.ip);
        }

        res.render("index", {
            rows: rows
        });
        res.end();
    });
}

function getId(req) {
    return req.query.id || req.query.page || -1;
}

app.get('/', injectMe);
app.get('/index.php', injectMe);
app.get('/page.php', injectMe);
app.get('/page', injectMe);

app.listen(8080);
