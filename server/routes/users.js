var sqlManager = require('./sqlManager');
const { promisify } = require('util');
var connection = sqlManager.getSqlConnection();
var errorLog = require('./brainerLogger').errorLog;
var infoLog = require('./brainerLogger').infoLog;

exports.users = function (req, res) {

    infoLog('request users');
    sqlManager.executeRequest('SELECT * FROM users').then(function (results) {
        res.status(200).send({results});

    }, function (err) {
        errorLog('Error occurred when select from users', err);
        res.status(400).send({
            "code": 400,
            "failure": "error occurred"
        });
    });
}
