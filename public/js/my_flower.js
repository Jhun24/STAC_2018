/**
 * Created by janghunlee on 2018. 9. 9..
 */

let date = document.getElementById('date');
let status = document.getElementById('status');
let explain = document.getElementById('data');

window.onload = ()=>{
    "use strict";
    $.ajax({
        method:'GET',
        url:'/data/flowerpot',
        success:function (data) {
            if(data.status == 401){
                location.href = '/'
            }
            else if(data.status == 200){
                date.innerHTML = data.data.date;
                status.innerHTML = data.data.overall;
                explain.innerHTML = data.data.flower_explain;
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}
