'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FormattedAgent } from '@/lib/virtualsApi'
import { agents as staticAgents, Agent } from '@/data/agents'

// Varsayılan agent ID'leri
const AGENT_IDS = [84, 129, 1048, 788, 395, 74, 1120]

// Static verileri FormattedAgent formatına çevir
const getStaticAgents = (): FormattedAgent[] => {
  return staticAgents.map((agent: Agent): FormattedAgent => ({
    id: agent.id,
    name: agent.name,
    category: agent.category,
    description: agent.description,
    rating: agent.rating,
    price: agent.price,
    functions: agent.functions,
    url: agent.url,
    image: agent.image,
  }))
}

export default function Agents() {
  // İlk yüklemede static verileri göster
  const [agents, setAgents] = useState<FormattedAgent[]>(getStaticAgents())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Arka planda popüler agent'ları çek (liste endpoint'i - çok daha hızlı!)
    async function refreshAgents() {
      try {
        setIsRefreshing(true)
        // Doğrudan Virtuals API'den çek (GitHub Pages için client-side)
        const { fetchPopularAgentsByVolume } = await import('@/lib/virtualsMetricsApi')
        const fetchedAgents = await fetchPopularAgentsByVolume(9)
        if (fetchedAgents && fetchedAgents.length > 0) {
          setAgents(fetchedAgents)
        }
      } catch (err) {
        console.error('Agent verileri güncellenirken hata:', err)
        // Hata durumunda static veriler kalır
      } finally {
        setIsRefreshing(false)
      }
    }

    // Kısa bir gecikme ile arka planda güncelle
    const timer = setTimeout(() => {
      refreshAgents()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="agents" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Popular Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular AI agents from the Virtuals ACP ecosystem
          </p>
        </motion.div>

        {agents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No agents found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:border-gray-300"
              >
                {/* Agent Image */}
                {agent.image && (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {agent.name}
                      </h3>
                      {index < 2 && (
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                      )}
                    </div>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mb-3">
                      {agent.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2 min-h-[48px]">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900 font-semibold">
                      {agent.rating > 0 ? agent.rating.toFixed(1) : 'New'}
                    </span>
                  </div>
                  <div className="text-gray-900 font-bold">{agent.price}</div>
                </div>

                {/* Stats */}
                {agent.stats && (
                  <div className="mb-4 text-xs text-gray-500">
                    <span>{agent.stats.jobs.toLocaleString()} jobs • </span>
                    <span>{agent.stats.successRate.toFixed(1)}% success</span>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Functions:</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.functions.slice(0, 2).map((func) => (
                      <span
                        key={func}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                      >
                        {func.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {agent.functions.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{agent.functions.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={agent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors group-hover:shadow-md"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/comparison"
            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Compare Agents
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
