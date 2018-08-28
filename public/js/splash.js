/**
 * Created by janghunlee on 2018. 8. 28..
 */

window.onload = ()=>{
    "use strict";
    sleep(3000);
    location.href = '/register'
}

function sleep (delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}
