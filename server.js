var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var db = require('./models/db.js');

var user = require('./routes/user.js');
var task = require('./routes/task.js');

var jwtSecret = 'mySecretKey';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(expressJwt({secret: jwtSecret}).unless({path: ['/', '/signup', '/login']}));

app.get('/', function(req, res){
	res.sendFile('index.html', {root: __dirname});
});

app.post('/signup', user.signup);
app.post('/login', user.login, function(req, res){
	var token = jwt.sign({username: req.body.username}, jwtSecret);
	res.status(200).send({token: token, username: req.body.username, email: req.body.email});
});

app.get('/task/:id', task.getTask);
app.get('/tasks', task.getTasks);
app.post('/add', task.addTask);
app.post('/task/share', task.shareTask);
app.put('/update/:id', task.updateTask);
app.delete('/delete/:id', task.deleteTask);

var port = 8000;
var server = app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});