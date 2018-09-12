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
    ward_id:{ type : String },
    relationship: String ,
    flowerpot_token : String
});

let user_flower = new mongoose.Schema({
    flowerpot_token:String,
    temperature: {
        shame: Number,
        text : String
    },
    flowerpot_humidity: {
        shame: Number,
        text : String
    },
    periphery_humidity: {
        shame: Number,
        text : String
    },
    overall: { type : String },
    date:String,
    flower_name:String,
    flower_explain:String,
    flower_profile_url:String,

});

let books = new mongoose.Schema({
    title: { type : String },
    link : { type : String },
    image : { type : String },
    author : { type : String },
    description : { type : String },
    publisher : { type : String },
    price : { type : String },
    star : { type : Number }
})

let usermodel = mongoose.model('usermodel',user);
let bookModel = mongoose.model('bookModel',books);
let flowerModel = mongoose.model('flowerModel',user_flower);

exports.User = usermodel;
exports.Books = bookModel;
exports.Flower = flowerModel;