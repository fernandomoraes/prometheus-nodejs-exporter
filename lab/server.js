const http = require('http');

let instances = [];

http.createServer((req, resp) => {}).listen(8080, () => console.log('running'));

setInterval(() => {
    console.log('apagando', instances.length);
    instances = [];
}, 20 * 1000);

setInterval(() => {
    for (let index = 0; index < 300000; index++) {
        instances.push(uuid() + uuid());
    }
}, 10 * 1000);
