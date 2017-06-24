var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var saltRounds = 10;

var dbURI = 'mongodb://localhost:27017/test'
mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

var userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		unique: true
	},
	password: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var taskSchema = new mongoose.Schema({
	taskname: {
		type: String
	},
	description: {
		type: String
	},
	owner_email: {
		type: String
	},
	created_by: {
		type: String,
		default: 'Me :)'
	},
    created_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function(next){
	var user = this;
	if(!user.isModified('password')) return next();

	bcrypt.genSalt(saltRounds, function(err, salt){
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

mongoose.model('User', userSchema, 'users');
mongoose.model('Task', taskSchema, 'tasks');