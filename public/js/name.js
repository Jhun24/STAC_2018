/**
 * Created by janghunlee on 2018. 9. 26..
 */
/**
 * Created by janghunlee on 2018. 9. 26..
 */
let pairing_btn = document.getElementById('pairing-btn');

let name = document.getElementById('name');


pairing_btn.addEventListener('click',()=>{
    "use strict";
    $.ajax({
        method:'POST',
        url:'/data/add/name',
        data:{
            name:name.value
        },
        success:function (data) {
            if(data.status == 200){
                location.href='/main/ward'
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
});