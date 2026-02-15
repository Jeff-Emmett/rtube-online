'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Video {
  name: string
  size: number
}

function formatSize(bytes: number): string {
  if (!bytes) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let b = bytes
  while (b >= 1024 && i < units.length - 1) {
    b /= 1024
    i++
  }
  return `${b.toFixed(1)} ${units[i]}`
}

function getIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  if (['mp4', 'webm', 'mov'].includes(ext)) return '\uD83C\uDFAC'
  if (['mkv', 'avi', 'wmv', 'flv'].includes(ext)) return '\u26A0\uFE0F'
  return '\uD83D\uDCC4'
}

function isPlayable(filename: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return ['mp4', 'webm', 'mov', 'ogg', 'm4v'].includes(ext)
}

export default function DemoPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load videos')
        return res.json()
      })
      .then((data) => {
        setVideos(data)
        setFilteredVideos(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFilteredVideos(videos.filter((v) => v.name.toLowerCase().includes(q)))
  }, [search, videos])

  function playVideo(key: string) {
    setCurrentVideo(key)
  }

  function copyLink() {
    if (!currentVideo) return
    navigator.clipboard.writeText(`${window.location.origin}/api/v/${encodeURIComponent(currentVideo)}`)
  }

  const ext = currentVideo?.split('.').pop()?.toLowerCase() || ''
  const playable = currentVideo ? isPlayable(currentVideo) : false

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
                rT
              </div>
              <span className="font-semibold text-lg">rTube</span>
            </Link>
            <span className="text-slate-500 ml-2">/ Video Library</span>
          </div>
          <Link
            href="/live"
            className="text-sm px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors font-medium"
          >
            Go Live
          </Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-400">Video Library</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 max-h-[80vh] overflow-y-auto">
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-slate-700 rounded-lg text-white placeholder-slate-500 mb-4 text-sm focus:outline-none focus:border-red-500"
            />
            <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Library</h2>

            {loading && <p className="text-slate-500 text-sm p-4">Loading videos...</p>}
            {error && <p className="text-red-400 text-sm p-4 bg-red-500/10 rounded-lg">Error: {error}</p>}

            <ul className="space-y-1">
              {filteredVideos.map((v) => (
                <li
                  key={v.name}
                  onClick={() => playVideo(v.name)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all text-sm
                    ${currentVideo === v.name ? 'bg-red-500/20 border-l-2 border-red-500' : 'hover:bg-slate-700/50'}
                    ${!isPlayable(v.name) ? 'opacity-60' : ''}`}
                >
                  <span>{getIcon(v.name)}</span>
                  <span className="flex-1 truncate" title={v.name}>{v.name}</span>
                  <span className="text-xs text-slate-600 shrink-0">{formatSize(v.size)}</span>
                </li>
              ))}
              {!loading && filteredVideos.length === 0 && (
                <li className="text-slate-500 text-sm p-4">No videos found</li>
              )}
            </ul>
          </div>

          {/* Player */}
          <div>
            <div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
              {!currentVideo && (
                <p className="text-slate-600 text-lg">Select a video to play</p>
              )}
              {currentVideo && !playable && (
                <div className="text-center p-8">
                  <p className="text-4xl mb-4">{'\u26A0\uFE0F'}</p>
                  <p><strong>{ext.toUpperCase()}</strong> files cannot play in browsers</p>
                  <p className="text-sm text-slate-500 mt-2">Download to play locally, or re-record in MP4 format</p>
                </div>
              )}
              {currentVideo && playable && (
                <video
                  ref={videoRef}
                  key={currentVideo}
                  controls
                  autoPlay
                  preload="auto"
                  className="w-full h-full"
                >
                  <source
                    src={`/api/v/${encodeURIComponent(currentVideo)}`}
                    type={ext === 'webm' ? 'video/webm' : 'video/mp4'}
                  />
                </video>
              )}
            </div>

            {currentVideo && (
              <div className="mt-4 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-center justify-between flex-wrap gap-4">
                <p className="font-medium">{currentVideo}</p>
                <div className="flex gap-2">
                  <a
                    href={`/api/v/${encodeURIComponent(currentVideo)}`}
                    download
                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-colors"
                  >
                    Download
                  </a>
                  <button
                    onClick={copyLink}
                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
