const http = require('http');

const express = require('express');

const defaultFunction = http.createServer;

http.createServer = (fn) => {
    return defaultFunction((req, resp) => {
        if (req.url === '/metrics') {
            return resp.end(JSON.stringify({ status: 'OK' }));
        }
        return fn(req, resp);    
    });
};

const app = express();
const port = 8080;

app.get('/fernando', (req, resp) => {
    resp.send(JSON.stringify({ status: 'FORA' }));
});

app.listen(port, () => {
    console.log('running');
});

// http.createServer((req, resp) => {
//     console.log('chegou');
//     resp.end();
// }).listen(8080);