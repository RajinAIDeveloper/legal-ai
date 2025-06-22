// app/dashboard/contract/page.js
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X, AlertTriangle, FileText, Zap, Search, Filter, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const CONTRACT_DOCUMENTS = {
  contracts: {
    name: 'Contracts & Agreements',
    documents: [
      { id: 'nda', name: 'Non-Disclosure Agreement (NDA)', complexity: 'Simple', time: '15 min' },
      { id: 'employment', name: 'Employment Contract', complexity: 'Medium', time: '30 min' },
      { id: 'contractor', name: 'Independent Contractor Agreement', complexity: 'Medium', time: '25 min' },
      { id: 'consulting', name: 'Consulting Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'internship', name: 'Internship Agreement', complexity: 'Simple', time: '20 min' },
      { id: 'sales', name: 'Sales Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'service', name: 'Service Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'franchise', name: 'Franchise Agreement', complexity: 'Complex', time: '60 min' },
      { id: 'vendor', name: 'Vendor/Supplier Agreement', complexity: 'Medium', time: '40 min' },
      { id: 'joint-venture', name: 'Joint Venture Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'partnership', name: 'Partnership Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'shareholder', name: 'Shareholder Agreement', complexity: 'Complex', time: '55 min' },
      { id: 'operating', name: 'Operating Agreement (for LLCs)', complexity: 'Complex', time: '50 min' },
      { id: 'loan', name: 'Loan Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'guaranty', name: 'Guaranty Agreement', complexity: 'Medium', time: '25 min' },
      { id: 'lease', name: 'Lease Agreement (Commercial)', complexity: 'Complex', time: '45 min' },
      { id: 'licensing', name: 'Licensing Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'commission', name: 'Commission Agreement', complexity: 'Simple', time: '20 min' },
      { id: 'distribution', name: 'Distribution Agreement', complexity: 'Medium', time: '40 min' },
      { id: 'agency', name: 'Agency Agreement', complexity: 'Medium', time: '30 min' }
    ]
  },
  corporate: {
    name: 'Corporate Governance & Internal Documents',
    documents: [
      { id: 'articles', name: 'Articles of Incorporation', complexity: 'Medium', time: '30 min' },
      { id: 'bylaws', name: 'Bylaws (for Corporations)', complexity: 'Complex', time: '45 min' },
      { id: 'resolutions', name: 'Board Resolutions', complexity: 'Simple', time: '15 min' },
      { id: 'minutes', name: 'Minutes of Meetings', complexity: 'Simple', time: '20 min' },
      { id: 'stock-purchase', name: 'Stock Purchase Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'equity-grant', name: 'Equity Grant Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'cap-table', name: 'Cap Table (Capitalization Table)', complexity: 'Medium', time: '25 min' },
      { id: 'stock-option', name: 'Stock Option Plan', complexity: 'Complex', time: '40 min' },
      { id: 'founders', name: 'Founder\'s Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'handbook', name: 'Employment Policies / Handbook', complexity: 'Medium', time: '40 min' }
    ]
  },
  'ip-tech': {
    name: 'IP, Technology & Data',
    documents: [
      { id: 'ip-assignment', name: 'Intellectual Property Assignment Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'software-dev', name: 'Software Development Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'eula', name: 'End-User License Agreement (EULA)', complexity: 'Medium', time: '35 min' },
      { id: 'terms-service', name: 'Terms of Service / Terms and Conditions', complexity: 'Medium', time: '40 min' },
      { id: 'privacy-policy', name: 'Privacy Policy (GDPR/CCPA compliant)', complexity: 'Complex', time: '45 min' },
      { id: 'tech-transfer', name: 'Technology Transfer Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'patent-license', name: 'Patent License Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'trademark-license', name: 'Trademark License Agreement', complexity: 'Medium', time: '35 min' }
    ]
  },
  compliance: {
    name: 'Compliance & Regulatory',
    documents: [
      { id: 'dpa', name: 'Data Processing Agreement (DPA)', complexity: 'Complex', time: '40 min' },
      { id: 'aml', name: 'Anti-Money Laundering (AML) Policy', complexity: 'Medium', time: '30 min' },
      { id: 'kyc', name: 'KYC (Know Your Customer) Compliance Documents', complexity: 'Medium', time: '25 min' },
      { id: 'code-conduct', name: 'Code of Conduct / Ethics Policy', complexity: 'Medium', time: '35 min' },
      { id: 'whistleblower', name: 'Whistleblower Policy', complexity: 'Medium', time: '25 min' },
      { id: 'health-safety', name: 'Health and Safety Policy', complexity: 'Medium', time: '30 min' },
      { id: 'anti-bribery', name: 'Anti-Bribery/Corruption Policy', complexity: 'Medium', time: '30 min' }
    ]
  },
  mergers: {
    name: 'Mergers, Acquisitions & Investments',
    documents: [
      { id: 'term-sheet', name: 'Term Sheet', complexity: 'Medium', time: '30 min' },
      { id: 'loi', name: 'Letter of Intent (LOI)', complexity: 'Medium', time: '25 min' },
      { id: 'due-diligence', name: 'Due Diligence Checklist', complexity: 'Complex', time: '45 min' },
      { id: 'merger', name: 'Merger Agreement', complexity: 'Complex', time: '60 min' },
      { id: 'asset-purchase', name: 'Asset Purchase Agreement', complexity: 'Complex', time: '55 min' },
      { id: 'stock-purchase-ma', name: 'Stock Purchase Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'escrow', name: 'Escrow Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'investor-rights', name: 'Investor Rights Agreement', complexity: 'Complex', time: '45 min' }
    ]
  },
  international: {
    name: 'Cross-Border & International',
    documents: [
      { id: 'intl-jv', name: 'International Joint Venture Agreement', complexity: 'Complex', time: '60 min' },
      { id: 'export-import', name: 'Export/Import Agreements', complexity: 'Complex', time: '45 min' },
      { id: 'foreign-dist', name: 'Foreign Distribution Agreements', complexity: 'Complex', time: '50 min' },
      { id: 'cross-border-emp', name: 'Cross-border Employment Contracts', complexity: 'Complex', time: '40 min' },
      { id: 'transfer-pricing', name: 'Transfer Pricing Agreements', complexity: 'Complex', time: '55 min' }
    ]
  }
}

const DOCUMENT_CONTEXTS = {
  'nda': ['Company policies', 'Previous NDAs', 'Industry standards', 'Jurisdiction requirements'],
  'employment': ['Labor laws', 'Company handbook', 'Industry standards', 'Benefits structure'],
  'partnership': ['Partnership laws', 'Financial agreements', 'Exit strategies', 'Governance structures'],
  'lease': ['Real estate laws', 'Property regulations', 'Zoning requirements', 'Insurance requirements'],
  'default': ['Legal precedents', 'Industry regulations', 'Compliance requirements', 'Best practices']
}

export default function ContractPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'contracts')
  const [activeDocument, setActiveDocument] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [complexityFilter, setComplexityFilter] = useState('All')

  const currentCategory = CONTRACT_DOCUMENTS[selectedCategory]
  const filteredDocuments = currentCategory?.documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesComplexity = complexityFilter === 'All' || doc.complexity === complexityFilter
    return matchesSearch && matchesComplexity
  }) || []

  const getDocumentContext = (docId) => {
    return DOCUMENT_CONTEXTS[docId] || DOCUMENT_CONTEXTS.default
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Legal Document Generator</h1>
        <p className="text-gray-600 text-sm sm:text-base">AI-powered document creation with legal precision</p>
      </div>

      {!activeDocument ? (
        <>
          {/* Category Tabs */}
          <div className="mb-6">
            <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-thin">
              {Object.entries(CONTRACT_DOCUMENTS).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={complexityFilter}
              onChange={(e) => setComplexityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Complexity</option>
              <option value="Simple">Simple</option>
              <option value="Medium">Medium</option>
              <option value="Complex">Complex</option>
            </select>
          </div>

          {/* Documents Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setActiveDocument(doc)}
                className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.complexity === 'Simple' ? 'bg-green-100 text-green-800' :
                      doc.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {doc.complexity}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{doc.time}</p>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{doc.name}</h3>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  Generate Document <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <DocumentForm 
          document={activeDocument} 
          onBack={() => setActiveDocument(null)}
          context={getDocumentContext(activeDocument.id)}
        />
      )}
    </div>
  )
}

const DocumentForm = ({ document, onBack, context }) => {
  const [formData, setFormData] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200"
    >
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{document.name}</h2>
              <p className="text-sm text-gray-600">AI-powered document generation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Context Disclaimer */}
      <div className="p-4 sm:p-6 bg-orange-50 border-b border-orange-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-orange-800 font-medium mb-2">
              ⚠️ For optimal document generation, ensure you have access to these context documents:
            </p>
            <ul className="text-sm text-orange-700 space-y-1">
              {context.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FileText className="h-3 w-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Document Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Party 1 Name</label>
                <input 
                  type="text" 
                  placeholder="Enter party name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Party 2 Name</label>
                <input 
                  type="text" 
                  placeholder="Enter party name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select jurisdiction</option>
                  <option value="ca">California, USA</option>
                  <option value="ny">New York, USA</option>
                  <option value="de">Delaware, USA</option>
                  <option value="tx">Texas, USA</option>
                </select>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Generate Document
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Preview</h3>
            <div className="bg-white rounded-lg p-6 border border-gray-200 h-96 overflow-y-auto">
              <div className="text-sm text-gray-700 space-y-4">
                <h4 className="font-bold text-center uppercase">{document.name}</h4>
                <p>This {document.name} (&quot;Agreement&quot;) is entered into on [DATE] by and between:</p>
                <p>
                  <strong>Party 1:</strong> [PARTY 1 NAME]<br />
                  <strong>Party 2:</strong> [PARTY 2 NAME]
                </p>
                <p className="text-blue-600 font-medium">
                  <Zap className="h-4 w-4 inline mr-2" />
                  AI will generate content based on your inputs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}