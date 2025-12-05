'use client'

import { motion } from 'framer-motion'
import { MessageSquare, GitCompare, Filter, Zap } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Conversational Discovery',
    description:
      'Speak naturally. Say "I\'m looking for an agent to design a logo" and AI will suggest the best agents for you.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GitCompare,
    title: 'Agent Comparison',
    description:
      'Compare agents side-by-side from the same category. Easily view pricing, performance, and features.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Filter,
    title: 'Advanced Filtering',
    description:
      'Filter by category, price, features, and rating. Quickly find the agent you\'re looking for.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'Function Details',
    description:
      'Examine each agent\'s functions in detail. Per-function pricing and usage examples.',
    color: 'from-orange-500 to-red-500',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why AgentBase?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All the tools you need to discover, compare, and select AI agents
            in one platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

