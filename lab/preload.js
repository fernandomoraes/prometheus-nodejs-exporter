const http = require('http');
const http2 = require('http2');

const timeout = process.env.PROMETHEUS_SCHEDULE_TIMER || 2 * 1000;

const metricsPath = process.env.PROMETHEUS_METRICS_PATH || 'metrics';

const processTopEmitter = require('./metrics/exporters/processtop')(timeout);

const nativeMetricsEmitter = require('./metrics/exporters/nativemetrics')(
    timeout
);

/*
disco
uptime
*/

const state = {};

processTopEmitter.on('metrics', (metrics) => (state.top = metrics));
nativeMetricsEmitter.on('metrics', (metrics) => (state.native = metrics));

// const defaultHttpFunction = http.createServer;
// const defaultHttp2Function = http2.createServer;

http.createServer = createWrapperFunction(http.createServer);
http2.createServer = createWrapperFunction(http2.createServer);

function createWrapperFunction(original) {
    return (fn) => {
        return original((req, resp) => {
            if (req.url === `/${metricsPath}`) {
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
}

// http.createServer = (fn) => {
//     return defaultFunction((req, resp) => {
//         if (req.url === `/${metricsPath}`) {
//             const output = Object.keys(state)
//                 .map((key) => {
//                     const metrics = state[key];
//                     return metrics.join('\n');
//                 })
//                 .join('\n');

//             return resp.end(output);
//         }
//         return fn(req, resp);
//     });
// };
