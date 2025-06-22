// app/dashboard/case-analysis/page.js
'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertTriangle, Eye, Clock, Zap } from 'lucide-react'
import { analyzeCaseDocuments, CONTRACT_ANALYSIS_DISCLAIMER } from '../../../services/utils'

export default function CaseAnalysisPage() {
  const [caseFiles, setCaseFiles] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef(null)
  const fileIdCounter = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setCaseFiles(prev => [...prev, ...files.map(file => ({
      id: `file-${++fileIdCounter.current}`,
      name: file.name,
      size: file.size,
      uploaded: new Date().toISOString()
    }))])
  }

  const analyzeDocuments = async () => {
    const mockDocumentText = `
    Contract Agreement between ${caseFiles[0]?.name || 'Party A'} and related parties.
    Initial contract signed: 2024-01-15
    First amendment executed: 2024-03-20
    Dispute notice received: 2024-06-10
    Key issues: Termination clause missing, indemnification standard, jurisdiction specified.
    `
    
    setIsAnalyzing(true)
    try {
      const aiAnalysis = await analyzeCaseDocuments(mockDocumentText)
      setAnalysis(aiAnalysis)
    } catch (error) {
      console.error('Analysis failed:', error)
      setAnalysis('Analysis failed. Please check your API configuration.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!mounted) {
    return <div className="max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Case Analysis</h1>
        <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
      </div>
    </div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Case Analysis</h1>
        <p className="text-gray-600 text-sm sm:text-base">Upload legal documents for AI-powered analysis with Gemini 2.5 Flash</p>
      </div>

      {/* Case Analysis Disclaimer */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs sm:text-sm text-orange-800 font-medium mb-2">{CONTRACT_ANALYSIS_DISCLAIMER.warning}</p>
            <details className="text-xs sm:text-sm text-orange-700">
              <summary className="cursor-pointer font-medium mb-2">Documents needed for better analysis:</summary>
              <ul className="space-y-1 ml-4">
                {CONTRACT_ANALYSIS_DISCLAIMER.documentsNeeded.map((doc, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FileText className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs">{doc}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Upload Documents</h2>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
            >
              <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-600 mb-2 text-sm sm:text-base">Drop files here or click to upload</p>
              <p className="text-xs sm:text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.div>

            {/* Uploaded Files */}
            {caseFiles.length > 0 && (
              <div className="mt-4 sm:mt-6 space-y-3">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">Uploaded Files</h3>
                {caseFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  </motion.div>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={analyzeDocuments}
                  disabled={isAnalyzing}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors mt-4 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Analysis Results */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Analysis Results</h2>
            
            {caseFiles.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm sm:text-base">Upload documents to see AI analysis results</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* AI Analysis Results */}
                {analysis && (
                  <div className="bg-purple-50 rounded-lg p-4 sm:p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
                      AI Analysis (Gemini 2.5 Flash)
                    </h3>
                    <div className="text-purple-800 text-xs sm:text-sm whitespace-pre-wrap bg-white p-3 sm:p-4 rounded border max-h-48 sm:max-h-64 overflow-y-auto">{analysis}</div>
                  </div>
                )}

                {/* Key Findings */}
                <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
                    Key Findings
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-700">Contract contains standard indemnification clauses</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-700">Missing termination clause - potential risk identified</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-700">Jurisdiction properly specified (California)</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />
                    Case Timeline
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { date: '2024-01-15', event: 'Initial contract signed', status: 'completed' },
                      { date: '2024-03-20', event: 'First amendment executed', status: 'completed' },
                      { date: '2024-06-10', event: 'Dispute notice received', status: 'active' },
                      { date: '2024-06-22', event: 'Response deadline', status: 'pending' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                          item.status === 'completed' ? 'bg-green-500' :
                          item.status === 'active' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-xs sm:text-sm">{item.event}</p>
                          <p className="text-xs text-gray-600">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Recommendations */}
                <div className="bg-green-50 rounded-lg p-4 sm:p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />
                    Recommended Actions
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { action: 'Send demand letter', priority: 'high', color: 'red' },
                      { action: 'Schedule mediation', priority: 'medium', color: 'yellow' },
                      { action: 'Prepare litigation documents', priority: 'low', color: 'blue' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-white rounded border">
                        <span className="text-xs sm:text-sm font-medium text-gray-900 truncate flex-1 mr-2">{item.action}</span>
                        <span className={`text-xs bg-${item.color}-100 text-${item.color}-800 px-2 py-1 rounded flex-shrink-0`}>
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}