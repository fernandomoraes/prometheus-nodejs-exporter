const http = require('http');
const fs = require('fs');

const uuid = require('uuid').v4;

let instances = [];

http.createServer((req, resp) => {
    const content = fs.readFileSync('./package.json');
    const content1 = fs.readFileSync('./.editorconfig');

    // for (let index = 0; index < 30000; index++) {
    //     instances.push(uuid());
    //     instances.push(new Pessoa(uuid()));
    //     for (let index = 0; index < 300; index++) {
    //         instances.push(uuid());
    //         instances.push(new Pessoa(uuid()));
    //     }
    // }
    resp.end(JSON.stringify(`${content} ${content1}`));
}).listen(8080, () => console.log('running'));

setInterval(() => {
    console.log('apagando', instances.length);
    instances = [];
}, 40 * 1000);

class Pessoa {
    constructor(id) {
        this.id = id + 'fernandndasdo';
    }
}
