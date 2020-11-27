var sqlManager = require('./sqlManager');
var errorLog = require('./brainerLogger').errorLog;
var infoLog = require('./brainerLogger').infoLog;
let authorization = require('./authorization');
exports.register = function (req, res) {

    var today = new Date();
    var user = {
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.password,
    }
    var login = {
        date: sqlDateTime(today),
        email: req.body.email,
        password: req.body.password
    }

    // prevent duplicates
    var email = req.body.email;
    var password = req.body.password;
    let user_id;


    sqlManager.executeRequestWithObjectParam('SELECT * FROM users WHERE email = ?', email).then(function (results) {
        if (results.length > 0) {
            if (results[0].password == password) {
                login.email = results[0].email;
                results[0].token = results[0].id;
                res.status(200).send({
                    "user": results[0]
                });
                login.password = "*****";
                insertNewLoginEvent(login);
            } else {
                insertNewLoginEvent(login);
                res.status(403).send({
                    "code": 403,
                    "failure": "Email and password does not match"
                });
            }
        } else {
            sqlManager.executeRequestWithObjectParam('INSERT INTO users SET ?', user).then(function (results) {
                infoLog('Inserted new user success, user id is : ' + results.insertId);
                authorization.setAuthorizationByUserId(results.insertId, 0, undefined);
                // return user_is as token
                sqlManager.executeRequestWithObjectParam('SELECT * FROM users WHERE email = ?', email).then(function (results) {
                    if (results.length > 0) {
                        if (results[0].password == password) {
                            results[0].token = results[0].id;
                            res.status(200).send({
                                "user": results[0]
                            });
                            login.email = results[0].email;
                            login.password = "*****";
                            insertNewLoginEvent(login);
                        }
                    }
                }, function (err) {
                    errorLog('Error occurred when select from users', err);
                    res.status(400).send({
                        "code": 400,
                        "failed": "error occurred"
                    });

                });

            }, function (err) {
                errorLog('Error occurred when insert into users', err);
                res.status(400).send({
                    "code": 400,
                    "failed": "error occurred"
                })
            });
        }
    }, function (err) {
        errorLog('Error occurred when select from users', err);
        res.status(400).send({
            "code": 400,
            "failure": "error occurred"
        });
    });
}


let insertNewLoginEvent = function (loginEvent) {
    sqlManager.executeRequestWithObjectParam('INSERT INTO logins SET ?', loginEvent).then(function (results) {
        infoLog("login registred successfully");
    }, function (err) {
        errorLog('Error occurred when select from users', err);

    });
}





exports.login = function (req, res) {

    let dt = new Date();
    var email = req.body.email;
    var password = req.body.password;
    var login = {
        date: sqlDateTime(dt),
        email: req.body.email,
        password: req.body.password
    }

    let usrToReturn =  {id : 1, 
    username: 'yaacov nathan',
    email: 'yaacovisraelnathan@gmail.com',
    password: 'a',
    token : 2
    }
    res.status(200).send({
        "user": usrToReturn
    });

    /*

    infoLog('Login requested from user:' + email);
    sqlManager.executeRequestWithObjectParam('SELECT * FROM users WHERE email = ?', email).then(function (results) {

        if (results.length > 0) {
            if (results[0].password === password) {
                infoLog('Login succeeded for user:' + email);

                login.email = results[0].email;
                login.password = "*****";
                results[0].token = results[0].id;
                res.status(200).send({
                    "user": results[0]
                });
                insertNewLoginEvent(login);

            } else {
                infoLog('Login rejected for user:' + email + ", incorrect password");
                res.status(403).send({
                    "code": 403,
                    "failure": "Email and password does not match"
                });
                insertNewLoginEvent(login);
            }
        } else {
            infoLog('Login rejected for user:' + email + ", incorrect mail");
            res.status(403).send({
                "code": 403,
                "success": "Email does not exist"
            });
            insertNewLoginEvent(login);
        }
    }, function (err) {
        errorLog('Error occurred when select from users', err);
        res.status(400).send({
            "code": 400,
            "failure": "error occurred"
        });
    });*/
}


var sqlDateTime = function (date) {
    var dt = new Date(date);
    return dt.getUTCFullYear() +
        '-' + (dt.getUTCMonth() + 1) +
        '-' + dt.getUTCDate() +
        ' ' + dt.getUTCHours() +
        ':' + dt.getUTCMinutes() +
        ':' + dt.getUTCSeconds()
};