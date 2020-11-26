const top = require('process-top')();
const uuid = require('uuid');

const t = [];

setInterval(function () {
    console.log(top.toString(), t.length);
}, 2*1000);

setInterval(() => {
    for (let i=0; i< 10000; i++) {
        t.push(uuid.v4());
    }
}, 2);