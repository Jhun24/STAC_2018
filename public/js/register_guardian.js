/**
 * Created by janghunlee on 2018. 9. 7..
 */
let guardian_btn = document.getElementById('guardian-btn');

guardian_btn.addEventListener('click',()=>{
    "use strict";
    let id = document.getElementById('id').value;
    let password = document.getElementById('password').value;
    let password_check = document.getElementById('password-check').value;
    let name = document.getElementById('name').value;
    let relationship = document.getElementById('relationship').value;
    let ward_id = document.getElementById('ward-id').value;


    if(id != '' || password != '' || name != '' || ward_id != '' || relationship != ''){
        if(password_check == password){
            $.ajax({

            })
        }
        else{
            alert("비밀번호가 일치하지않습니다");
        }
    }
    else{
        alert("모든 정보를 입력해주세요")
    }
});