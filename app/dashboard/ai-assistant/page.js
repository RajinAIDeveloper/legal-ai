// app/dashboard/ai-assistant/page.js
'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, AlertTriangle, FileText } from 'lucide-react'


// Real AI response function using Gemini API
const generateAIResponse = async (message) => {
  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const systemPrompt = `You are a legal AI assistant. Provide helpful legal guidance while emphasizing that this is not formal legal advice.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser Query: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

// Static disclaimer data
const AI_DISCLAIMER = {
  general: "⚠️ This AI assistant provides general information only and is not a substitute for professional legal advice.",
  documentsNeeded: [
    "Case law database and precedents",
    "Jurisdiction-specific legal codes", 
    "Current regulatory updates",
    "Industry-specific compliance requirements",
    "Local court rules and procedures",
    "Specialized legal forms library"
  ]
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize on mount
  useEffect(() => {
    setMounted(true)
    setMessages([
      { 
        id: 'welcome-message', 
        role: 'assistant', 
        content: 'Hello! I\'m your legal AI assistant powered by Gemini 2.5 Flash. How can I help you today?' 
      }
    ])
  }, [])

  const sendMessage = useCallback(async () => {
    if (!newMessage.trim() || isLoading) return
    
    const userMessage = newMessage.trim()
    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    setNewMessage('')
    setMessages(prev => [...prev, { 
      id: `user-${messageId}`, 
      role: 'user', 
      content: userMessage 
    }])
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(userMessage)
      setMessages(prev => [...prev, { 
        id: `ai-${messageId}`, 
        role: 'assistant', 
        content: aiResponse 
      }])
    } catch (error) {
      console.error('AI Response Error:', error)
      setMessages(prev => [...prev, { 
        id: `error-${messageId}`,
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }, [newMessage, isLoading])

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  const handleSuggestionClick = useCallback((question) => {
    setNewMessage(question)
  }, [])

  const suggestedQuestions = [
    "How do I draft a non-disclosure agreement?",
    "What should I include in an employment contract?", 
    "How to handle a contract breach?",
    "What are the key elements of a lease agreement?"
  ]

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AI Legal Assistant</h1>
        <p className="text-gray-600 text-sm sm:text-base">Get instant legal guidance powered by Gemini 2.5 Flash</p>
      </div>

      {/* Disclaimer */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs sm:text-sm text-yellow-800 font-medium mb-2">{AI_DISCLAIMER.general}</p>
            <details className="text-xs sm:text-sm text-yellow-700">
              <summary className="cursor-pointer font-medium mb-2">Documents needed for better guidance:</summary>
              <ul className="space-y-1 ml-4">
                {AI_DISCLAIMER.documentsNeeded.map((doc, index) => (
                  <li key={`doc-${index}`} className="flex items-center space-x-2">
                    <FileText className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs">{doc}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </motion.div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 h-80 sm:h-96">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Legal AI Assistant</h3>
              <p className="text-xs sm:text-sm text-gray-600">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-3 sm:p-6 h-48 sm:h-64 overflow-y-auto scrollbar-thin">
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 sm:p-6 border-t border-gray-200">
          <div className="flex space-x-2 sm:space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about contracts, legal procedures..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-base"
              disabled={isLoading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={isLoading || !newMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-base font-medium touch-target"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 sm:mt-8"
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Suggested Questions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={`suggestion-${index}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleSuggestionClick(question)}
              disabled={isLoading}
              className="p-3 sm:p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all disabled:opacity-50 touch-target"
            >
              <p className="text-xs sm:text-sm text-gray-700">{question}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}