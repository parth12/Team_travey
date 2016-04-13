var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var gravatar = require('gravatar');
var models = require('../app/models/models');

var str = "heyy";
var num = 1;

exports.login = function(phone_number,password,gcm_id,callback) {

	models.User.find({phone_number: phone_number},function(err,users){

		if(users.length != 0){

			var temp = users[0].salt;
			var hash_db = users[0].hashed_password;
			var id = users[0].token;
			var newpass = temp + password;
			var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");
			var grav_url = gravatar.url(users[0].email, {s: '200', r: 'pg', d: '404'});
			users[0].gcm_id = gcm_id;
			users[0].save();
			console.log(users[0].gcm_id +  gcm_id);

			if(hash_db == hashed_password){

				callback({'response':"Login Sucess",'res':true,'token':id,'grav':grav_url});

			}else{

				callback({'response':"Invalid Password",'res':false});

			}
		}else {

			callback({'response':"User not exist",'res':false});

		}
	});
}
