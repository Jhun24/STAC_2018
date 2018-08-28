/**
 * Created by janghunlee on 2018. 8. 28..
 */

module.exports = route;

function route(app) {
    app.get('/',(req,res)=>{
        "use strict";
        res.render('splash.html');
    });

    app.get('/register',(req,res)=>{
        "use strict";
        res.render('register.html');
    });

    app.get('/login',(req,res)=>{
        "use strict";
        res.render('login.html')
    });
}