/**
 * Created by janghunlee on 2018. 7. 23..
 */
module.exports = books;

let async = require('async');
let Logger = require('../func/color').Logger;
let { Books } = require('../DB/schema');

function books(app) {
    app.get('/books',(req,res)=>{
        "use strict";
        Books.find({},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send({
                    status:404,
                    message:"Books Data Not Found"
                });
            }
            else{
                res.send({
                    status:200,
                    data:model
                });
            }
        });
    });
}