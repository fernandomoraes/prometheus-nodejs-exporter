const emitter = require('@newrelic/native-metrics')();
const uuid = require('uuid');

let t = [];

emitter.unbind();
emitter.bind(200);

var MILLIS = 1e3;

if (emitter.gcEnabled) {
    setInterval(() => {
        const gcMetrics = emitter.getGCMetrics();
        Object.keys(gcMetrics).forEach((gcType) => {
            const gc = gcMetrics[gcType];
            // divideMetric(gc.metrics, MILLIS);
            console.log(gc.metrics.total, gcType);
        });

        // for (const type in gcMetrics) {
        //     console.log('GC type name:', type);
        //     console.log('GC type id:', gcMetrics[type].typeId);
        //     console.log('GC metrics:', gcMetrics[type].metrics);
        // }
    }, 1000);
}

setInterval(() => {
    for (let index = 0; index < 3000; index++) {
        t.push(uuid.v4());
    }
}, 5);

setInterval(() => {
    for (let index = 0; index < 3000; index++) {
        t = [];
    }
}, 20 * 1000);

function divideMetric(metric, divisor) {
    // metric.min /= divisor;
    // metric.max /= divisor;
    // metric.total /= divisor;
    // metric.sumOfSquares /= divisor * divisor;
}
