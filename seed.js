var generator = require('./generator');
var fs = require("fs");
var file = "users.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();

if (exists) {
    return;
}
console.log("Creating DB file.");
fs.openSync(file, "w");
var db = new sqlite3.Database(file);

db.serialize(function () {
    db.run("BEGIN TRANSACTION");

    db.run("CREATE TABLE users(" +
        "id INT PRIMARY KEY NOT NULL," +
        "name TEXT NOT NULL," +
        "password CHAR(32) NOT NULL," +
        "email CHAR(50));");

    var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");
    var user;
    for (var i = 0; i < 1000; i++) {
        user = generator(i);
        stmt.run(i, user.name, user.password, user.email);
    }
    stmt.finalize();
    db.run("END");
    console.log("Done");
});
db.close();