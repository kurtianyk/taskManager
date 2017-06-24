var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.signup = function(req, res){
	var newUser = new User();
	newUser.username = req.body.username;
	newUser.email = req.body.email;
	newUser.password = req.body.password;

	newUser.save(function(err, savedUser){
		if(err){
			console.log('-');
			res.status(400).send('An account with same username or email already exist');
		}else{
			console.log({"username":savedUser.username});
			res.status(200).send({"username":savedUser.username});
		}
	});
}

exports.login = function(req, res, next){
	var email = req.body.email;
	var password = req.body.password;

	User.findOne({email: email}, function(err, user){
		if (user == null) {
			res.status(400).end('No account with this email');
		}
		else{
			req.body.username = user.username;
			user.comparePassword(password, function(err, isMatch){
				if(isMatch && isMatch == true){
					next();
				}else{
					res.status(400).end('Invalid email or password');
				}
			});
		}
	});
}