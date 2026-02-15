---
id: TASK-10
title: Test video library with uploaded content
status: To Do
assignee: []
created_date: '2026-02-15 21:12'
labels: []
dependencies: []
priority: medium
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Test the video library page with manually uploaded content:
1. Upload a test video directly to R2: rclone copy test.mp4 r2:rtube-videos/
2. Visit rtube.online/demo
3. Verify the video appears in the sidebar list
4. Click to play — verify video playback with seeking (range requests)
5. Test search/filter functionality
6. Test download and copy link buttons
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Uploaded video appears in /api/videos response
- [ ] #2 Video plays in the demo page player with seeking support
- [ ] #3 Download button works
- [ ] #4 Copy link button copies correct URL
<!-- AC:END -->
