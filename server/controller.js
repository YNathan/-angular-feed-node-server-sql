var express = require("express");
var config = require('config');
var path = require('path');
var bodyParser = require('body-parser');
var sqlManager = require('./routes/sqlManager');
var loginRegister = require('./routes/loginRegister');
var authorization = require('./routes/authorization');
var topics = require('./routes/topics');
var users = require('./routes/users');
var postManager = require('./routes/postManager');
var cors = require('cors');
//sqlManager.handleDisconnect();





var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var router = express.Router();

// login register module
router.post('/login', loginRegister.login);
router.post('/register', loginRegister.register);
// user module
router.get('/users', users.users);
// authorization module
router.get('/get_user_autho_level', authorization.getAuthorizationByUserId);
router.post('/set_user_autho_level', authorization.setAuthorization);
// topic module
router.get('/prefix_topic', topics.getTopicsByPrefix);
router.post('/new_topic', topics.insertNewTopicReq);
router.get('/user_topics', topics.getTopicsByUserId);
// post manager

router.post('/upload_post', postManager.uploadPost);


// Sql Management Section
/*router.get('/get_spreadsheet_tables_names', sqlManagment.getSpreadsheetTablesNames);
/*router.get('/get_spreadsheet_tables_names', sqlManagment.getSpreadsheetTablesNames);
router.get('/get_spreadsheet_columns_names', sqlManagment.getSpreadsheetColumnsNames);
router.post('/update_tables_and_columns_structures',sqlManagment.updateSchemaTablesAndColumnsStructure);
router.get('/get_chosen_columns',sqlManagment.chosenColumns);
router.post('/get_next_data',sqlManagment.getNextData);
router.post('/get_user_authorization_level',getData.getUserAuhorizationLevel);
router.post('/get_users_by_prefix',getData.getUserPrefix);
router.post('/get_objects_by_prefix',getData.getObjectsByPrefix);
router.post('/update_user_authorization_lavel',getData.updateUserAuthorizationLavel);*/
// test route
router.get('/', function (req, res) {
    res.sendFile(__dirname +'/public/index.html');
});

app.use(cors());


app.use('/api', router);
app.listen(config.get("Server.port"));
console.log("server is up")

