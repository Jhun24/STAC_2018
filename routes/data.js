/**
 * Created by janghunlee on 2018. 7. 18..
 */
module.exports = data;

const { User } = require('../DB/schema');
const async = require('async');
const Logger = require('../func/color').Logger;

function data(app) {
    app.get('/data/flowerpot/:token',(req,res)=>{
        "use strict";
        var token = req.params.token;
        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 403 , "Unauthorized token");
                    }
                    else{
                        cb(null , 200, model[0].flowerpot);
                    }
                });
            }
        ],function (cb , status , message ) {
            if(cb == true){
                res.send({
                    status:status,
                    message:message
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    data:message
                });
            }
        });
    });

    app.get('/data/user/:token',(req,res)=>{
        "use strict";
        var token = req.params.token;
        
        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , 200 , model[0]);
                    }
                });
            } 
        ],function (cb , status , data) {
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    data:data
                });
            }
        });
    });
}