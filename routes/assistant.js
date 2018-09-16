/**
 * Created by janghunlee on 2018. 9. 16..
 */
module.exports = assistant;

let AssistantV1 = require('watson-developer-cloud/assistant/v1');
let watson = require('watson-developer-cloud');
let Logger = require('../func/color').Logger;

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
                res.send(response.output.text);
            }
        });

    });
}