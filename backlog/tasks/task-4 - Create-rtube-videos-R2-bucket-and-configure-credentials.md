---
id: TASK-4
title: Create rtube-videos R2 bucket and configure credentials
status: Done
assignee: []
created_date: '2026-02-15 21:11'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Created rtube-videos R2 bucket in Cloudflare (EU region). Generated scoped R2 API token (Object Read & Write). Configured .env at /opt/apps/rtube-online/.env with R2_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY. Configured rclone r2 remote on Netcup for archive worker. Endpoint: https://0e7b3338d5278ed1b148e6456b940913.eu.r2.cloudflarestorage.com
<!-- SECTION:DESCRIPTION:END -->
