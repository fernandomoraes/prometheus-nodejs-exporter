const { EventEmitter } = require('events');
const top = require('process-top')();

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
    const cpu = top.cpu();
    const memory = top.memory();
    return [
        `${PROMETHEUS_PREFIX}_cpu_percent ${cpu.percent}`,
        `${PROMETHEUS_PREFIX}_cpu_system ${cpu.system}`,
        `${PROMETHEUS_PREFIX}_cpu_user ${cpu.user}`,
        `${PROMETHEUS_PREFIX}_memory_percent ${memory.percent}`,
        `${PROMETHEUS_PREFIX}_memory_rss_allocated_byte ${memory.rss}`,
        `${PROMETHEUS_PREFIX}_memory_total_byte ${memory.total}`,
        `${PROMETHEUS_PREFIX}_memory_heap_percent ${memory.heapPercent}`,
        `${PROMETHEUS_PREFIX}_memory_heap_used_byte ${memory.heapUsed}`,
        `${PROMETHEUS_PREFIX}_memory_heap_total_byte ${memory.heapTotal}`,
        `${PROMETHEUS_PREFIX}_memory_ext_usage_byte ${memory.external}`,
        `${PROMETHEUS_PREFIX}_event_loop_delay_ms ${top.delay()}`,
        `${PROMETHEUS_PREFIX}_runtime_ms ${top.runtime()}`,
    ];
}
