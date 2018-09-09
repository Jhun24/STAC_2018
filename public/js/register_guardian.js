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
                method:'POST',
                url:'/auth/register',
                data:{
                    id:id,
                    password:password,
                    name:name,
                    ward_id:ward_id,
                    relationship:relationship,
                    auth_type:'guardian'
                },
                success:function (data) {
                    console.log(data);
                    if(data.status == 200){
                        location.href='/main/guardian'
                    }
                    else if(data.status == 401){
                        Toast('이미 회원가입한 계정입니다');
                    }
                    else if(data.status == 404){
                        Toast('피보호자 아이디를 찾을 수 없습니다')
                    }
                },
                error:function (err) {
                    console.log(err);
                }
            })
        }
        else{
            Toast("비밀번호가 일치하지않습니다");
        }
    }
    else{
        Toast("모든 정보를 입력해주세요")
    }
});