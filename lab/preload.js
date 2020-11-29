const httpsModules = [require('http'), require('http2'), require('https')];

const timeout = process.env.PROMETHEUS_SCHEDULE_TIMER || 2 * 1000;

const metricsPath = process.env.PROMETHEUS_METRICS_PATH || 'metrics';

const topEmitter = require('./metrics/exporters/process-top')(timeout);

const nativeEmitter = require('./metrics/exporters/native-metrics')(timeout);

const state = {};

topEmitter.on('metrics', (metrics) => (state.top = metrics));
nativeEmitter.on('metrics', (metrics) => (state.native = metrics));

httpsModules.forEach(
    (module) => (module.createServer = wrapperFunction(module.createServer))
);

function wrapperFunction(original) {
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
