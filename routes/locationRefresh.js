/**
 * Created by parth panchal on 31-03-2016.
 */

var mongoose = require('mongoose');
var models = require('../app/models/models');

exports.locationRefresh = function(phone_number,lat,long,callback) {

    models.User.find({phone_number: phone_number},function(err,users){

        if(users.length != 0) {

            users[0].location = [lat, long];
            users[0].save();

            callback({'response': "Location updated", 'res': true});
        }

        else {
            callback({'response': "User not exist", 'res': false});
        }
    });


}
