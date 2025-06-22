// app/dashboard/page.js
'use client'
import { motion } from 'framer-motion'
import { Scale, FileText, Upload, MessageSquare, Shield, Home, Users, Zap, Building, Globe, Gavel, TrendingUp, Database } from 'lucide-react'
import Link from 'next/link'
import { STATS, MOCK_CASES } from '../../constants'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

const CONTRACT_CATEGORIES = [
  {
    id: 'contracts',
    name: 'Contracts & Agreements',
    icon: FileText,
    color: 'bg-blue-500',
    count: 20,
    popular: ['NDA', 'Employment', 'Service Agreement']
  },
  {
    id: 'corporate',
    name: 'Corporate Governance',
    icon: Building,
    color: 'bg-purple-500',
    count: 10,
    popular: ['Articles of Inc.', 'Bylaws', 'Board Resolutions']
  },
  {
    id: 'ip-tech',
    name: 'IP & Technology',
    icon: Database,
    color: 'bg-green-500',
    count: 8,
    popular: ['IP Assignment', 'EULA', 'Privacy Policy']
  },
  {
    id: 'compliance',
    name: 'Compliance & Regulatory',
    icon: Gavel,
    color: 'bg-orange-500',
    count: 7,
    popular: ['DPA', 'Code of Conduct', 'AML Policy']
  },
  {
    id: 'mergers',
    name: 'M&A & Investments',
    icon: TrendingUp,
    color: 'bg-red-500',
    count: 8,
    popular: ['Term Sheet', 'LOI', 'Due Diligence']
  },
  {
    id: 'international',
    name: 'Cross-Border',
    icon: Globe,
    color: 'bg-indigo-500',
    count: 5,
    popular: ['Int\'l JV', 'Export Agreements']
  }
]

export default function DashboardPage() {
  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="max-w-7xl mx-auto"
    >
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm sm:text-base">Welcome back! Here's your legal workspace overview.</p>
      </div>

      {/* Stats Cards */}
      <motion.div 
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
      >
        {STATS.map((stat, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">{stat.title}</p>
                <p className="text-xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-4 w-4 sm:h-6 sm:w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contract Categories */}
      <motion.div 
        variants={fadeInUp}
        className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 mb-6 sm:mb-8"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Document Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {CONTRACT_CATEGORIES.map((category) => (
            <Link key={category.id} href={`/dashboard/contract?category=${category.id}`}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {category.count} docs
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{category.name}</h3>
                <div className="text-xs text-gray-600">
                  Popular: {category.popular.join(', ')}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Cases */}
      <motion.div 
        variants={fadeInUp}
        className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Recent Cases</h2>
        <div className="space-y-3 sm:space-y-4">
          {MOCK_CASES.map((case_item) => (
            <motion.div
              key={case_item.id}
              whileHover={{ x: 10 }}
              className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                  case_item.status === 'active' ? 'bg-green-500' : 
                  case_item.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{case_item.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{case_item.lastUpdate}</p>
                </div>
              </div>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                case_item.priority === 'high' ? 'bg-red-100 text-red-800' :
                case_item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {case_item.priority}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
