/**
 * Created by janghunlee on 2018. 9. 16..
 */
module.exports = assistant;

let AssistantV1 = require('watson-developer-cloud/assistant/v1');
let watson = require('watson-developer-cloud');
let Logger = require('../func/color').Logger;

let { Flower } = require('../DB/schema');

let watsonAssistant = new AssistantV1({
    version: '2018-09-16',
    iam_apikey: 'zQWdl2N2QjP6Jk37jsCKIHmwC2y1kaas6gLTFGV2tcRR',
    url: 'https://gateway-wdc.watsonplatform.net/assistant/api'
});



function assistant(app) {
    app.post("/assistant",(req,res)=>{
        let text = req.body.text;

        watsonAssistant.message({
            workspace_id: '15345313-d211-4834-b30d-e33440cca4d7',
            input: {'text': text},
            alternate_intents:true
        },  function(err, response) {
            if (err) {
                res.send(err);
            }
            else{
                if(response.output.text == '나쁜말은 사용하지 말아주세요'){
                    Flower.find({flowerpot_token : 'ward1234ward1234'},(err,model)=>{
                        "use strict";
                        if(err) throw err;
                        if(model.length == 0){
                            res.send(response.output.text);
                        }
                        else{
                            let bad = model[0].bad + 1;

                            Flower.update({flowerpot_token : 'ward1234ward1234'},{$set:{bad:bad}},(err,model)=>{
                                if(err) throw err;
                                res.send(response.output.text);
                            });
                        }
                    });
                }
                else if(response.output.text == '상태'){
                    Flower.find({flowerpot_token : 'ward1234ward1234'},(err,model)=>{
                        "use strict";
                        if(err) throw err;
                        if(model.length == 0){
                            res.send('잘 모르겠어요');
                        }
                        else{
                            if(model[0].overall == '보통'){
                                res.send(['나쁘지 않아요!']);
                            }
                            else if(model[0].overall == '좋음'){
                                res.send(['매우 좋아요!']);
                            }
                            else if(model[0].overall == '나쁨'){
                                res.send(['저 지금 힘들어요!']);
                            }
                        }
                    });
                }
                else{
                    res.send(response.output.text);
                }
            }
        });

    });
}