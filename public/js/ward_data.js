/**
 * Created by janghunlee on 2018. 9. 9..
 */
let humidity_data = document.getElementById('humidity-data');
let temperature_data = document.getElementById('temperature-data');
let status_data = document.getElementById('status-data');
let user_flower = document.getElementById('user-flower');
let preloader = document.getElementById('preloader');

let book_health_time_line = document.getElementById('time-line');

window.onload = function () {
    "use strict";
    $.ajax({
        method:'GET',
        url:'/data/flowerpot',
        success:function (data) {
            if(data.status == 401){
                location.href = '/'
            }
            else if(data.status == 200){
                humidity_data.innerHTML = data.data.flowerpot_humidity.text;
                temperature_data.innerHTML = data.data.temperature.text;
                status_data.innerHTML = data.data.overall;
                if(data.data.flower_profile_url == undefined || data.data.flower_profile_url == null){
                    user_flower.src = location.origin + '/img/dummy.png';
                }
                else{
                    let ImgUrl = location.origin + '/' + data.data.flower_profile_url;
                    setFlowerImage(function () {
                        preloader.style.display = 'none';
                        user_flower.style.display = 'block';
                        setBookList();
                    },ImgUrl);
                }
            }
        },
        error:function (err) {
            console.log(err);
        }
    });
}



function get_guardian() {
    $.ajax({
        method:'GET',
        url:'/data/guardian',
        success:function (data) {
            if(data.status == 200){
                location.href = '/show/guardian'
            }
            else if(data.status == 401){
                location.href = '/';
            }
            else if(data.status == 404){
                Toast('아직 보호자가 등록되지 않았습니다');
            }
        },
        error:function (err) {

        }
    });
}

function setBookList() {
    $.ajax({
        method:'GET',
        url:'/books',
        success:function (data) {
            let bookData = data.data;

            for(let i = 0; i<10; i++){
                let html = '<div class="book"> <div class="book-data"><div class="title">'
                if(bookData[i].title.length < 11){
                    html += '<h4>'+bookData[i].title.replace(/<b>/gi,'').replace(/<\/b>/gi,'')+'</h4>'
                }
                else{
                    html += '<h4>'+bookData[i].title.substring(0,10).replace(/<b>/gi,'').replace(/<\/b>/gi,'')+'...</h4>'
                }
                if(bookData[i].author.length < 21){
                    html += '<p>'+bookData[i].author.replace(/<b>/gi,'').replace(/<\/b>/gi,'')+'</p>'
                }
                else{
                    html += '<p>'+bookData[i].author.substring(0,20)+'...'.replace(/<b>/gi,'').replace(/<\/b>/gi,'')+'</p>'
                }
                html += '<div class="star-box">'
                let star_number = parseInt(bookData[i].star / 200);
                console.log(star_number);
                if(star_number > 5){
                    star_number = 5;
                }
                for(let i = 0; i < star_number; i++){
                    html+= '<img src="/img/star_pic.svg">'
                }
                for(let i = 0; i< (5 - star_number); i++){
                    html+= '<img src="/img/star.svg">'
                }
                html += '</div>'
                html += '<p class="star-user">'+bookData[i].star+'명이 좋아합니다.</p>'
                html += '</div>'
                html += '<div class="img">'
                html += '<img src="'+bookData[i].image+'">'
                html += '</div></div>'
                html += '<div class="book-description"><h4>책소개</h4><div>'
                if(bookData[i].description.length < 131){
                    html += bookData[i].description.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
                }
                else{
                    html += bookData[i].description.substring(0,120).replace(/<b>/gi,'').replace(/<\/b>/gi,'')+'...'
                }
                html += '</div></div></div>'

                book_health_time_line.innerHTML = book_health_time_line.innerHTML + html;
            }

            book_health_time_line.innerHTML = book_health_time_line.innerHTML + '<div class="null"></div>'

        },
        error:function (err) {
            console.log(err);
        }
    });
}

function setFlowerImage(callback , ImgUrl) {
    user_flower.src = ImgUrl;
    setTimeout(callback,1000);
}

function logout() {
    $.ajax({
        method:'POST',
        url:'/auth/logout',
        success:function (data) {
            console.log(data)
            if(data.status == 200){
                location.href = '/'
            }
        },
        error:function (err) {
            console.log(err);
        }
    })
}
