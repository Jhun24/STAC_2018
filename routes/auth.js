/**
 * Created by janghunlee on 2018. 7. 18..
 */

module.exports = auth;

let {User} = require('../DB/schema');
let random_string = require('randomstring');
let async = require('async');
let Logger = require('../func/color').Logger;

function auth(app) {
    app.post('/auth/login',(req,res)=>{
        "use strict";
        let id = req.body.id;
        let password = req.body.password;

        User.find({
            id:id,
            password:password
        },(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Fail to /auth/login",
                });
            }else{
                req.session.token = model[0].token;
                res.send({
                    status:200,
                    data:{
                        auth_type:model[0].auth_type,
                        token:model[0].token
                    }
                });
            }
        });
    });

    app.post('/auth/login/auto',(req,res)=>{
        "use strict";
        let token = req.body.token;
        User.find({
            token:token,
        },(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:401,
                    message:"Fail to /auth/login/auto",
                });
            }else{
                req.session.token = token;
                res.send({
                    status:200
                });
            }
        })
    });

    app.post('/auth/register',(req,res)=>{
        "use strict";
        let id = req.body.id;
        let password = req.body.password;
        let name = req.body.name;
        let gender = req.body.gender;
        let token = random_string.generate();
        let auth_type = req.body.auth_type;

        let ward_id = req.body.ward_id;
        let relationship = req.body.relationship;

        if(auth_type == 'ward'){
            async.waterfall([
                function (cb) {
                    User.find({id:id},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(null);
                        }
                        else{
                            cb(true , 401 , "User Already Exist");
                        }
                    });
                },
                function (cb) {
                    let saveUser = new User({
                        auth_type:auth_type,
                        id:id,
                        password:password,
                        name:name,
                        token:token,
                        gender:gender,
                    });

                    saveUser.save((err,model)=>{
                        if(err) throw err;
                        cb(null , 200);
                    });
                }
            ],function (cb , status , text) {
                if(cb == true){
                    res.send({
                        status:status,
                        message:text
                    });
                }
                else if(cb == null){
                    req.session.token = token;
                    res.send({
                        status:status,
                        data:{
                            token:token
                        }
                    });
                }
            })
        }
        else if(auth_type == 'guardian'){
            async.waterfall([
                function (cb) {
                    User.find({id:id},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(null);
                        }
                        else{
                            cb(true , 401 , "User Already Exist");
                        }
                    });
                },
                function (cb) {
                    User.find({id:ward_id},(err,model)=>{
                        if(err) throw err;
                        if(model.length == 0){
                            cb(true , 404 , "Ward Id Not Found");
                        }
                        else{
                            cb(null);
                        }
                    });
                },
                function (cb) {
                    let saveUser = new User({
                        auth_type:auth_type,
                        id:id,
                        password:password,
                        name:name,
                        token:token,
                        ward_id:ward_id,
                        relationship:relationship
                    });

                    saveUser.save((err,model)=>{
                        if(err) throw err;
                        cb(null , 200);
                    });
                }
            ],function (cb ,status , text) {
                if(cb == true){
                    res.send({
                        status:status,
                        message:text
                    });
                }
                else if(cb == null){
                    req.session.token = token;
                    res.send({
                        status:status,
                        data:{
                            token:token
                        }
                    })
                }
            })
        }
    });

    app.post('/auth/logout',(req,res)=>{
        "use strict";
        req.session.destroy();
        res.clearCookie('stac');

        res.send({
            status:200
        });
    });
}