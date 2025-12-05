import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentBase - AI Agent Discovery & Comparison Platform',
  description: 'Discover, compare, and select AI agents from the Virtuals ACP ecosystem.',
  verification: {
    other: {
      'virtual-protocol-site-verification': '806be1859a42c3170083bb517b661f02',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="virtual-protocol-site-verification"
          content="806be1859a42c3170083bb517b661f02"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

