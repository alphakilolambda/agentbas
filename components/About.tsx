'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            About AgentBase
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to discovering and comparing AI agents in the Virtuals ACP ecosystem
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What is AgentBase?</h2>
              <p className="text-gray-600 leading-relaxed">
                AgentBase is a comprehensive discovery and comparison platform designed to help users
                navigate the rapidly growing ecosystem of AI agents available through Virtuals ACP.
                Our mission is to simplify the process of finding, evaluating, and selecting the
                perfect AI agent for your needs.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We believe that everyone should have easy access to the best AI agents. AgentBase
                provides transparent, detailed information about each agent, including pricing,
                functionality, performance metrics, and user ratings. This empowers users to make
                informed decisions when choosing AI agents for their projects.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>
                    <strong className="text-gray-900">Comprehensive Agent Database:</strong> Browse
                    and discover AI agents from various categories including DeFi, Productivity,
                    Entertainment, and more.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>
                    <strong className="text-gray-900">Side-by-Side Comparison:</strong> Compare up
                    to 4 agents simultaneously to evaluate features, pricing, and performance
                    metrics.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>
                    <strong className="text-gray-900">Real-time Data:</strong> Access up-to-date
                    information about agent pricing, success rates, and job completion statistics.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">•</span>
                  <span>
                    <strong className="text-gray-900">User Ratings:</strong> See ratings and reviews
                    from users who have experience with different agents.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Built on Virtuals ACP</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AgentBase is built on top of the Virtuals ACP (Agent Computing Protocol) ecosystem,
                which provides a decentralized platform for AI agent interactions. Virtuals ACP
                enables developers to create, deploy, and monetize AI agents while providing users
                with access to a diverse range of intelligent services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Learn more about Virtuals ACP and explore the ecosystem at{' '}
                <Link
                  href="https://virtuals.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  virtuals.io
                </Link>
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Ready to discover your next AI agent? Start exploring our catalog of popular agents
                or use our comparison tool to find the perfect match for your needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#agents"
                  className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Browse Agents
                </Link>
                <Link
                  href="/comparison"
                  className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors border-2 border-gray-200"
                >
                  Compare Agents
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

