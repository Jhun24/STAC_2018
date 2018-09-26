/**
 * Created by janghunlee on 2018. 9. 26..
 */
let pairing_btn = document.getElementById('pairing-btn');

let input1 = document.getElementById('p1');
let input2 = document.getElementById('p2');
let input3 = document.getElementById('p3');
let input4 = document.getElementById('p4');

pairing_btn.addEventListener('click',()=>{
    "use strict";
    let flowerpot_token = input1.value + input2.value + input3.value + input4.value;
    console.log(flowerpot_token);

    $.ajax({
        method:'POST',
        url:'/data/add/flowerpot',
        data:{
            flowerpot_token:flowerpot_token
        },
        success:function (data) {
            if(data.status == 200){
                location.href='/pairing/name'
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
});