import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'rTube - Community Video Hosting, Storage & Streaming',
  description: 'Who needs YouTube, when you have (ou)rTube! Self-hosted video recording, live streaming, and storage for rSpace communities.',
  openGraph: {
    title: 'rTube - Community Video Hosting, Storage & Streaming',
    description: 'Who needs YouTube, when you have (ou)rTube! Self-hosted video recording, live streaming, and storage for rSpace communities.',
    type: 'website',
    url: 'https://rtube.online',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
