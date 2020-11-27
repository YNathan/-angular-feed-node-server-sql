var sqlManager = require('./sqlManager');
var errorLog = require('./brainerLogger').errorLog;
var infoLog = require('./brainerLogger').infoLog;

exports.uploadPost = function (req, res) {
    let topicsIds = [];
    infoLog("upload post");

    let post = {
        user_id: req.body.user_id,
        title: req.body.title,
        textarea: req.body.textarea,
        topics: req.body.topics
    }


    let insertTopixIfNotExistStatment = "INSERT IGNORE INTO topics (name) values ? ";
    let selectTopicsIdStatment = "SELECT id FROM brainer.topics where ";
    let insertPostStatment = "INSERT INTO posts (user_id,title,textarea) VALUES('" + post.user_id + "','" + post.title + "','" + post.textarea + "')";


    let valuesTopics = [];
    for (let topic of post.topics) {
        valuesTopics.push([topic]);
        selectTopicsIdStatment += "name = '" + topic + "' or "

    }
    selectTopicsIdStatment = selectTopicsIdStatment.substring(0, selectTopicsIdStatment.length - 3);
    selectTopicsIdStatment += ";";
    sqlManager.executeRequestWithObjectParam(insertTopixIfNotExistStatment, valuesTopics).then(function (results) {

        sqlManager.executeRequest(selectTopicsIdStatment).then(function (results) {
            topicsIds = results.map(x => x.id);

            sqlManager.executeRequest(insertPostStatment).then(function (results) {

                for (let id of topicsIds) {
                    insertUserTopic(post.user_id, id);
                    insertPostTopic(results.insertId, id);
                }

                res.status(200).send({ results });
            }, function (err) {
                errorLog('Error occurred when insert new post', err);
                res.status(400).send({ err });
            });
        }, function (err) {
            errorLog('Error occurred when get topic id', err);
            res.status(400).send({ err });
        });
    }, function (err) {
        errorLog('Error occurred when insert new topic', err);
        res.status(400).send({ err });
    });
}

var insertUserTopic = function (user_id, topic_id) {
    let insertUserTopics = "insert ignore into users_topics (user_id,topic_id) values (" + user_id + "," + topic_id + ");";
    sqlManager.executeRequest(insertUserTopics).then(function (results) {
    }, function (err) {
        errorLog('Error occurred when insert topic user', err);
    });
}

var insertPostTopic = function (post_id, topic_id) {
    let insertUserTopics = "insert ignore into posts_topics (post_id,topic_id) values (" + post_id + "," + topic_id + ");";
    sqlManager.executeRequest(insertUserTopics).then(function (results) {
    }, function (err) {
        errorLog('Error occurred when insert topic post', err);
    });
}