
var mongoose = require('mongoose');
var models = require('../app/models/models');
var numbers;
var name;
var location;

exports.getContacts = function(phone_number,callback) {
	for (var i = phone_number.length - 1; i >= 0; i--) {
		models.User.find({phone_number: phone_number[i]},function(err,users){
			var len = users.length;

				if(len == 1){
					numbers.push(users[0].phone_number);
					name.push(users[0].user_name);
					location.push(users[0].Location);
				}
		}
	}

	callback({'phone_number':numbers,'name':name, 'location': location });
	
}