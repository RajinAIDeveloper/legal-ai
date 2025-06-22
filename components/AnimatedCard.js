// components/AnimatedCard.js
'use client'
import { motion } from 'framer-motion'

export default function AnimatedCard({ children, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
