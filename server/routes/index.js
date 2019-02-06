var express = require('express');
var router = express.Router();

/* ローカルモジュール */
var UserRegister = require('../lib/User/UserRegister.js');
var UserLogin = require('../lib/User/UserLogin.js');
var UserList = require('../lib/User/UserList.js');
var RecordGroupRegister = require('../lib/RecordGroup/RecordGroupRegister.js');
var RecordGroupList = require('../lib/RecordGroup/RecordGroupList.js');
var RecordItemRegister = require('../lib/RecordItem/RecordItemRegister.js');
var RecordItemList = require('../lib/RecordItem/RecordItemList.js');
var RecordRegister = require('../lib/Record/RecordRegister.js');

/* ローカルDB関連モジュール */



//DB接続
var Sequelize = require('sequelize').Sequelize;
var db = new Sequelize(
  'tsubakuro',
  'root',
  'password',
  {host: 'localhost',
   dialect: 'mysql',
   port: 3306});
//接続チェック
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//model定義
var User = require('../lib/model/User')(db)
db.sync(function(errs){
  console.log('Model definition has been updated.', errs);
})
let user = new User({
  name: 'aaa',
  hashed_pw: 'lhibnjdlfkmvsdflb',
  mail: 'vac@gmail.com',
  sex: 'male',
  auth: 1,
  birth_ymd: '1997-09-20',
  k_lastname: '奥村',
  k_firstname: '直仁',
  h_lastname: 'おくむら',
  h_firstname: 'なおひと'
})
user.save()

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'ttrc_app',
  insecureAuth: true
});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/login/register', function(req, res, next) {
  res.render('index', { title: 'UserRegister' });
});

router.get('/test/json', function(req, res, next) {
  res.json({
    "message": "やったぜ。"
  })
});

/* API */
//そのまま返すテストAPI
router.post('/test/post/api', function(req, res, next) {
  console.log(req.body);
  res.send(req.body);
});
//ユーザ追加
router.post('/user/register/api', function(req, res, next) {
  UserRegister(req.body, res, connection);
});
//ユーザ認証
router.post('/user/login/api', function(req, res, next) {
  UserLogin(req.body, res, connection);
});
//ユーザ全取得
router.post('/user/list/api', function(req, res, next) {
  UserList(res, connection);
});
//記録グループの登録
router.post('/record-group/register/api', function(req, res, next) {
  RecordGroupRegister(req.body, res, connection);
});
//記録グループの全取得
router.post('/record-group/list/api', function(req, res, next) {
  RecordGroupList(req.body, res, connection);
})
//記録アイテムの登録
router.post('/record-item/register/api', function(req, res, next) {
  RecordItemRegister(req.body, res, connection);
})
//記録アイテムの登録
router.post('/record-item/list/api', function(req, res, next) {
  RecordItemList(req.body, res, connection);
})
//記録の登録
router.post('/record/register/api', function(req, res, next) {
  RecordRegister(req.body, res, connection);
})

module.exports = router;
