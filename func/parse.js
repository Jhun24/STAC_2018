/**
 * Created by janghunlee on 2018. 7. 24..
 */
let mongoose = require('mongoose');
let Logger = require('./color').Logger;
let { Books } = require('../DB/schema');
let asy = require('async');
let request = require('request');

const client_id = 'OECD98r0Gj3n6FAsBtS5';
const client_secret = 'N6eNg74TjK';

function GetBookData(data) {
    let count = 0;

    asy.whilst(
        function () {
            return count < data.length;
        },
        function (cb) {
            let item = data[count];
            let saveBook = new Books({
                title: item.title,
                link : item.link,
                image : item.image,
                author : item.author,
                description : item.description,
                publisher : item.publisher,
                price : item.price,
            });

            saveBook.save((err,model)=>{
                if(err) throw err;
                count++;
                cb(null);
            });
        },
        function (err) {
            "use strict";
            Logger.warn(err);
            if(!err){
                return new Promise(result=>{
                    result(200);
                });
            }
        }
    )
}

function GetBookList(i) {

    Logger.info(i+"'st Parse Start");
    let start = (i*100) + 1;

    let api_url = 'https://openapi.naver.com/v1/search/doc?query=' + encodeURI("우울증 추천운동")+"&start="+start+"&display=100";
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    }


    return new Promise(resolve =>{
        "use strict";

        request(options,(err , response , body)=>{
            if(err) throw err;
            if(response.statusCode == 200){
                let body_data = JSON.parse(body).items;
                resolve(body_data);
            }
            else{
                resolve(404);
            }
        });
    })
}

async function GetParseBook() {
    Logger.info("Start");
    let i = 1;
    let getList = await GetBookList(i);
    if(getList != 404){
        let saveData = await GetBookData(getList);
        if(saveData != 200){
            Logger.warn("SaveData : Data Not found Stop at "+i);
        }
    }
    else{
        Logger.warn("GetList : Data Not found Stop at "+i);
    }
}


function check() {
    Books.find({},(err,model)=>{
        "use strict";
        if(err) throw err;
        Logger.info(model.length);
    });
}


GetParseBook();