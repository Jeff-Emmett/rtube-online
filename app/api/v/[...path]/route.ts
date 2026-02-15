import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

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

const MIME_TYPES: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/mp4',
  '.ogg': 'video/ogg',
  '.m4v': 'video/mp4',
  '.mkv': 'video/x-matroska',
  '.avi': 'video/x-msvideo',
  '.flv': 'video/x-flv',
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const s3 = getS3Client()
    const bucket = process.env.R2_BUCKET || 'rtube-videos'
    const key = params.path.join('/')

    // Get file metadata
    const headCommand = new HeadObjectCommand({ Bucket: bucket, Key: key })
    const head = await s3.send(headCommand)
    const fileSize = head.ContentLength || 0
    const ext = key.substring(key.lastIndexOf('.')).toLowerCase()
    const contentType = MIME_TYPES[ext] || head.ContentType || 'video/mp4'

    const rangeHeader = request.headers.get('range')

    if (rangeHeader) {
      // Parse range header for video seeking
      const parts = rangeHeader.replace('bytes=', '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

      const getCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        Range: `bytes=${start}-${end}`,
      })
      const response = await s3.send(getCommand)
      const body = response.Body as ReadableStream

      return new NextResponse(body as unknown as BodyInit, {
        status: 206,
        headers: {
          'Content-Type': contentType,
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': String(end - start + 1),
          'Cache-Control': 'public, max-age=31536000',
        },
      })
    } else {
      const getCommand = new GetObjectCommand({ Bucket: bucket, Key: key })
      const response = await s3.send(getCommand)
      const body = response.Body as ReadableStream

      return new NextResponse(body as unknown as BodyInit, {
        headers: {
          'Content-Type': contentType,
          'Content-Length': String(fileSize),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=31536000',
        },
      })
    }
  } catch (error) {
    if ((error as { name?: string }).name === 'NoSuchKey') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
