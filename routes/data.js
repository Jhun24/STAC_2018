/**
 * Created by janghunlee on 2018. 7. 18..
 */
module.exports = data;

const { User , Flower , Books } = require('../DB/schema');
const async = require('async');
const Logger = require('../func/color').Logger;
const upload = require('../func/multer').upload;

function data(app) {

    app.post('/data/add/name',(req,res)=>{
        "use strict";
        let token = req.session.token;
        let name = req.body.name;

        console.log(name);

        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
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
                        cb(true , 404 , 'Unauthorized Flowerpot Token');
                    }
                    else{
                        cb(null , flowerpot_token);
                    }
                });
            },
            function (flowerpot_token , cb) {
                Flower.update({flowerpot_token:flowerpot_token},{$set:{flower_name:name}},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , 'Update Success');
                });
            }
        ],function (cb , status , message) {
            if(cb == true || cb == null){
                res.send({
                    status:status,
                    message:message
                });
            }
        });
    });

    app.post('/data/add/flowerpot',(req,res)=>{
        "use strict";
        let token = req.session.token;
        let flowerpot_token = req.body.flowerpot_token;

        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null);
                    }
                });
            },
            function (cb) {
                Flower.find({flowerpot_token:flowerpot_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 404 , 'Unauthorized Flowerpot Token');
                    }
                    else{
                        cb(null);
                    }
                });
            },
            function (cb) {
                User.update({token:token},{$set:{flowerpot_token:flowerpot_token}},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , 'Update Success');
                });
            }
        ],function (cb , status , message) {
            if(cb == true || cb == null){
                res.send({
                    status:status,
                    message:message
                });
            }
        })
    });

    app.post('/data/update/name',(req,res)=>{
        "use strict";
        let token = req.session.token;
        let name = req.body.name;
        let explain = req.body.explain;

        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
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
                        cb(true , 404 , 'Please Add Your FlowerPot KeyCode');
                    }
                    else{
                        cb(null , flowerpot_token);
                    }
                });
            },
            function (flowerpot_token , cb) {
                Flower.update({flowerpot_token:flowerpot_token},{$set:{flower_name:name,flower_explain:explain}},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , 'Update Success');
                });
            }
        ],function (cb , status , message) {
            if(cb == true || cb == null){
                res.send({
                    status:status,
                    message:message
                });
            }
        })
    });

    app.post("/data/flowerpot/name",(req,res)=>{
        "use strict";
        let flower_name = req.body.flower_name;
        let token = req.session.token;

        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
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
                Flower.update({flowerpot_token:flowerpot_token},{$set:{name:flower_name}},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , 'Update Success');
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
                    message:data
                })
            }
        })
    });

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

    app.get('/data/user/:token',(req,res)=>{
        "use strict";
        let token = req.params.token;

        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , 200 , model[0]);
                    }
                })
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
                })
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

    app.post('/data/set/flower/profile',upload.single("profile"),(req,res)=>{
        "use strict";
        let file = req.file.filename;
        let token = req.session.token;

        async.waterfall([
            function (cb) {
                User.find({token:token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        cb(null , model[0]);
                    }
                });
            },
            function (user , cb) {
                Flower.find({flowerpot_token:user.flowerpot_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 404 , 'Please Initialized FlowerPot');
                    }
                    else{
                        cb(null , user.flowerpot_token);
                    }
                });
            },
            function (flowerpot_token , cb) {
                Flower.update({flowerpot_token:flowerpot_token},{$set:{flower_profile_url:file}},(err,model)=>{
                    if(err) throw err;
                    cb(null , 200 , file);
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

    app.post('/data/update',(req,res)=>{
        "use strict";
        let flowerpot_token = req.body.flowerpot_token;
        let data = req.body;
        let name = '';
        let data_obj = {
            temperature: {
                shame: Number,
                text : String,
            },
            flowerpot_humidity: {
                shame: Number,
                text : String
            },
            periphery_humidity: {
                shame: Number,
                text : String
            },
        }

        async.waterfall([
            function (cb) {
                Flower.find({flowerpot_token:flowerpot_token},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        cb(true , 401 , 'Unauthorized Token');
                    }
                    else{
                        name = model[0].flowerpot_name;
                        cb(null);
                    }
                });
            },
            function (cb) {
                if(data.temperature == undefined){
                    delete data_obj.temperature
                }
                else{
                    data_obj.temperature.shame = data.temperature;
                    if((data.temperature >= 30) || (data.temperature <= 0)){
                        data_obj.temperature.text = '나쁨'
                    }
                    else if((data.temperature < 30 && data.temperature > 20) || (data.temperature > 0 && data.temperature < 10)){
                        data_obj.temperature.text = '보통'
                    }
                    else if((data.temperature <= 20 && data.temperature >= 10)){
                        data_obj.temperature.text = '좋음'
                    }
                }

                if(data.flowerpot_humidity == undefined){
                    delete data_obj.flowerpot_humidity
                }
                else{
                    data_obj.flowerpot_humidity.shame = data.flowerpot_humidity;
                    if((data.flowerpot_humidity < 20) || (data.flowerpot_humidity > 80)){
                        data_obj.flowerpot_humidity.text = '나쁨';
                    }
                    else if((data.flowerpot_humidity >= 21 && data.flowerpot_humidity < 40) || (data.flowerpot_humidity <= 80 && data.flowerpot_humidity > 60)){
                        data_obj.flowerpot_humidity.text = '보통';
                    }
                    else if((data.flowerpot_humidity >= 40 && data.flowerpot_humidity <= 60)){
                        data_obj.flowerpot_humidity.text = '좋음';
                    }
                }

                if(data.periphery_humidity == undefined){
                    delete data_obj.periphery_humidity
                }
                else{
                    data_obj.periphery_humidity.shame = data.periphery_humidity;
                    if((data.periphery_humidity < 20) || (data.periphery_humidity > 80)){
                        data_obj.periphery_humidity.text = '나쁨';
                    }
                    else if((data.periphery_humidity >= 21 && data.periphery_humidity < 40) || (data.periphery_humidity <= 80 && data.periphery_humidity > 60)){
                        data_obj.periphery_humidity.text = '보통';
                    }
                    else if((data.periphery_humidity >= 40 && data.periphery_humidity <= 60)){
                        data_obj.periphery_humidity.text = '좋음';
                    }
                }
                console.log(data_obj)
                cb(null);
            },
            function (cb) {
                Flower.update({flowerpot_token:flowerpot_token},{$set:data_obj},(err,model)=>{
                    if(err) throw err;
                    console.log(model);
                    cb(null , 200, 'Update Success');
                });
            }
        ],function (cb , status , message) {
            if(cb == true){
                res.send({
                    status:status,
                    message:message
                });
            }
            else if(cb == null){
                res.send({
                    status:status,
                    name:name,
                    message:message
                });
            }
        })
    });


    app.get("/data/set/dummy",(req,res)=>{
        "use strict";
        async.waterfall([
            function (cb) {
                Flower.find({flowerpot_token:'ward1234ward1234'},(err,model)=>{
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
                    flower_name:'',
                    flower_explain:'설명을 입력해주세요',
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