'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Plus, Search, Star, TrendingUp, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FormattedAgent } from '@/lib/virtualsApi'

export default function Comparison() {
  const [selectedAgents, setSelectedAgents] = useState<FormattedAgent[]>([])
  const [availableAgents, setAvailableAgents] = useState<FormattedAgent[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddAgent, setShowAddAgent] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAgents() {
      try {
        setLoading(true)
        const response = await fetch('/api/agents/popular?limit=20')
        if (response.ok) {
          const data = await response.json()
          setAvailableAgents(data.agents || [])
        }
      } catch (error) {
        console.error('Error fetching agents:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAgents()
  }, [])

  const addAgent = (agent: FormattedAgent) => {
    if (selectedAgents.length < 4 && !selectedAgents.find(a => a.id === agent.id)) {
      setSelectedAgents([...selectedAgents, agent])
      setShowAddAgent(false)
      setSearchQuery('')
    }
  }

  const removeAgent = (agentId: number) => {
    setSelectedAgents(selectedAgents.filter(a => a.id !== agentId))
  }

  const filteredAgents = availableAgents.filter(
    agent =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section id="comparison" className="min-h-screen pt-20 pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Compare Agents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select up to 4 agents to compare side-by-side. Make informed decisions.
          </p>
        </motion.div>

        {/* Selected Agents Display */}
        {selectedAgents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="relative bg-white rounded-xl border-2 border-blue-500 p-4 shadow-lg"
                >
                  <button
                    onClick={() => removeAgent(agent.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {agent.image && (
                    <div className="relative w-full h-24 mb-3 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900 text-sm">{agent.name}</h3>
                  <p className="text-xs text-gray-500">{agent.category}</p>
                </div>
              ))}
              {selectedAgents.length < 4 && (
                <button
                  onClick={() => setShowAddAgent(true)}
                  className="flex items-center justify-center h-full min-h-[120px] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors"
                >
                  <Plus className="w-8 h-8 text-gray-400" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Add Agent Modal/Search */}
        {showAddAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddAgent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Add Agent to Compare</h2>
                <button
                  onClick={() => setShowAddAgent(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredAgents
                  .filter(agent => !selectedAgents.find(a => a.id === agent.id))
                  .map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => addAgent(agent)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      {agent.image && (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={agent.image}
                            alt={agent.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-500">{agent.category}</p>
                      </div>
                      <Plus className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Comparison Table */}
        {selectedAgents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                      Feature
                    </th>
                    {selectedAgents.map((agent) => (
                      <th
                        key={agent.id}
                        className="px-6 py-4 text-center border-r border-gray-200 last:border-r-0"
                      >
                        <div className="flex flex-col items-center">
                          {agent.image && (
                            <div className="relative w-16 h-16 mb-3 rounded-lg overflow-hidden bg-gray-100">
                              <Image
                                src={agent.image}
                                alt={agent.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <h3 className="font-bold text-gray-900">{agent.name}</h3>
                          <span className="text-xs text-gray-500">{agent.category}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Rating */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                      Rating
                    </td>
                    {selectedAgents.map((agent) => (
                      <td
                        key={agent.id}
                        className="px-6 py-4 text-center border-r border-gray-200 last:border-r-0"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {agent.rating > 0 ? agent.rating.toFixed(1) : 'N/A'}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Price */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                      Starting Price
                    </td>
                    {selectedAgents.map((agent) => (
                      <td
                        key={agent.id}
                        className="px-6 py-4 text-center font-bold text-gray-900 border-r border-gray-200 last:border-r-0"
                      >
                        {agent.price}
                      </td>
                    ))}
                  </tr>

                  {/* Stats */}
                  {selectedAgents.some(a => a.stats) && (
                    <>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Jobs Completed
                        </td>
                        {selectedAgents.map((agent) => (
                          <td
                            key={agent.id}
                            className="px-6 py-4 text-center border-r border-gray-200 last:border-r-0"
                          >
                            {agent.stats?.jobs.toLocaleString() || 'N/A'}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                          Success Rate
                        </td>
                        {selectedAgents.map((agent) => (
                          <td
                            key={agent.id}
                            className="px-6 py-4 text-center border-r border-gray-200 last:border-r-0"
                          >
                            {agent.stats?.successRate
                              ? `${agent.stats.successRate.toFixed(1)}%`
                              : 'N/A'}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}

                  {/* Functions */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 align-top">
                      Functions
                    </td>
                    {selectedAgents.map((agent) => (
                      <td
                        key={agent.id}
                        className="px-6 py-4 border-r border-gray-200 last:border-r-0"
                      >
                        <div className="flex flex-wrap gap-2 justify-center">
                          {agent.functions.slice(0, 3).map((func) => (
                            <span
                              key={func}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                            >
                              {func.replace(/_/g, ' ')}
                            </span>
                          ))}
                          {agent.functions.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              +{agent.functions.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Description */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 align-top">
                      Description
                    </td>
                    {selectedAgents.map((agent) => (
                      <td
                        key={agent.id}
                        className="px-6 py-4 text-sm text-gray-600 border-r border-gray-200 last:border-r-0"
                      >
                        {agent.description}
                      </td>
                    ))}
                  </tr>

                  {/* Actions */}
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r border-gray-200">
                      Actions
                    </td>
                    {selectedAgents.map((agent) => (
                      <td
                        key={agent.id}
                        className="px-6 py-4 text-center border-r border-gray-200 last:border-r-0"
                      >
                        <Link
                          href={agent.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Export Button */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Download className="w-4 h-4" />
                Export Comparison
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Start Comparing Agents
              </h3>
              <p className="text-gray-600 mb-6">
                Select agents from the list above to compare their features, pricing, and performance side-by-side.
              </p>
              <button
                onClick={() => setShowAddAgent(true)}
                className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Add First Agent
              </button>
            </div>
          </motion.div>
        )}

        {/* Quick Add Section */}
        {selectedAgents.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Agents</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {availableAgents.slice(0, 6).map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => addAgent(agent)}
                  className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  {agent.image && (
                    <div className="relative w-full h-24 mb-3 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{agent.name}</h3>
                  <p className="text-xs text-gray-500">{agent.category}</p>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-5 h-5 text-blue-500" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

