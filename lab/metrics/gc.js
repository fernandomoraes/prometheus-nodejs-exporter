const { EventEmitter } = require('events');
const nativeMetricsEmitter = require('@newrelic/native-metrics')();

const { snakeCase } = require('snake-case');

const { PROMETHEUS_PREFIX } = require('./constants');

const METRIC_NAME = `${PROMETHEUS_PREFIX}_gc_duration_ms`;

const types = [
    'Scavenge',
    'MarkSweepCompact',
    'IncrementalMarking',
    'ProcessWeakCallbacks',
    'All',
];

let state = types.map((type) => ({ type, total: 0 }));

const formatState = () => {
    return state.map(({ type, total }) => {
        return `${METRIC_NAME}{type="${snakeCase(type)}"} ${total}`;
    });
};

module.exports = (timeout) => {
    const eventEmitter = new EventEmitter();

    setInterval(() => {
        const gcMetrics = nativeMetricsEmitter.getGCMetrics();

        state = types.map((type) => {
            const gcMetric = gcMetrics[type];
            const total = !!gcMetric ? gcMetric.metrics.total : 0;
            return { type, total };
        });
    }, timeout);

    //TODO: ver aqui
    process.nextTick(() => eventEmitter.emit('metrics', formatState()));

    return eventEmitter;
};
