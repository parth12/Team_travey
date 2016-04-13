	var crypto = require('crypto');
	var rand = require('csprng');
	var mongoose = require('mongoose');
	var models = require('../app/models/models');
	
//	var Users = require('.config/models/users');
	var distance = 10000 / 6371;
	var aavara = "something_xyz"


	exports.register = function(user_name,phone_number,email,password,history,lat, long,gcm_id,callback) {

	//var x = email;
	//if(!(x.indexOf("@")<1 || x.lastIndexOf(".")<x.indexOf("@")+2 || x.lastIndexOf(".")+2>=x.length)){
		//if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 && password.match(/[0-9]/) && password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {

			//console.log('user_name   ' + user_name+'   phone_number    '+phone_number+'   email   '+ email+ '   password    '+ password );

			var temp =rand(160, 36);
			var newpass = temp + password;
			var token = crypto.createHash('sha512').update(aavara +rand).digest("hex");
			var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

			var newuser = new models.User({ 
				token: token,
				user_name: user_name,
				phone_number: phone_number,
				email: email, 
				gcm_id : gcm_id,
				shared_location : "1",
				allowed_to_post : "1",
				upvotes : 0,
				downvotes : 0,
				history: JSON.parse(history),
				location : [lat, long],
				hashed_password: hashed_password,
				salt :temp 
			});

			newuser.save(function (err) {
				 		console.log("here we go");	
				 		callback({'response' : "Succesfully registered !"});	
					});

			/*models.User.find({phone_number: phone_number},function(err,users){

				var len = users.length;

				if(len == 0){
				 	
				 	callback({'response':"yes"});
				}else{

					callback({'response':"no"});
				}
			});

		}else{

				callback({'response':"Password Weak"});
		
			}
		}else{

			callback({'response':"Email Not Valid"});
		
		}*/
	}

