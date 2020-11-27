const http = require('http');
// const gc = require('./metrics/gc');
// const eventLoop = require('./metrics/eventloop');

const topEventEmitter = require('./metrics/top')(2 * 100);

// const gcEventEmitter = gc(2 * 1000);
// const cpuEventEmitter = gc(2 * 1000);
// const eventLoopEmitter = eventLoop(2 * 1000);

const state = {};

topEventEmitter.on('metrics', (metrics) => (state.top = metrics));

// gcEventEmitter.on('metrics', (metrics) => (state.gc = metrics));
// cpuEventEmitter.on('metrics', (metrics) => (state.cpu = metrics));
// eventLoopEmitter.on('metrics', (metrics) => (state.eventLoop = metrics));

const defaultFunction = http.createServer;

http.createServer = (fn) => {
    return defaultFunction((req, resp) => {
        if (req.url === '/metrics') {
            const output = Object.keys(state)
                .map((key) => {
                    const metrics = state[key];
                    return metrics.join('\n');
                })
                .join('\n');

            return resp.end(output);
        }
        return fn(req, resp);
    });
};
