'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">AgentBase</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#agents"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Agents
            </Link>
            <Link
              href="/comparison"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Compare
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
              Sign In
            </button>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

