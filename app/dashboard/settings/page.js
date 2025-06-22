// app/dashboard/settings/page.js
'use client'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Globe, Palette, Database } from 'lucide-react'

export default function SettingsPage() {
  const settingSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Full Name', value: 'John Doe', type: 'input' },
        { label: 'Email', value: 'john@company.com', type: 'input' },
        { label: 'Company', value: 'Legal Corp', type: 'input' },
        { label: 'Role', value: 'Senior Attorney', type: 'select' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email notifications', value: true, type: 'toggle' },
        { label: 'Case updates', value: true, type: 'toggle' },
        { label: 'Contract alerts', value: false, type: 'toggle' },
        { label: 'Weekly digest', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Two-factor authentication', value: false, type: 'toggle' },
        { label: 'Session timeout', value: '30 minutes', type: 'select' },
        { label: 'Password strength', value: 'Strong', type: 'display' }
      ]
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 text-sm sm:text-base">Manage your account preferences and configurations</p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <section.icon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{section.title}</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
                  <label className="text-sm font-medium text-gray-700 mb-2 sm:mb-0">{item.label}</label>
                  
                  {item.type === 'input' && (
                    <input
                      type="text"
                      defaultValue={item.value}
                      className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  )}
                  
                  {item.type === 'toggle' && (
                    <div className="flex justify-start sm:justify-end">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          item.value ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: item.value ? 24 : 2 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </motion.button>
                    </div>
                  )}
                  
                  {item.type === 'select' && (
                    <select
                      defaultValue={item.value}
                      className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value={item.value}>{item.value}</option>
                    </select>
                  )}
                  
                  {item.type === 'display' && (
                    <span className="text-sm text-gray-600">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center sm:justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm sm:text-base"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}