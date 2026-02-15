---
id: TASK-7
title: Test OBS → rTube live streaming
status: To Do
assignee: []
created_date: '2026-02-15 21:12'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
End-to-end test of RTMP streaming workflow:
1. Open OBS Studio, set Service to Custom
2. Server: rtmp://rtube.online:1936/live
3. Stream Key: test-stream
4. Start streaming from OBS
5. Open rtube.online/live in browser, enter key "test-stream"
6. Verify HLS playback works with low latency
7. Verify LIVE indicator shows on the page
8. Stop stream and verify clean disconnect
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 OBS connects to rtmp://rtube.online:1936/live without error
- [ ] #2 HLS player at /live loads and plays the stream
- [ ] #3 Stream playback has acceptable latency (<10s)
- [ ] #4 Stopping stream shows appropriate error/ended message in viewer
<!-- AC:END -->
