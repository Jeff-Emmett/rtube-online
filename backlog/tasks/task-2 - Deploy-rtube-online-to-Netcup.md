---
id: TASK-2
title: Deploy rtube-online to Netcup
status: Done
assignee: []
created_date: '2026-02-15 21:11'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Docker Compose with 3 services: rtube (Next.js), nginx-rtmp (RTMP ingest + HLS), archive-worker (stream→R2). Security hardened (cap_drop ALL, no-new-privileges, read_only). Traefik labels for rtube.online. Deployed at /opt/apps/rtube-online/ on Netcup.
<!-- SECTION:DESCRIPTION:END -->
