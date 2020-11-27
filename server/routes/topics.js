var sqlManager = require('./sqlManager');
var errorLog = require('./brainerLogger').errorLog;
var infoLog = require('./brainerLogger').infoLog;

//INSERT INTO `brainer`.`users_topics` (`user_id`, `topic_id`) VALUES ('1', '4');


exports.getTopicsByPrefix = function (req, res) {

    let topic_prefix = req.query.topic_prefix;

    sqlManager.executeRequest("SELECT * FROM brainer.topics where name like '" + topic_prefix + "%'").then(function (results) {
        res.status(200).send({ results });
    }, function (err) {
        errorLog('Error occurred when select from auth levels', err);
        res.status(400).send({
            "code": 400,
            "failure": "error occurred"
        });
    });
}

exports.insertNewTopicReq = function (req, res) {
    let topic = req.body.topic;
    insertNewTopic(topic,res);
}

exports.insertNewTopic = function (topic, res) {
//insert into brainer.topics (name) Select '1448523' Where not exists(select * from brainer.topics where name='1448523')
    sqlManager.executeRequest("INSERT INTO`brainer`.`topics`(`name`) VALUES('" + topic + "');").then(function (results) {
        if (res !== undefined) {
            res.status(200).send({ results });
        }
    }, function (err) {
        errorLog('Error occurred when add new topic', err);
        if (res !== undefined) {
            res.status(400).send({
                "code": 400,
                "failure": "error occurred"
            });
        }
    });
}

exports.getTopicsByUserId = function (req, res) {

    res.status(200).send({ 'results':[{name: 'oop'},{name : 'c#'}]});
    /*
    let user_id = req.query.user_id;
    sqlManager.executeRequest("SELECT name FROM brainer.topics WHERE id IN (SELECT topic_id FROM brainer.users_topics where user_id = "+user_id+");").then(function (results) {
        if (res !== undefined) {
            res.status(200).send({ results });
        }
    }, function (err) {
        errorLog('Error occurred when add new topic', err);
        if (res !== undefined) {
            res.status(400).send({
                "failure": "error occurred"
            });
        }
    });*/
}