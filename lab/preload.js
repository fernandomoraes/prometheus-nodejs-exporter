const http = require('http');
const gc = require('./metrics/gc');

const gcEventEmitter = gc(2 * 1000);
const cpuEventEmitter = gc(2 * 1000);

const state = {};

gcEventEmitter.on('metrics', (metrics) => (state.gc = metrics));
cpuEventEmitter.on('metrics', (metrics) => (state.cpu = metrics));

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

// const nativeMetricsEmitter = require('@newrelic/native-metrics')();
// const http = require('http');

// const stats = {
//     gc: {
//         marksweepcompact:
//         incrementalmarking:
//     },
// };

// const metricsPrefix = 'process_nodejs';

// function generateMetrics({ gc }) {}

// function generateGCMetrics(metrics) {
//     console.log(metrics);
//     return Object.keys(metrics)
//         .map(
//             (key) =>
//                 `${metricsPrefix}_gc_count_ms{type="${key}"}=${
//                     metrics[key] || 0
//                 }`
//         )
//         .join('\n');
// }

// const defaultFunction = http.createServer;

// http.createServer = (fn) => {
//     return defaultFunction((req, resp) => {
//         if (req.url === '/metrics') {
//             console.log(stats);
//             const output = generateGCMetrics(stats.gc);
//             return resp.end(output);
//         }
//         return fn(req, resp);
//     });
// };

// setInterval(() => {
//     const gcMetrics = nativeMetricsEmitter.getGCMetrics();
//     const updated = {};

//     Object.keys(gcMetrics).forEach((gcType) => {
//         updated[gcType.toLocaleLowerCase()] = gcMetrics[gcType].metrics.total;
//     });

//     console.log(updated);

//     stats.gc = updated;
// }, 1000);
