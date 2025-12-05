import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentBase - AI Agent Discovery & Comparison Platform',
  description: 'Discover, compare, and select AI agents from the Virtuals ACP ecosystem.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}

