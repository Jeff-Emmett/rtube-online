'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function LivePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [streamKey, setStreamKey] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSetup, setShowSetup] = useState(false)

  function startWatching() {
    if (!streamKey.trim()) return
    setError(null)
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!isPlaying || !videoRef.current) return

    const hlsUrl = `/hls/${streamKey}.m3u8`

    async function initPlayer() {
      const Hls = (await import('hls.js')).default

      if (Hls.isSupported()) {
        const hls = new Hls({
          lowLatencyMode: true,
          liveSyncDurationCount: 3,
        })
        hls.loadSource(hlsUrl)
        hls.attachMedia(videoRef.current!)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(() => {})
        })
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            setError('Stream not found or ended. Check the stream key and try again.')
            setIsPlaying(false)
          }
        })

        return () => hls.destroy()
      } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari native HLS
        videoRef.current.src = hlsUrl
        videoRef.current.play().catch(() => {})
      } else {
        setError('HLS playback is not supported in this browser.')
        setIsPlaying(false)
      }
    }

    const cleanup = initPlayer()
    return () => {
      cleanup?.then((fn) => fn?.())
    }
  }, [isPlaying, streamKey])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                rT
              </div>
              <span className="font-semibold text-lg">rTube</span>
            </Link>
            <span className="text-slate-500 ml-2">/ Live</span>
          </div>
          <Link
            href="/demo"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Video Library
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-400">Live Stream</h1>

        {/* Stream viewer */}
        {!isPlaying ? (
          <div className="max-w-md mx-auto">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-lg font-semibold mb-4">Watch a Stream</h2>
              <p className="text-sm text-slate-400 mb-6">
                Enter the stream key to watch a live broadcast from your community.
              </p>
              <input
                type="text"
                placeholder="Stream key (e.g. community-meeting)"
                value={streamKey}
                onChange={(e) => setStreamKey(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startWatching()}
                className="w-full px-4 py-3 bg-black/30 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-4 text-sm focus:outline-none focus:border-red-500"
              />
              {error && (
                <p className="text-red-400 text-sm mb-4 bg-red-500/10 rounded-lg p-3">{error}</p>
              )}
              <button
                onClick={startWatching}
                disabled={!streamKey.trim()}
                className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors"
              >
                Watch Stream
              </button>
            </div>

            {/* OBS Setup */}
            <div className="mt-8">
              <button
                onClick={() => setShowSetup(!showSetup)}
                className="w-full text-left bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
              >
                <h2 className="text-lg font-semibold mb-1 flex items-center justify-between">
                  Broadcaster Setup
                  <span className="text-slate-500 text-sm">{showSetup ? '\u25B2' : '\u25BC'}</span>
                </h2>
                <p className="text-sm text-slate-400">How to stream to rTube from OBS or FFmpeg</p>
              </button>

              {showSetup && (
                <div className="mt-4 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium text-red-400 mb-2">OBS Studio</h3>
                    <ol className="text-slate-400 space-y-2 list-decimal list-inside">
                      <li>Open <strong>Settings &rarr; Stream</strong></li>
                      <li>Set Service to <strong>Custom</strong></li>
                      <li>Server: <code className="bg-black/30 px-2 py-0.5 rounded text-slate-300">rtmp://rtube.online/live</code></li>
                      <li>Stream Key: choose any key (e.g. <code className="bg-black/30 px-2 py-0.5 rounded text-slate-300">community-meeting</code>)</li>
                      <li>Click <strong>Start Streaming</strong></li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-medium text-red-400 mb-2">FFmpeg</h3>
                    <code className="block bg-black/30 p-3 rounded-lg text-slate-300 text-xs overflow-x-auto">
                      ffmpeg -i input.mp4 -c:v libx264 -preset veryfast -c:a aac -f flv rtmp://rtube.online/live/your-key
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-black rounded-2xl overflow-hidden aspect-video mb-4">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="font-medium">LIVE</span>
                <span className="text-slate-500">Stream: {streamKey}</span>
              </div>
              <button
                onClick={() => setIsPlaying(false)}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-colors"
              >
                Leave Stream
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
