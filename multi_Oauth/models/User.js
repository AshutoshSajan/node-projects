var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

var userSchema = new Schema ({
	email: {
		type: String,
		required: true,
		unique: true
	},
	strategies :{
		type: [ String ],
	},
	local: {
		name: {
			type: String,
			minlength: 3,
			maxlength: 20
		},
		image: {
			type: String,
		},
		password: {
			type: String,
			minlength: 6,
			maxlength: 16
		},
	},
	google: {
		name: {
			type: String,
			minlength: 3,
			maxlength: 20
		},
		image: {
			type: String,
		},
	},
	github: {
		name: {
			type: String,
			minlength: 3,
			maxlength: 20
		},
		image: {
			type: String,
		},
	}
})

userSchema.pre('save', function (next) {
	if(this.local.password){
		this.local.password = bcrypt.hashSync(this.local.password, salt)
	}
	next()
})

var User = mongoose.model('User', userSchema);
module.exports = User;