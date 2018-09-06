/**
 * Created by janghunlee on 2018. 8. 28..
 */

let view_pager = document.getElementById('view-pager');
let flower_btn = document.getElementById('flower');
let mic_btn = document.getElementById('mic');
let book_btn = document.getElementById('book');
let setting_btn = document.getElementById('setting');

let now_pic_menu = flower_btn;

let view_place_translateX = 0;

let startX = 0;
let finishX = 0;


flower_btn.addEventListener('click',function () {
    click_btn(this)
});


mic_btn.addEventListener('click',function () {
    click_btn(this)
});


book_btn.addEventListener('click',function () {
    click_btn(this)
});

setting_btn.addEventListener('click',function () {
    click_btn(this)
});

flower_btn.addEventListener('click',function () {
    animate(0);
});

mic_btn.addEventListener('click',function () {
    animate(1);
});

book_btn.addEventListener('click',function () {
    animate(2);
});

setting_btn.addEventListener('click',function () {
    animate(3);
});

view_pager.addEventListener('touchstart',function (e) {
    startX = e.targetTouches[0].screenX;
});

view_pager.addEventListener('touchend',function (e) {
    finishX = e.changedTouches[0].screenX;

    console.log(view_place_translateX);

    if(startX - finishX > 89 ){
        if(view_place_translateX != -75){
            view_place_translateX = view_place_translateX - 25;
            console.log(view_place_translateX)
            view_pager.style.transitionDuration = '1s';
            view_pager.style.transform = "translateX("+view_place_translateX+"%)";
            slide_move(view_place_translateX)
        }
    }
    else if(finishX - startX > 89){
        if(view_place_translateX != 0){
            view_place_translateX = view_place_translateX + 25;
            view_pager.style.transitionDuration = '1s';
            view_pager.style.transform = "translateX("+view_place_translateX+"%)";
            slide_move(view_place_translateX)
        }
    }
});


function click_btn(btn) {
    if(now_pic_menu != btn){
        now_pic_menu.children[0].children[0].src = now_pic_menu.children[0].children[0].src.replace('_pic','');
        now_pic_menu.children[0].children[1].style.color = 'rgb(172,172,172)';
        now_pic_menu = btn;
        now_pic_menu.children[0].children[0].src = now_pic_menu.children[0].children[0].src.replace('.svg','_pic.svg');
        now_pic_menu.children[0].children[1].style.color = '#2ee992';
    }
}


function animate(view_place) {
    view_place_translateX = view_place * 25 * - 1;
    view_pager.style.transitionDuration = '1s';
    view_pager.style.transform = "translateX("+view_place_translateX+"%)";
}

function slide_move(place) {
    let slide_now_btn;
    if(place == 0){
        slide_now_btn = flower_btn;
    }
    else if(place == -25){
        slide_now_btn = mic_btn;
    }
    else if(place == -50){
        slide_now_btn = book_btn;
    }
    else if(place == -75){
        slide_now_btn = setting_btn;
    }

    now_pic_menu.children[0].children[0].src = now_pic_menu.children[0].children[0].src.replace('_pic','');
    now_pic_menu.children[0].children[1].style.color = 'rgb(172,172,172)';
    now_pic_menu = slide_now_btn;
    now_pic_menu.children[0].children[0].src = now_pic_menu.children[0].children[0].src.replace('.svg','_pic.svg');
    now_pic_menu.children[0].children[1].style.color = '#2ee992';
}