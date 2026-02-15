#!/usr/bin/env python3
"""
Archive worker - converts completed streams to MP4 and uploads to R2.
Ported from streaming-server archive-worker.py, using rtube-videos bucket.
"""

import os
import subprocess
import time
import threading
from flask import Flask

app = Flask(__name__)

RECORDINGS_DIR = "/recordings"
R2_BUCKET = os.environ.get("R2_BUCKET", "rtube-videos")
ARCHIVE_PREFIX = "streams"


def upload_to_r2(filepath):
    """Convert FLV to MP4 and upload to R2."""
    filename = os.path.basename(filepath)
    mp4_path = filepath.replace(".flv", ".mp4")

    print(f"Converting {filename} to MP4...")
    try:
        subprocess.run(
            [
                "ffmpeg", "-i", filepath,
                "-c", "copy",
                "-movflags", "+faststart",
                mp4_path,
            ],
            check=True,
            capture_output=True,
        )

        dest = f"r2:{R2_BUCKET}/{ARCHIVE_PREFIX}/"
        print(f"Uploading {os.path.basename(mp4_path)} to {dest}...")

        subprocess.run(
            ["rclone", "copy", mp4_path, dest],
            check=True,
        )

        print(f"Uploaded: {mp4_path}")

        # Cleanup local files
        os.remove(filepath)
        os.remove(mp4_path)
        print("Cleaned up local files")

    except Exception as e:
        print(f"Error processing {filename}: {e}")


def process_recordings():
    """Process any pending FLV recordings."""
    time.sleep(5)  # Wait for file to finish writing

    for f in os.listdir(RECORDINGS_DIR):
        if f.endswith(".flv"):
            filepath = os.path.join(RECORDINGS_DIR, f)
            # Check if file is still being written
            size1 = os.path.getsize(filepath)
            time.sleep(2)
            size2 = os.path.getsize(filepath)

            if size1 == size2:  # File is complete
                upload_to_r2(filepath)


@app.route("/archive", methods=["POST", "GET"])
def archive():
    """Called when stream ends."""
    print("Stream ended, processing recordings...")
    thread = threading.Thread(target=process_recordings)
    thread.start()
    return "OK", 200


@app.route("/health")
def health():
    return "OK", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8081)
