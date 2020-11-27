const { EventEmitter } = require('events');
const nativeMetricsEmitter = require('@newrelic/native-metrics')();

const { PROMETHEUS_PREFIX } = require('./constants');

const METRIC_NAME = `${PROMETHEUS_PREFIX}_gc_pause_time_ms`;

const top = require('process-top')();

module.exports = (timeout) => {
    const eventEmitter = new EventEmitter();

    setInterval(() => {
        const loopMetrics = nativeMetricsEmitter.getLoopMetrics();

        console.log(loopMetrics);
        console.log(top.delay());

        // state = types.map((type) => {
        //     const gcMetric = gcMetrics[type];
        //     const total = !!gcMetric ? gcMetric.metrics.total : 0;
        //     return { type, total };
        // });
    }, timeout);

    //TODO: ver aqui
    // process.nextTick(() => eventEmitter.emit('metrics', formatState()));

    return eventEmitter;
};
