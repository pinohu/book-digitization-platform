# 📊 Monitoring Setup Guide for AI ∞ OS

## Tools Required
- Prometheus
- Grafana
- Node Exporter
- Redis Exporter
- Docker Metrics Plugin

## Steps

1. Install Prometheus & Grafana
```bash
docker run -d --name=grafana -p 3000:3000 grafana/grafana
docker run -d --name=prometheus -p 9090:9090 -v $PWD/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

2. prometheus.yml Configuration
```yaml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: 'docker'
    static_configs:
      - targets: ['host.docker.internal:9323']
  - job_name: 'redis'
    static_configs:
      - targets: ['redis:9121']
```

3. Exporters Setup
- Redis Exporter: `oliver006/redis_exporter`
- Docker Metrics: Enable Docker API metrics plugin

4. Dashboards
- Use pre-built Grafana dashboards for Redis, Docker, Prometheus

