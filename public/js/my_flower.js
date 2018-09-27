/**
 * Created by janghunlee on 2018. 9. 9..
 */

let name = document.getElementById('name');
let date = document.getElementById('date');
let status = document.getElementById('status');
let explain = document.getElementById('data');

let user_flower = document.getElementById('user_flower');

let profile_upload = document.getElementById('profile');

let edit = document.getElementById('edit');
let save = document.getElementById('save');
let name_edit = document.getElementById('name-edit');
let data_edit = document.getElementById('data-edit');

let edit_box = document.getElementById('edit-box');

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
                name.innerHTML = data.data.flower_name;
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

edit.addEventListener('click',()=>{
    "use strict";
    name_edit.value = name.innerHTML;
    data_edit.value = explain.innerHTML;

    name.style.display = 'none';
    explain.style.display = 'none';

    name_edit.style.display = 'block';
    data_edit.style.display = 'block';


    edit_box.style.display = 'none';
    save.style.display = 'flex';

});

save.addEventListener('click',()=>{
    "use strict";
    let name = name_edit.value;
    let explain = data_edit.value;

    $.ajax({
        method:'POST',
        url:'/data/update/name',
        data:{
            name:name,
            explain:explain
        },
        success:function (data) {
            if(data.status == 200){
                location.reload();
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
});