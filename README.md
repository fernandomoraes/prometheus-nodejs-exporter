# prometheus-nodejs-exporter

The simplest way to export your NodeJS Applications metrics to Prometheus.

## Instalation

```
yarn add @moraes/prometheus-nodejs-exporter

//or with npm
npm install --save @moraes/prometheus-nodejs-exporter
```

You can now load de agent module using the preload sintax, without need to chance your production code:

```
node -r node_modules/@moraes/prometheus-nodejs-exporter myServer.js
```

Congragulations, now you have all the metrics exported at:

`http://localhost:{port}/metrics`

## Metrics

## Configuration

The follow variables can be used to customize de metrics exporter:

-   PROMETHEUS_SCHEDULE_TIMER (default 2000 ms): Time used to read and update the metrics values
-   PROMETHEUS_METRICS_PATH (default metrics): Path that will respond the metrics

## Http server support

This library works with all http servers basead on nodejs `http, https or http2` modules like `Express` and so on.
