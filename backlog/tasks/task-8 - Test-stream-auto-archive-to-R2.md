---
id: TASK-8
title: Test stream auto-archive to R2
status: To Do
assignee: []
created_date: '2026-02-15 21:12'
labels: []
dependencies: []
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Verify the archive worker pipeline works end-to-end:
1. Stream via OBS or FFmpeg to rtmp://rtube.online:1936/live/test-archive
2. Stream for at least 30 seconds, then stop
3. Check archive-worker logs: docker logs rtube-archive
4. Verify FLV→MP4 conversion completed
5. Verify MP4 uploaded to r2:rtube-videos/streams/
6. Verify local FLV and MP4 cleaned up from /recordings volume
7. Check rtube.online/demo — archived video should appear in the library
8. Play the archived video from the demo page
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Archive worker receives on_publish_done callback from nginx-rtmp
- [ ] #2 FLV recording is converted to MP4 via ffmpeg
- [ ] #3 MP4 is uploaded to rtube-videos R2 bucket under streams/ prefix
- [ ] #4 Archived video appears in /api/videos listing
- [ ] #5 Video plays back correctly from /demo page
<!-- AC:END -->
