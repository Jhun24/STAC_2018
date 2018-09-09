/**
 * Created by janghunlee on 2018. 9. 9..
 */
let toast_box = document.getElementById('toast-box');
let toast = document.getElementById('toast');


function toast_on(input_text) {
    let text = input_text;

    toast.innerHTML = text;

    toast_box.style.display = 'flex';
    toast.classList.remove('animated','fadeIn');
    toast.classList.remove('animated','fadeOut');
    toast.classList.add('animated','fadeIn');
}

function toast_out() {
    let text = '';

    out_animate(function () {
        toast.innerHTML='text';
        toast_box.style.display = 'none';
    });
}

function out_animate(callback){
    "use strict";
    toast.classList.remove('animated','fadeIn');
    toast.classList.remove('animated','fadeOut');
    toast.classList.add('animated','fadeOut');
    setTimeout(callback,2000);
}

function Toast(input_text) {
    toast_box.style.top = (document.body.scrollHeight - 100)+"px";
    toast_on(input_text);
    setTimeout(toast_out,3000);
}