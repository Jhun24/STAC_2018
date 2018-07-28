module.exports = kakao;

let passport = require('passport');
let KakaoStrategy = require('passport-kakao').Strategy;
let random_string = require('randomstring');

let { User } = require('../DB/schema');

passport.use('kakao',new KakaoStrategy({
    clientID: '787a1f78de2759c39c8ec598f15be3e4',
    callbackURL: '/auth/kakao/callback'
},
    function(accessToken, refreshToken, profile, done){
        User.findOne({
            'auth_type':'kakao',
            'id' : profile.id
        }, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                let token = random_string.generate();
                user = new User({
                    auth_type:'kakao',
                    id:profile.id,
                    name:profile.name,
                    token:token,
                    flowerpot:{
                        temperature: {
                            normal_data: 0,
                            standard_data : 0,
                            average_date : 0
                        },
                        flowerpot_humidity: {
                            normal_data: 0,
                            average_date : 0
                        },
                        periphery_humidity: {
                            normal_data: 0,
                            average_date : 0
                        },
                        overall: "비어있음"
                    }
                });

                user.save(function(err){
                    if(err){
                        console.log(err);
                    }
                    return done(err, user);
                });
            }else{
                return done(err, user);
            }
        });
    }
));

function kakao(app) {
    app.get('/auth/kakao',passport.authenticate('kakao'));

    app.get('/auth/kakao/callback',passport.authenticate('kakao',{
        successRedirect: '/auth/kakao/success',
        failureRedirect: '/auth/kakao/fail'
    }));

    app.get('/auth/kakao/success',(req,res)=>{
        "use strict";
        res.send({
            status:200,
            message:"Auth Success"
        });
    });

    app.get('/auth/kakao/fail',(req,res)=>{
        "use strict";
        res.send({
            status:200,
            message:"Auth Fail"
        });
    });
}