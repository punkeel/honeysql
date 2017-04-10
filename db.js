var fs = require("fs");
var file = "users.db";
var exists = fs.existsSync(file);

if (!exists) {
    console.error("DB does not exist, please run 'npm seed'");
    process.exit(1);
}

var sqlite3 = require("sqlite3").verbose();
db = new sqlite3.Database(file, sqlite3.OPEN_READONLY);

module.exports = db;
