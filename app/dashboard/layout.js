// app/dashboard/layout.js
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, Home, FileText, Upload, MessageSquare, Settings, User, Bell, Menu, X, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardLayout({ children }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // Auto-collapse sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
        setSidebarOpen(false)
      } else {
        setSidebarCollapsed(false)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const navigation = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/dashboard' },
    { id: 'contracts', icon: FileText, label: 'Contracts', href: '/dashboard/contract' },
    { id: 'analysis', icon: Upload, label: 'Case Analysis', href: '/dashboard/case-analysis' },
    { id: 'chat', icon: MessageSquare, label: 'AI Assistant', href: '/dashboard/ai-assistant' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '/dashboard/settings' }
  ]

  const closeSidebar = () => setSidebarOpen(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Scale className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const sidebarWidth = sidebarCollapsed ? 'w-16' : 'w-64'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ 
          x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -300,
          width: sidebarCollapsed ? 64 : 256
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 ${sidebarWidth}`}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            {!sidebarCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2"
              >
                <Scale className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">LegalAI</span>
              </motion.div>
            )}
            
            {sidebarCollapsed && (
              <Scale className="h-8 w-8 text-blue-600 mx-auto" />
            )}

            {/* Desktop collapse toggle */}
            <button 
              onClick={toggleCollapse}
              className="hidden lg:block text-gray-400 hover:text-gray-600 p-1"
            >
              <ChevronLeft className={`h-5 w-5 transform transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile close button */}
            <button 
              onClick={closeSidebar}
              className="lg:hidden text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.id} href={item.href} onClick={closeSidebar}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors cursor-pointer group ${
                    pathname === item.href 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                      {item.label}
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@legal.com</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        animate={{ 
          marginLeft: window.innerWidth >= 1024 ? (sidebarCollapsed ? 64 : 256) : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="min-h-screen"
      >
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-30"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 touch-target"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Legal Platform</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Professional legal document automation</p>
              </div>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 relative touch-target">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Legal Admin</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Mobile bottom navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-inset">
          <div className="flex justify-around">
            {navigation.slice(0, 4).map((item) => (
              <Link key={item.id} href={item.href}>
                <div className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                  pathname === item.href ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs mt-1 font-medium">{item.label.split(' ')[0]}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom padding for mobile nav */}
        <div className="lg:hidden h-20"></div>
      </motion.div>
    </div>
  )
}