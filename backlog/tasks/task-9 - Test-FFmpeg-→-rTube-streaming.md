---
id: TASK-9
title: Test FFmpeg → rTube streaming
status: To Do
assignee: []
created_date: '2026-02-15 21:12'
labels: []
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Test RTMP ingest using FFmpeg (alternative to OBS):
1. From any machine with ffmpeg:
   ffmpeg -i input.mp4 -c:v libx264 -preset veryfast -c:a aac -f flv rtmp://rtube.online:1936/live/ffmpeg-test
2. Verify stream appears in nginx-rtmp stats: curl http://rtube-rtmp:8080/stat
3. Watch from rtube.online/live with key "ffmpeg-test"
4. Verify playback works
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 FFmpeg successfully connects and streams to RTMP endpoint
- [ ] #2 Stream is viewable via HLS at /live page
<!-- AC:END -->
