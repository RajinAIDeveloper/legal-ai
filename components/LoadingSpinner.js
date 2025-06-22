// components/LoadingSpinner.js
'use client'
import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`border-2 border-blue-600 border-t-transparent rounded-full ${sizeClasses[size]}`}
    />
  )
}