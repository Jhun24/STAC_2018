/**
 * Created by janghunlee on 2018. 8. 28..
 */
let flower_btn = document.getElementById('flower');
let mic_btn = document.getElementById('mic');
let book_btn = document.getElementById('book');
let setting_btn = document.getElementById('setting');

let now_pic_menu = flower_btn;

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

function click_btn(btn) {
    if(now_pic_menu != btn){
        now_pic_menu.children[0].children[0].src = now_pic_menu.children[0].children[0].src.replace('_pic','');
        now_pic_menu.children[0].children[1].style.color = 'rgb(172,172,172)';
        now_pic_menu = btn;
        now_pic_menu.children[0].children[0].src = now_pic_menu.children[0].children[0].src.replace('.svg','_pic.svg');
        now_pic_menu.children[0].children[1].style.color = '#2ee992';
    }
}
