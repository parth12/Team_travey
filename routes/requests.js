/**
 * Created by parth panchal on 05-04-2016.
 */
var mongoose = require('mongoose');
var request = require('request');
var models = require('../app/models/models');

exports.login = function(name,mobno,reg_id,callback) {

    var newuser = new user({
        name: name,
        mobno: mobno,
        reg_id: reg_id});

    user.find({mobno: mobno},function(err,users){

        var len = users.length;

        if(len == 0){
            newuser.save(function (err) {

                callback({'response':"Sucessfully Registered"});

            });
        }else{

            callback({'response':"User already Registered"});

        }});
}
exports.getuser = function(mobno,callback) {

    user.find(function(err,users){

        var len = users.length;

        if(len == 0){


            callback({'response':"No Users Registered"});


        }else{
            callback(removeUser(users, mobno));

        }});
}


exports.removeuser = function(mobno,callback) {

    user.remove({mobno:mobno},function(err,users){

        if(!err){

            callback({'response':"Removed Sucessfully"});
        }else{
            callback({'response':"Error"});
        }
    });
}



exports.send = function(fromn,fromu,title,gcm,callback) {

    models.User.find({},function(err,users) {
        var len = users.length;
        {
            //var to_id = users[0].reg_id;
            //var name = users[0].name;

            request(
                {
                    method: 'POST',
                    uri: 'https://android.googleapis.com/gcm/send',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'key=AIzaSyBFd63CGXAKcBVWqEyyjMMnVr_PiyKBpjU'
                    },
                    body: JSON.stringify({
                        "registration_id": gcm,
                        "data": {
                            "title": title,
                            "fromu": fromu,
                            "name": fromn
                        },
                        "time_to_live": 108
                    })
                }
                , function (error, response, body) {

                    console.log(error);
                    //console.log(response);
                    console.log(body);
                    callback({'response': "Success"});

                }
            )
        }
    });
}



function removeUser(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i].mobno == val) {
            arr.splice(i, 1);
            return arr;
            break;
        }
    }
}