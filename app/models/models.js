var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({ 
	token : String,
	user_name : String,
	phone_number : String,
	email: String, 	
	shared_location: String,
	gcm_id : String,
	allowed_to_post : String,
	hashed_password: String, 
	upvotes : Number,
	downvotes : Number,
	image : String,
	upvoted_posts : [String],
	downvoted_posts : [String],
	location: {
    	type: [Number],
    	index: '2d'
    },
	history: [{
		date: String,
		source: String,
		destination: String
	}],
	salt : String,
	temp_str:String
});

var reportSchema = mongoose.Schema({
	phone_number : String,
	upvotes : Number,
	downvotes : Number,
	detail : String,
	tag : String,
	start_time : String,
	end_time : String,

	expireAt :{
		type: Date,
		required : false
	},

	location: {
    	type: [Number],
    	index: '2d'
    }
});


reportSchema.index({expireAt : 1}, {expireAfterSeconds : 0});

//userSchema.index({location: '2d'});
var User = mongoose.model('users', userSchema); 
var Report = mongoose.model('reports', reportSchema); 
module.exports = {
	User : User,
	Report : Report
};        
