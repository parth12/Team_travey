var models = require('../app/models/models');


exports.editEmail = function(phone_number,email,callback) {

	models.User.find({phone_number: phone_number},function(err,users){

		if(users.length != 0){

			users[0].email = email;
			users[0].save();
		}
	});

	callback({'response' : "email ho gya"});

}

exports.editUserName = function(phone_number,user_name,callback) {

	models.User.find({phone_number: phone_number},function(err,users){

		if(users.length != 0){

			users[0].user_name = user_name;
			users[0].save();
		}
	});

	callback({'response' : "user name ho gya"});

}

exports.editImage = function(phone_number,image,callback) {

	models.User.find({phone_number: phone_number},function(err,users){

		if(users.length != 0){

			users[0].image = image;
			users[0].save();
		}
	});

	callback({'response' : "image ho gya"});

}

exports.editPhoneNumber = function(phone_number,new_phone_number,callback) {

	models.User.find({phone_number: phone_number},function(err,users){

		if(users.length != 0){

			users[0].phone_number = new_phone_number;
			users[0].save();
		}
	});

	callback({'response' : "phone number ho gya"});

}

exports.editSharedLocation = function(phone_number,shared_location,callback) {

	models.User.find({phone_number: phone_number},function(err,users){

		if(users.length != 0){

			users[0].shared_location = shared_location;
			users[0].save();
		}
	});

	callback({'response' : "shared Location ho gya"});

}

exports.editAllowedToPost = function(phone_number,allowed_to_post,callback) {

	models.User.find({phone_number: phone_number},function(err,users){

		if(users.length != 0){

			users[0].allowed_to_post = allowed_to_post;
			users[0].save();
		}
	});

	callback({'response' : "allowed_to_post ho gya"});

}