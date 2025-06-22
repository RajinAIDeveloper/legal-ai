// services/utils.js
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export async function generateAIResponse(message, context = 'general') {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const systemPrompts = {
    general: `You are a legal AI assistant. Provide helpful legal guidance while emphasizing that this is not formal legal advice.`,
    contract: `You are analyzing legal contracts. Identify key clauses, risks, and recommendations. Always mention limitations of AI analysis.`,
    analysis: `You are analyzing legal documents. Extract key information, timelines, and provide strategic recommendations.`
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompts[context]}\n\nUser Query: ${message}`
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

export async function analyzeContract(contractText, documentType = 'contract') {
  const prompt = `
    Analyze this ${documentType} and provide:
    1. Key terms and clauses
    2. Potential risks or red flags
    3. Missing standard clauses
    4. Recommendations for improvement
    
    Contract text: ${contractText}
  `;
  
  return await generateAIResponse(prompt, 'contract');
}

export async function analyzeCaseDocuments(documentsText) {
  const prompt = `
    Analyze these legal documents and provide:
    1. Case timeline and key events
    2. Legal issues identified
    3. Strengths and weaknesses
    4. Recommended next actions
    
    Documents: ${documentsText}
  `;
  
  return await generateAIResponse(prompt, 'analysis');
}

export const AI_DISCLAIMER = {
  general: "⚠️ This AI assistant provides general information only and is not a substitute for professional legal advice.",
  documentsNeeded: [
    "Case law database and precedents",
    "Jurisdiction-specific legal codes",
    "Current regulatory updates",
    "Industry-specific compliance requirements",
    "Local court rules and procedures",
    "Specialized legal forms library"
  ]
};

export const CONTRACT_ANALYSIS_DISCLAIMER = {
  warning: "⚠️ AI analysis is preliminary. Always have contracts reviewed by qualified legal counsel.",
  documentsNeeded: [
    "Jurisdiction-specific contract templates",
    "Industry standard clause libraries",
    "Recent case law on contract disputes",
    "Regulatory compliance requirements",
    "Standard terms and conditions databases",
    "Contract negotiation best practices guides",
    "Legal precedent database for clause interpretation"
  ]
};