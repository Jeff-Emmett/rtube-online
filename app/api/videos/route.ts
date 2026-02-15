import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mkv', '.webm', '.mov', '.avi', '.wmv', '.flv', '.m4v'])

function getS3Client() {
  return new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  })
}

export async function GET() {
  try {
    const s3 = getS3Client()
    const bucket = process.env.R2_BUCKET || 'rtube-videos'

    const command = new ListObjectsV2Command({ Bucket: bucket })
    const response = await s3.send(command)

    const videos = (response.Contents || [])
      .filter((obj) => {
        const ext = (obj.Key || '').substring((obj.Key || '').lastIndexOf('.')).toLowerCase()
        return VIDEO_EXTENSIONS.has(ext)
      })
      .map((obj) => ({
        name: obj.Key!,
        size: obj.Size || 0,
      }))
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    return NextResponse.json(videos)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
