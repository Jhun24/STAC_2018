/**
 * Created by janghunlee on 2018. 8. 28..
 */

let view_pagrer = document.getElementById('view-pager');

let view_place_translateX = 0;

let startX = 0;
let finishX = 0;

window.onload =()=>{
    "use strict";
    document.body.requestFullscreen;
}
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

view_pagrer.addEventListener('touchstart',function (e) {
    startX = e.targetTouches[0].screenX;
});

view_pagrer.addEventListener('touchend',function (e) {
    finishX = e.changedTouches[0].screenX;

    if(finishX - startX > 89 ){
        if(view_place_translateX != -75){
            view_place_translateX = view_place_translateX - 25;
            view_pagrer.style.transitionDuration = '1s';
            view_pagrer.style.transform = "translateX("+view_place_translateX+"%)";
        }
    }
    else if(startX - finishX > 89){
        if(view_place_translateX != 0){
            view_place_translateX = view_place_translateX + 25;
            view_pagrer.style.transitionDuration = '1s';
            view_pagrer.style.transform = "translateX("+view_place_translateX+"%)";
        }
    }
})


function animate(view_place) {
    view_place_translateX = view_place * 25 * - 1;
    view_pagrer.style.transitionDuration = '1s';
    view_pagrer.style.transform = "translateX("+view_place_translateX+"%)";
}