// app/page.js
'use client'
import { motion } from 'framer-motion'
import { Scale, FileText, Upload, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export default function HomePage() {
  const features = [
    { icon: FileText, title: 'Contract Drafting', desc: 'Generate contracts from plain English' },
    { icon: Upload, title: 'Document Analysis', desc: 'AI-powered case file analysis' },
    { icon: MessageSquare, title: 'Legal Assistant', desc: 'Chat-based legal guidance' },
    { icon: Scale, title: 'Action Plans', desc: 'Strategic legal recommendations' }
  ]

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      {/* Navigation */}
      <motion.nav 
        variants={fadeInUp}
        className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <Scale className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">LegalAI</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  whileHover={{ y: -2 }}
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            variants={fadeInUp}
            className="text-6xl md:text-7xl font-bold text-white mb-8"
          >
            Legal AI
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Platform
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-white/80 mb-12 max-w-3xl mx-auto"
          >
            Automate contract drafting, analyze legal documents, and get AI-powered legal recommendations. 
            The future of legal work is here.
          </motion.p>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center gap-2"
              >
                Start Free Trial <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Watch Demo
            </motion.button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={staggerContainer}
          className="max-w-6xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}