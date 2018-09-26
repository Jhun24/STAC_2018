/**
 * Created by janghunlee on 2018. 8. 28..
 */

module.exports = route;

function route(app) {

    app.get('/',(req,res)=>{
        "use strict";
        res.render('check.html');
    });

    app.get('/login',(req,res)=>{
        "use strict";
        res.render('login.html')
    });

    app.get('/register/ward',(req,res)=>{
        "use strict";
        res.render("register_normal.html");
    });

    app.get('/register/guardian',(req,res)=>{
        "use strict";
        res.render('register_guardian.html');
    });

    app.get('/main/ward',(req,res)=>{
        "use strict";
        res.render('main_ward.html');
    });


    app.get('/main/guardian',(req,res)=>{
        "use strict";
        res.render('main_guardian.html');
    });

    app.get('/show/flower',(req,res)=>{
        "use strict";
        res.render("my-flower.html");
    });

    app.get('/show/ward',(req,res)=>{
        "use strict";
        res.render('ward.html');
    });

    app.get('/show/guardian',(req,res)=>{
        "use strict";
        res.render('guardian.html');
    });

    app.get("/pairing/code",(req,res)=>{
        "use strict";
        res.render('pairing.html');
    });


    app.get("/pairing/name",(req,res)=>{
        "use strict";
        res.render('name.html');
    });

}