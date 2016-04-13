/**
 * Created by parth panchal on 31-03-2016.
 */
var mongoose = require('mongoose');
var models = require('../app/models/models');

exports.historyAdd = function(phone_number,history,callback) {

    models.User.update(
        { phone_number: phone_number },
        { $push: { history: history } }


    );
    console.log("history added");
    callback({'response':"History updated succesfully",'res':false});


}
