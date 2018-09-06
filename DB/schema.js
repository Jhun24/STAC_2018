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
    auth_type : { type : String },
    id: { type : String },
    password: { type : String },
    token: { type : String },
    name: { type : String },
    gender: { type : String },
    flowerpot:{
        temperature: {
            normal_data: Number,
            standard_data : Number,
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
});

let books = new mongoose.Schema({
    title: { type : String },
    link : { type : String },
    image : { type : String },
    author : { type : String },
    description : { type : String },
    publisher : { type : String },
    price : { type : String },
})

let usermodel = mongoose.model('usermodel',user);
let bookModel = mongoose.model('book',books);

exports.User = usermodel;
exports.Books = bookModel;