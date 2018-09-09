/**
 * Created by janghunlee on 2018. 7. 18..
 */
module.exports = data;

const { User , Flower , Books } = require('../DB/schema');
const async = require('async');
const Logger = require('../func/color').Logger;

function data(app) {
    app.get('/data/flowerpot',(req,res)=>{
        "use strict";
        let token = req.session.token;
        async.waterfall([
            function (cb) {
                User.find({
                    token:token
                },(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , model[0].flowerpot_token);
                    }
                });
            },
            function (flowerpot_token , cb) {
                Flower.find({flowerpot_token:flowerpot_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 404 , "FlowerPot Data Not Found");
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
        })
    });

    app.get('/data/ward',(req,res)=>{
        "use strict";
        let token = req.session.token;

        async.waterfall([
            function (cb) {
                User.find({
                    token:token
                },(err,model)=>{
                    if(err) throw err;

                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , model[0].ward_id);
                    }
                });
            },
            function (id , cb) {
                User.find({
                    id:id
                },(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 404 , "Ward Not Found");
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

    app.get('/data/guardian',(req,res)=>{
        "use strict";
        let token = req.session.token;
        
        async.waterfall([
            function (cb) {
                User.find({
                    token:token
                },(err,model)=>{
                    if(err) throw err;

                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , model[0].id);
                    }
                });
            },
            function (id , cb) {
                User.find({
                    ward_id:id
                },(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 404 , "Guardian Not Found");
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


    app.get("/data/set/dummy",(req,res)=>{
        "use strict";
        async.waterfall([
            function (cb) {
                User.find({id:'test_user'},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(null);
                    }
                    else{
                        cb(true);
                    }
                })
            },
            function (cb) {
                let saveUser = new User({
                    auth_type : 'ward',
                    id: 'user',
                    password: '1234',
                    token: 'test',
                    name: 'ward_test',
                    gender: '남자',
                    flowerpot_token : 'ward1234ward1234'
                });

                saveUser.save((err,model)=>{
                    if(err) throw err;
                    cb(null);
                });
            },
            function (cb) {
                let date = new Date().getFullYear() + "년 "+new Date().getMonth()+"월 "+ new Date().getDate()+"일";
                let saveFlower = new Flower({
                    flowerpot_token:'ward1234ward1234',
                    temperature: {
                        shame: 20,
                        text : '좋음',
                    },
                    flowerpot_humidity: {
                        shame: 20,
                        text : '나쁨'
                    },
                    periphery_humidity: {
                        shame: 10,
                        text : '나쁨'
                    },
                    overall: '보통',
                    flower_name:'그루트',
                    flower_explain:'아이엠그루트',
                    date:date
                });

                saveFlower.save((err , model)=>{
                    if(err) throw err;
                    cb(null);
                });
            }
        ],function (cb) {
            if(cb == null){
                res.send({
                    status:200
                });
            }
            else if(cb == true){
                res.send({
                    status:401
                })
            }
        });
    });
}