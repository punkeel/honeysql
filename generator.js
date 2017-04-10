var faker = require('faker');
var crypto = require('crypto');

function seed(str) {
    return parseInt(crypto
        .createHash('md4') // Not slow, and we don't care xD
        .update("" + str, 'utf8')
        .digest('hex').substr(0, 5), 16);
}

function md5(str) {
    return crypto
        .createHash('md5') // Not slow, and we don't care xD
        .update("" + str, 'utf8')
        .digest('hex');
}

var md5Password = md5("nevergonnagiveyouup");

module.exports = function (id) {
    faker.seed(seed(id));

    return {
        id: id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: md5Password // Never gonna give you up
    };
};