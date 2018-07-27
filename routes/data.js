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
        let token = req.params.token;
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

    app.get('/data/user/:token',(reqsres)=>{
        "use strict";
        let token = req.params.token;
        
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

    app.post('/data/flowerpot/update/humidity',(req,res)=>{
        let token = req.body.token;
        let normal_data = req.body.normal_data;

        async.waterfall([
            function (cb){
                User.find({token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , model[0].flowerpot_humidity);
                    }
                });
            },
            function (humidity , cb){
                let update_average = (normal_data + humidity.average_date) / 2;
                User.update({token:token},{$set:{
                    flowerpot_humidity:{
                        normal_data: normal_data,
                        average_date : update_average
                    }
                }},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , "Update Success");
                });
            }
        ],function(cb , status , data){
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if(cb == null){
                res.send({
                    stauts:status,
                    message:data
                });
            }
        });
    });


    app.post('/data/flowerpot/update/periphery',(req,res)=>{
        let token = req.body.token;
        let normal_data = req.body.normal_data;

        async.waterfall([
            function (cb){
                User.find({token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , "Unauthorized Token");
                    }
                    else{
                        cb(null , model[0].periphery_humidity);
                    }
                });
            },
            function (periphery , cb){
                let update_average = (normal_data + periphery.average_date) / 2;
                User.update({token:token},{$set:{
                    periphery_humidity:{
                        normal_data: normal_data,
                        average_date : update_average
                    }
                }},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , "Update Success");
                });
            }
        ],function(cb , status , data){
            if(cb == true){
                res.send({
                    status:status,
                    message:data
                });
            }
            else if(cb == null){
                res.send({
                    stauts:status,
                    message:data
                });
            }
        });
    });
    
}