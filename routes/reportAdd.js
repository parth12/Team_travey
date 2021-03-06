
var mongoose = require('mongoose');
var models = require('../app/models/models');

var requests = require('./requests');
var num = 0;
var distance = 1000 / 6371;


exports.reportAdd = function(phone_number,detail,tag,start_time,end_time,lat,long,callback) {
	var newReport = new models.Report({ 
		phone_number : phone_number,
		upvotes : num,
		downvotes : num,
		detail : detail,
		tag : tag,
		location : [lat, long],
		start_time : start_time,
		end_time : end_time,
		expireAt : new Date(end_time)
	});

	newReport.save(function (err) {
		callback({'response':"Sucessful"});


		var query = models.User.find({'location': {
	  						$near: [lat,long],
	  						$maxDistance: distance
	  						}
						});

						query.exec(function (err, city) {
	  						if (err) {
	    						console.log(err);
	    						throw err;
	  						}

							  else{

							  		for (var i = city.length - 1; i >= 0; i--) {
							  			var fromu = "req.body.from";
   										var fromn = "req.body.fromn";
   						
							   			var title = tag;


   										requests.send(fromn, fromu, title,city[i].gcm_id, function (found) {
      										console.log("hii");
      										//res.json(found);
      									});
							  		}
							  		
								    console.log('Cant save: Found city:' + city);
							  }
	
	 						

						});


		
		console.log("Added");
	});
}