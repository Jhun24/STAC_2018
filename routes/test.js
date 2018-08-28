/**
 * Created by janghunlee on 2018. 8. 7..
 */
module.exports = test;

function test(app) {
    
    app.post('/test',(req,res)=>{
        "use strict";

    });
    
    app.get('/test/:token1/:token2',function (req,res) {
        let token1= req.params.token1;
    });


}