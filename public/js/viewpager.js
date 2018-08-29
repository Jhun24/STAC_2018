/**
 * Created by janghunlee on 2018. 8. 28..
 */

let view_pagrer = document.getElementById('view-pager');

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

view_pagrer.addEventListener('touchmove',function (event) {
    console.log(event);
    document.getElementById('check').innerHTML = event;
});


function animate(view_place) {
    let view_place_translateX = view_place * 25 * - 1;
    view_pagrer.style.transitionDuration = '1s';
    view_pagrer.style.transform = "translateX("+view_place_translateX+"%)";
}