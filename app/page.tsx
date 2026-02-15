import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">
              rT
            </div>
            <span className="font-semibold text-lg">rTube</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/demo"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Video Library
            </Link>
            <Link
              href="/live"
              className="text-sm px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors font-medium"
            >
              Go Live
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 via-pink-300 to-orange-300 bg-clip-text text-transparent">
            Community Video Platform
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Self-hosted video recording, live streaming, and storage for your rSpace community.
            No corporate surveillance. No algorithmic feeds. Just your community&apos;s content.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/demo"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-lg font-medium transition-all border border-slate-600"
            >
              Browse Videos
            </Link>
            <Link
              href="/live"
              className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl text-lg font-medium transition-all shadow-lg shadow-red-900/30"
            >
              Start Streaming
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Record */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Record</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stream directly from OBS, browser, or any RTMP-compatible tool. Your content
              goes straight to your community&apos;s server &mdash; no third-party platforms involved.
            </p>
          </div>

          {/* Stream */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Stream Live</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Community members watch in real-time via HLS adaptive streaming.
              Low-latency delivery through your own nginx-rtmp server with automatic
              quality adaptation.
            </p>
          </div>

          {/* Archive */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Archive & Store</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Completed streams are automatically converted to MP4 and archived to
              R2 cloud storage. Browse, search, and replay your community&apos;s entire
              video library anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Built for Communities</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-lg mt-0.5">&#9679;</span>
              <div>
                <h4 className="font-medium mb-1">Self-Hosted</h4>
                <p className="text-sm text-slate-400">Your server, your data. No YouTube, no Twitch, no corporate middlemen.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-pink-400 text-lg mt-0.5">&#9679;</span>
              <div>
                <h4 className="font-medium mb-1">RTMP Ingest</h4>
                <p className="text-sm text-slate-400">Standard RTMP protocol &mdash; works with OBS, Streamlabs, FFmpeg, and more.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-orange-400 text-lg mt-0.5">&#9679;</span>
              <div>
                <h4 className="font-medium mb-1">R2 Cloud Storage</h4>
                <p className="text-sm text-slate-400">Cloudflare R2 for cost-effective, globally distributed video storage.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-amber-400 text-lg mt-0.5">&#9679;</span>
              <div>
                <h4 className="font-medium mb-1">HLS Playback</h4>
                <p className="text-sm text-slate-400">Adaptive bitrate streaming works on every device and browser.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-rose-400 text-lg mt-0.5">&#9679;</span>
              <div>
                <h4 className="font-medium mb-1">Auto-Archive</h4>
                <p className="text-sm text-slate-400">Streams are automatically converted to MP4 and uploaded when they end.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-fuchsia-400 text-lg mt-0.5">&#9679;</span>
              <div>
                <h4 className="font-medium mb-1">Community-Scoped</h4>
                <p className="text-sm text-slate-400">Each rSpace community gets its own video library and streaming channel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to take back your video?</h2>
        <p className="text-slate-400 mb-8 max-w-lg mx-auto">
          Browse the community video library or start a live stream for your rSpace.
        </p>
        <Link
          href="/demo"
          className="inline-block px-8 py-4 bg-red-600 hover:bg-red-500 rounded-xl text-lg font-medium transition-all shadow-lg shadow-red-900/30"
        >
          Explore the Library
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 mb-4">
            <span className="font-medium text-slate-400">r* Ecosystem</span>
            <a href="https://rspace.online" className="hover:text-slate-300 transition-colors">🌌 rSpace</a>
            <a href="https://rmaps.online" className="hover:text-slate-300 transition-colors">🗺️ rMaps</a>
            <a href="https://rnotes.online" className="hover:text-slate-300 transition-colors">📝 rNotes</a>
            <a href="https://rvote.online" className="hover:text-slate-300 transition-colors">🗳️ rVote</a>
            <a href="https://rfunds.online" className="hover:text-slate-300 transition-colors">💰 rFunds</a>
            <a href="https://rtrips.online" className="hover:text-slate-300 transition-colors">✈️ rTrips</a>
            <a href="https://rcart.online" className="hover:text-slate-300 transition-colors">🛒 rCart</a>
            <a href="https://rwallet.online" className="hover:text-slate-300 transition-colors">💼 rWallet</a>
            <a href="https://rfiles.online" className="hover:text-slate-300 transition-colors">📁 rFiles</a>
            <a href="https://rcal.jeffemmett.com" className="hover:text-slate-300 transition-colors">📅 rCal</a>
            <a href="https://rtube.online" className="hover:text-slate-300 transition-colors font-medium text-slate-300">📹 rTube</a>
            <a href="https://rnetwork.online" className="hover:text-slate-300 transition-colors">🌐 rNetwork</a>
          </div>
          <p className="text-center text-xs text-slate-600">
            Part of the r* ecosystem — collaborative tools for communities.
          </p>
        </div>
      </footer>
    </div>
  )
}
