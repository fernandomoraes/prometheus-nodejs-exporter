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

Example values:

```
nodejs_cpu_percent 0.008496580143248911
nodejs_cpu_system 4474
nodejs_cpu_user 29499
nodejs_memory_percent 0.00238173648447801
nodejs_memory_rss_allocated_byte 39546880
nodejs_memory_total_byte 16604221440
nodejs_memory_heap_percent 0.5280970213498623
nodejs_memory_heap_used_byte 4711200
nodejs_memory_heap_total_byte 8921088
nodejs_memory_ext_usage_byte 1625018
nodejs_event_loop_delay_ms 0
nodejs_runtime_ms 6003
nodejs_gc_total_ms{type="scavenge"} 0
nodejs_gc_total_ms{type="mark_sweep_compact"} 0
nodejs_gc_total_ms{type="incremental_marking"} 0
nodejs_gc_total_ms{type="process_weak_callbacks"} 0
nodejs_gc_total_ms{type="all"} 0
```

## Configuration

The follow variables can be used to customize de metrics exporter:

-   PROMETHEUS_SCHEDULE_TIMER (default 2000 ms): Time used to read and update the metrics values
-   PROMETHEUS_METRICS_PATH (default metrics): Path that will respond the metrics

## Http server support

This library works with all http servers basead on nodejs `http, https or http2` modules like `Express` and so on.
