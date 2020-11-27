const { EventEmitter } = require('events');
const nativeMetricsEmitter = require('@newrelic/native-metrics')();

const { PROMETHEUS_PREFIX } = require('./constants');

module.exports = (timeout) => {
    const eventEmitter = new EventEmitter();

    setInterval(
        () => eventEmitter.emit('metrics', extractCurrentMetrics()),
        timeout
    );

    return eventEmitter;
};

function extractCurrentMetrics() {
    const metrics = nativeMetricsEmitter.getGCMetrics();
    const metricName = `${PROMETHEUS_PREFIX}_gc_total`;

    function saveGetTotal(type) {
        const metric = metrics[type];
        return metric ? metric.metrics.total : 0;
    }

    return [
        `${metricName}{type="scavenge"} ${saveGetTotal('Scavenge')}`,

        `${metricName}{type="mark_sweep_compact"} ${saveGetTotal(
            'MarkSweepCompact'
        )}`,
        `${metricName}{type="incremental_marking"} ${saveGetTotal(
            'IncrementalMarking'
        )}`,
        `${metricName}{type="process_weak_callbacks"} ${saveGetTotal(
            'ProcessWeakCallbacks'
        )}`,

        `${metricName}{type="all"} ${saveGetTotal('All')}`,
    ];
}
