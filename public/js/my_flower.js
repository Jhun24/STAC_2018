/**
 * Created by janghunlee on 2018. 9. 9..
 */

let date = document.getElementById('date');
let status = document.getElementById('status');
let explain = document.getElementById('data');

let user_flower = document.getElementById('user_flower');

let profile_upload = document.getElementById('profile');

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
                if(data.data.flower_profile_url == undefined || data.data.flower_profile_url == null){
                    user_flower.src = location.origin + '/img/flower_pic.svg';
                }
                else{
                    user_flower.src = location.origin + "/"+data.data.flower_profile_url;
                }
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}

profile_upload.addEventListener('change',()=>{
    "use strict";
    let form_data = new FormData();
    form_data.append('profile',profile_upload.files[0]);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/data/set/flower/profile",
        data: form_data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success:function (data) {
            user_flower.src = location.origin + "/" + data.data;
        },
        error:function (err) {
            console.log(err);
        }
    })
});