const { EventEmitter } = require('events');
const top = require('process-top')();

const { PROMETHEUS_PREFIX } = require('./constants');

module.exports = (timeout) => {
    const eventEmitter = new EventEmitter();
    setInterval(() => {
        const metrics = extractMetrics();
        eventEmitter.emit('metrics', metrics);
    }, timeout);
    return eventEmitter;
};

function extractMetrics() {
    const cpu = top.cpu();
    const memory = top.memory();
    return [
        `${PROMETHEUS_PREFIX}_cpu_percent ${cpu.percent}`,
        `${PROMETHEUS_PREFIX}_cpu_system ${cpu.system}`,
        `${PROMETHEUS_PREFIX}_cpu_user ${cpu.user}`,
        `${PROMETHEUS_PREFIX}_memory_percent ${memory.percent}`,
        `${PROMETHEUS_PREFIX}_memory_rss_allocated ${memory.rss}`,
        `${PROMETHEUS_PREFIX}_memory_total ${memory.total}`,
        `${PROMETHEUS_PREFIX}_memory_heap_percent ${memory.heapPercent}`,
        `${PROMETHEUS_PREFIX}_memory_heap_used ${memory.heapUsed}`,
        `${PROMETHEUS_PREFIX}_memory_heap_total ${memory.heapTotal}`,
        `${PROMETHEUS_PREFIX}_memory_ext_usage ${memory.external}`,
        `${PROMETHEUS_PREFIX}_event_loop_delay ${top.delay()}`,
        `${PROMETHEUS_PREFIX}_runtime ${top.runtime()}`,
    ];
}
