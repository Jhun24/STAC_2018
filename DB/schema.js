/**
 * Created by janghunlee on 2018. 7. 18..
 */
const mongoose = require('mongoose');
const Logger = require('../func/color').Logger;

mongoose.connect('mongodb://localhost:27017/stac') ;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    Logger.data("Mongo DB ON");
});

let user = new mongoose.Schema({
    id: { type : String },
    password: { type : String },
    token: { type : String },
    name: { type : String },
    flowerpot:{
        temperature: {
            normal_data: Number,
            average_date : Number
        },
        flowerpot_humidity: {
            normal_data: Number,
            average_date : Number
        },
        periphery_humidity: {
            normal_data: Number,
            average_date : Number
        },
        overall: { type : String }
    }
})