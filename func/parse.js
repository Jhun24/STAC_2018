/**
 * Created by janghunlee on 2018. 7. 24..
 */
let mongoose = require('mongoose');
let Logger = require('./color').Logger;
let { Books } = require('../DB/schema');
let asy = require('async');
let request = require('request');
let fs = require('fs');
let path = require('path');

function GetBookData(data) {
    let count = 0;
    asy.whilst(
        function () {
            return count < data.length;
        },
        function (cb) {
            console.log(count);
            let item = data[count];
            let saveBook = new Books({
                title: item.title,
                link : item.link,
                image : item.coverSmallUrl,
                author : item.author,
                description : item.description,
                publisher : item.publisher,
                price : item.priceStandard,
                star : (Number(item.mileage) + 100)
            });

            saveBook.save((err,model)=>{
                if(err) throw err;
                count++;
                cb(null);
            });
        },
        function (err) {
            "use strict";
            if(!err){
                return new Promise(result=>{
                    result(200);
                });
            }
        }
    )
}

function check() {
    Books.find({},(err,model)=>{
        "use strict";
        if(err) throw err;
        Logger.info(model.length);
    });
}

function sibal() {
    const API_KEY = '5034FE2854947B9D4E6FD34541D1EB693A40C3E2E70DB3529CE856FA55D1C1E2';
    let QUERY_DATA = encodeURI('우울증');
    let BASE_URL = 'http://book.interpark.com/api/search.api?key='+API_KEY+'&output=json&query='+QUERY_DATA;

    let options = {
        url:BASE_URL
    }

    request(options,(err,response,body)=>{
        "use strict";
        if(err) throw err;
        let data = JSON.parse(body);
        GetBookData(data.item);
    });
}

sibal();