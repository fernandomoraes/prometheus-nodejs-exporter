const top = require('process-top')();
const uuid = require('uuid');

const t = [];

setInterval(function () {
    // console.log(top.toString());
}, 2 * 1000);

setInterval(() => {
    for (let index = 0; index < 300; index++) {
        t.push(uuid.v4());
    }
}, 1 * 1000);
