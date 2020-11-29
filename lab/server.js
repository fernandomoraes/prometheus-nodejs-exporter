const http = require('http');
const fs = require('fs');

const blocked = require('blocked');

const uuid = require('uuid').v4;

let instances = [];

http.createServer((req, resp) => {
    // const content = fs.readFileSync('./package.json');
    // const content1 = fs.readFileSync('./.editorconfig');
    // for (let index = 0; index < 30000; index++) {
    //     instances.push(uuid());
    //     instances.push(new Pessoa(uuid()));
    //     for (let index = 0; index < 300; index++) {
    //         instances.push(uuid());
    //         instances.push(new Pessoa(uuid()));
    //     }
    // }
    // resp.end(JSON.stringify(`${content} ${content1}`));
}).listen(8080, () => console.log('running'));

setInterval(() => {
    console.log('apagando', instances.length);
    instances = [];
}, 20 * 1000);

setInterval(() => {
    for (let index = 0; index < 300000; index++) {
        instances.push(uuid() + uuid());
    }
}, 10 * 1000);

// setInterval(() => {
//     console.time('test1');
//     for (let index = 0; index < 300000; index++) {
//         console.log('teste1', index);
//     }
//     console.timeEnd('test1');
//     instances = [];
// }, 5 * 1000);

// setInterval(() => {
//     console.time('test2');
//     for (let index = 0; index < 3000000; index++) {
//         console.log('teste2', index);
//     }
//     console.timeEnd('test2');
//     instances = [];
// }, 5 * 1000);

class Pessoa {
    constructor(id) {
        this.id = id + 'fernandndasdo';
    }
}
