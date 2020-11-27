var sqlManager = require('./sqlManager');
var errorLog = require('./brainerLogger').errorLog;
var infoLog = require('./brainerLogger').infoLog;

exports.getAuthorizationByUserId =  function (req, res) {

    let user_id = req.query.user_id;
    infoLog('request auth');
    sqlManager.executeRequest('SELECT level FROM user_level WHERE user_id ='+user_id).then(function (results) {
        res.status(200).send({results});
    }, function (err) {
        errorLog('Error occurred when select from auth levels', err);
        res.status(400).send({
            "code": 400,
            "failure": "error occurred"
        });
    });
}
exports.setAuthorizationByUserId = function (id,level,res) {
    infoLog('insert auth');
    sqlManager.executeRequest("INSERT INTO `brainer`.`user_level` (`user_id`, `level`) VALUES ('"+id+"', '"+level+"');").then(function (results) {
        if(res){
            res.status(200).send({results});
        }
    }, function (err) {
        errorLog('Error occurred when select from auth levels', err);
        if(res){
            res.status(400).send({
                "code": 400,
                "failure": "error occurred"
            });
        }
        
    });
}
exports.setAuthorization = function (req,res) {
  let auth = {
      id: req.body.id,
      level: req.body.level
  }
  setAuthorizationByUserId(auth.id,auth.level,res);
}

