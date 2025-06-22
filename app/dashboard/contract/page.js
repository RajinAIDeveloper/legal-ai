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
  founding: {
    name: 'Founding & Startup Documents',
    documents: [
      { id: 'pre-inc', name: 'Pre-Incorporation Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'founders-stock', name: 'Founders\' Stock Agreement', complexity: 'Complex', time: '40 min' },
      { id: 'incorporation-filings', name: 'Incorporation Filings (Form 10-K, 8-K, S-1)', complexity: 'Complex', time: '60 min' },
      { id: 'business-registration', name: 'Business Registration Forms', complexity: 'Medium', time: '25 min' },
      { id: 'ein-application', name: 'Employer Identification Number (EIN) Application', complexity: 'Simple', time: '15 min' }
    ]
  },
  finance: {
    name: 'Finance & Fundraising Documents',
    documents: [
      { id: 'safe', name: 'SAFE (Simple Agreement for Future Equity)', complexity: 'Medium', time: '35 min' },
      { id: 'convertible-note', name: 'Convertible Note Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'investment-subscription', name: 'Investment Subscription Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'capital-call', name: 'Capital Call Notice', complexity: 'Simple', time: '20 min' },
      { id: 'promissory-note', name: 'Promissory Note', complexity: 'Medium', time: '25 min' },
      { id: 'debt-restructuring', name: 'Debt Restructuring Agreement', complexity: 'Complex', time: '55 min' },
      { id: 'revenue-sharing', name: 'Revenue Sharing Agreement', complexity: 'Medium', time: '35 min' }
    ]
  },
  'hr-employment': {
    name: 'Human Resources & Employment',
    documents: [
      { id: 'severance', name: 'Severance Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'non-compete', name: 'Non-Compete Agreement', complexity: 'Medium', time: '25 min' },
      { id: 'non-solicitation', name: 'Non-Solicitation Agreement', complexity: 'Medium', time: '25 min' },
      { id: 'offer-letter', name: 'Offer Letter', complexity: 'Simple', time: '15 min' },
      { id: 'bonus-agreement', name: 'Bonus Agreement', complexity: 'Simple', time: '20 min' },
      { id: 'commission-structure', name: 'Commission Structure Document', complexity: 'Medium', time: '25 min' },
      { id: 'remote-work', name: 'Remote Work Policy', complexity: 'Medium', time: '30 min' },
      { id: 'termination-notice', name: 'Employment Termination Notice', complexity: 'Simple', time: '15 min' },
      { id: 'arbitration', name: 'Arbitration Agreement', complexity: 'Medium', time: '30 min' }
    ]
  },
  operations: {
    name: 'Operations & Procurement',
    documents: [
      { id: 'purchase-order', name: 'Purchase Order Terms', complexity: 'Simple', time: '20 min' },
      { id: 'inventory-supply', name: 'Inventory Supply Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'equipment-lease', name: 'Equipment Lease Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'logistics', name: 'Logistics Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'manufacturing', name: 'Manufacturing Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'packaging', name: 'Packaging Agreement', complexity: 'Medium', time: '25 min' },
      { id: 'quality-control', name: 'Quality Control Agreement', complexity: 'Medium', time: '30 min' }
    ]
  },
  'real-estate': {
    name: 'Real Estate & Facilities',
    documents: [
      { id: 'property-purchase', name: 'Property Purchase Agreement', complexity: 'Complex', time: '55 min' },
      { id: 'construction', name: 'Construction Contract', complexity: 'Complex', time: '60 min' },
      { id: 'facility-maintenance', name: 'Facility Maintenance Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'coworking-license', name: 'Co-working Space License', complexity: 'Simple', time: '20 min' },
      { id: 'sublease', name: 'Sublease Agreement', complexity: 'Medium', time: '35 min' }
    ]
  },
  'ip-media': {
    name: 'Intellectual Property & Media',
    documents: [
      { id: 'work-for-hire', name: 'Work for Hire Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'media-release', name: 'Media Release/Consent Form', complexity: 'Simple', time: '15 min' },
      { id: 'trademark-assignment', name: 'Trademark Assignment Agreement', complexity: 'Medium', time: '25 min' },
      { id: 'copyright-registration', name: 'Copyright Registration Form', complexity: 'Medium', time: '25 min' },
      { id: 'domain-transfer', name: 'Domain Name Transfer Agreement', complexity: 'Simple', time: '20 min' },
      { id: 'software-escrow', name: 'Software Escrow Agreement', complexity: 'Complex', time: '40 min' }
    ]
  },
  'international-trade': {
    name: 'International Trade & Expansion',
    documents: [
      { id: 'foreign-entity', name: 'Foreign Entity Registration', complexity: 'Complex', time: '45 min' },
      { id: 'cross-border-tax', name: 'Cross-border Tax Compliance Filings', complexity: 'Complex', time: '50 min' },
      { id: 'foreign-employment', name: 'Foreign Employment Contracts', complexity: 'Complex', time: '40 min' },
      { id: 'intl-arbitration', name: 'International Arbitration Clause', complexity: 'Medium', time: '25 min' },
      { id: 'intl-agency', name: 'International Agency Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'transfer-pricing-doc', name: 'Transfer Pricing Documentation', complexity: 'Complex', time: '60 min' }
    ]
  },
  government: {
    name: 'Government & Legal Compliance',
    documents: [
      { id: 'sec-filings', name: 'SEC Filings (US)', complexity: 'Complex', time: '60 min' },
      { id: 'annual-return', name: 'Annual Return / Compliance Filings', complexity: 'Medium', time: '35 min' },
      { id: 'compliance-checklist', name: 'Corporate Compliance Checklist', complexity: 'Medium', time: '30 min' },
      { id: 'regulatory-license', name: 'Regulatory License Applications', complexity: 'Complex', time: '50 min' },
      { id: 'environmental-cert', name: 'Environmental Compliance Certification', complexity: 'Complex', time: '45 min' },
      { id: 'gdpr-consent', name: 'GDPR Consent Templates', complexity: 'Medium', time: '30 min' },
      { id: 'risk-framework', name: 'Risk Management Framework', complexity: 'Complex', time: '55 min' }
    ]
  },
  dispute: {
    name: 'Dispute & Litigation',
    documents: [
      { id: 'cease-desist', name: 'Cease and Desist Letter', complexity: 'Medium', time: '25 min' },
      { id: 'settlement', name: 'Settlement Agreement', complexity: 'Complex', time: '40 min' },
      { id: 'mediation', name: 'Mediation Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'demand-letter', name: 'Legal Demand Letter', complexity: 'Medium', time: '25 min' },
      { id: 'complaint', name: 'Complaint/Plaint Statement', complexity: 'Complex', time: '45 min' },
      { id: 'waiver-release', name: 'Waiver and Release of Liability', complexity: 'Medium', time: '20 min' }
    ]
  },
  'corp-strategy': {
    name: 'Corporate Strategy & Restructuring',
    documents: [
      { id: 'holding-company', name: 'Holding Company Agreement', complexity: 'Complex', time: '55 min' },
      { id: 'succession-plan', name: 'Business Succession Plan', complexity: 'Complex', time: '60 min' },
      { id: 'share-buyback', name: 'Share Buyback Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'reverse-vesting', name: 'Reverse Vesting Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'spin-off-strategy', name: 'Spin-off Agreement', complexity: 'Complex', time: '60 min' },
      { id: 'asset-protection', name: 'Asset Protection Trust Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'change-control', name: 'Change of Control Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'share-issuance', name: 'Corporate Resolution for Issuance of Shares', complexity: 'Medium', time: '25 min' },
      { id: 'internal-reorg', name: 'Internal Reorganization Plan', complexity: 'Complex', time: '55 min' }
    ]
  },
  banking: {
    name: 'Banking, Credit & Securities',
    documents: [
      { id: 'bank-loan', name: 'Bank Loan Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'credit-facility', name: 'Credit Facility Agreement', complexity: 'Complex', time: '55 min' },
      { id: 'intercreditor', name: 'Intercreditor Agreement', complexity: 'Complex', time: '60 min' },
      { id: 'security-agreement', name: 'Security Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'collateral-assignment', name: 'Collateral Assignment Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'equity-line', name: 'Equity Line Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'subordination', name: 'Subordination Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'ppm', name: 'Private Placement Memorandum (PPM)', complexity: 'Complex', time: '60 min' },
      { id: 'securities-purchase', name: 'Securities Purchase Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'escrow-instructions', name: 'Escrow Instructions', complexity: 'Medium', time: '25 min' }
    ]
  },
  'board-exec': {
    name: 'Board & Executive Documents',
    documents: [
      { id: 'board-consent', name: 'Board Consent in Lieu of Meeting', complexity: 'Simple', time: '20 min' },
      { id: 'exec-compensation', name: 'Executive Compensation Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'indemnification', name: 'Indemnification Agreement (for Directors & Officers)', complexity: 'Complex', time: '40 min' },
      { id: 'governance-charter', name: 'Corporate Governance Charter', complexity: 'Complex', time: '50 min' },
      { id: 'do-insurance', name: 'D&O Insurance Policy Review Summary', complexity: 'Medium', time: '30 min' },
      { id: 'business-conduct', name: 'Code of Business Conduct and Ethics', complexity: 'Medium', time: '35 min' },
      { id: 'audit-charter', name: 'Audit Committee Charter', complexity: 'Medium', time: '30 min' },
      { id: 'conflict-disclosure', name: 'Conflict of Interest Disclosure Form', complexity: 'Simple', time: '15 min' }
    ]
  },
  'risk-insurance': {
    name: 'Risk, Insurance, and Liability',
    documents: [
      { id: 'risk-assessment', name: 'Risk Assessment Report', complexity: 'Complex', time: '45 min' },
      { id: 'business-interruption', name: 'Business Interruption Insurance Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'product-liability', name: 'Product Liability Waiver', complexity: 'Medium', time: '25 min' },
      { id: 'cybersecurity-policy', name: 'Cybersecurity Policy Agreement', complexity: 'Complex', time: '40 min' },
      { id: 'disaster-recovery', name: 'Disaster Recovery Plan', complexity: 'Complex', time: '50 min' },
      { id: 'business-continuity', name: 'Business Continuity Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'liability-limitation', name: 'Limitation of Liability Clause Documents', complexity: 'Medium', time: '25 min' },
      { id: 'hold-harmless', name: 'Hold Harmless Agreement', complexity: 'Medium', time: '30 min' }
    ]
  },
  'industry-specific': {
    name: 'Industry-Specific & Regulatory',
    documents: [
      { id: 'hipaa-compliance', name: 'HIPAA Compliance Agreement (Health)', complexity: 'Complex', time: '45 min' },
      { id: 'pci-dss', name: 'PCI-DSS Agreement (Payment Industry)', complexity: 'Complex', time: '40 min' },
      { id: 'fintech-compliance', name: 'Fintech Compliance Document Set (AML/KYC, Risk)', complexity: 'Complex', time: '60 min' },
      { id: 'export-compliance', name: 'Export Compliance Agreement (ITAR, EAR)', complexity: 'Complex', time: '50 min' },
      { id: 'clinical-trial', name: 'Clinical Trial Agreement (Pharma/Health)', complexity: 'Complex', time: '55 min' },
      { id: 'fda-regulatory', name: 'FDA Regulatory Filing (510(k), NDA)', complexity: 'Complex', time: '60 min' },
      { id: 'franchise-disclosure', name: 'Franchise Disclosure Document (FDD)', complexity: 'Complex', time: '60 min' },
      { id: 'aviation-lease', name: 'Aviation Lease and Compliance Agreement', complexity: 'Complex', time: '55 min' },
      { id: 'energy-supply', name: 'Energy Supply Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'mineral-rights', name: 'Mining or Mineral Rights Agreement', complexity: 'Complex', time: '55 min' }
    ]
  },
  'client-facing': {
    name: 'Client & Customer-Facing Legal Docs',
    documents: [
      { id: 'client-engagement', name: 'Client Engagement Letter', complexity: 'Medium', time: '25 min' },
      { id: 'retainer', name: 'Retainer Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'refund-policy', name: 'Refund and Cancellation Policy', complexity: 'Simple', time: '20 min' },
      { id: 'sla', name: 'SLA (Service Level Agreement)', complexity: 'Medium', time: '35 min' },
      { id: 'aup', name: 'Acceptable Use Policy (AUP)', complexity: 'Medium', time: '30 min' },
      { id: 'data-consent', name: 'Consent to Use Data Form', complexity: 'Medium', time: '25 min' },
      { id: 'cookie-policy', name: 'Cookie Policy', complexity: 'Simple', time: '20 min' },
      { id: 'custom-client', name: 'Custom Client Agreement (for high-ticket B2B deals)', complexity: 'Complex', time: '45 min' }
    ]
  },
  'tech-saas': {
    name: 'Technology, SaaS, & Web',
    documents: [
      { id: 'beta-test', name: 'Beta Test Agreement', complexity: 'Medium', time: '25 min' },
      { id: 'saas-subscription', name: 'SaaS Subscription Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'api-license', name: 'API License Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'white-label', name: 'White Label Agreement', complexity: 'Complex', time: '40 min' },
      { id: 'software-reseller', name: 'Software Reseller Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'cloud-services', name: 'Cloud Services Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'data-sharing', name: 'Data Sharing Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'bug-bounty', name: 'Bug Bounty Terms', complexity: 'Medium', time: '25 min' },
      { id: 'ai-model-use', name: 'AI Model Use Agreement', complexity: 'Complex', time: '40 min' },
      { id: 'prompt-engineering', name: 'Prompt Engineering IP Agreement', complexity: 'Medium', time: '30 min' }
    ]
  },
  sustainability: {
    name: 'Sustainability & ESG',
    documents: [
      { id: 'esg-policy', name: 'ESG Policy Statement', complexity: 'Medium', time: '35 min' },
      { id: 'carbon-offset', name: 'Carbon Offset Agreement', complexity: 'Medium', time: '30 min' },
      { id: 'green-lease', name: 'Green Lease Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'sustainability-reporting', name: 'Sustainability Reporting Template', complexity: 'Medium', time: '30 min' },
      { id: 'csr-charter', name: 'Corporate Social Responsibility (CSR) Charter', complexity: 'Medium', time: '35 min' }
    ]
  },
  construction: {
    name: 'Construction & Engineering',
    documents: [
      { id: 'epc-agreement', name: 'Engineering Procurement & Construction (EPC) Agreement', complexity: 'Complex', time: '60 min' },
      { id: 'design-build', name: 'Design-Build Contract', complexity: 'Complex', time: '55 min' },
      { id: 'construction-loan', name: 'Construction Loan Agreement', complexity: 'Complex', time: '50 min' },
      { id: 'lien-waiver', name: 'Construction Lien Waiver', complexity: 'Medium', time: '25 min' },
      { id: 'subcontractor', name: 'Subcontractor Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'performance-bond', name: 'Performance Bond', complexity: 'Medium', time: '30 min' },
      { id: 'architect', name: 'Architect Agreement', complexity: 'Complex', time: '40 min' }
    ]
  },
  'education-nonprofit': {
    name: 'Educational, Nonprofit & Government',
    documents: [
      { id: 'mou', name: 'Memorandum of Understanding (MOU)', complexity: 'Medium', time: '30 min' },
      { id: 'grant-agreement', name: 'Grant Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'ngo-partnership', name: 'NGO Partnership Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'ppp-contract', name: 'Public-Private Partnership (PPP) Contract', complexity: 'Complex', time: '60 min' },
      { id: 'academic-collaboration', name: 'Academic Collaboration Agreement', complexity: 'Medium', time: '35 min' },
      { id: 'donation', name: 'Donation Agreement', complexity: 'Medium', time: '25 min' }
    ]
  },
  'corp-structure': {
    name: 'Corporate Structure & Reorganization',
    documents: [
      { id: 'spin-off', name: 'Spin-Off Agreement', complexity: 'Complex', time: '60 min' },
      { id: 'reorganization', name: 'Corporate Reorganization Plan', complexity: 'Complex', time: '55 min' },
      { id: 'asset-transfer', name: 'Asset Transfer Agreement', complexity: 'Complex', time: '45 min' },
      { id: 'dissolution', name: 'Dissolution/Wind-Up Documents', complexity: 'Complex', time: '50 min' },
      { id: 'holding-subsidiary', name: 'Holding/Subsidiary Company Agreements', complexity: 'Complex', time: '50 min' },
      { id: 'rebranding', name: 'Internal Rebranding Documentation', complexity: 'Medium', time: '30 min' }
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
  // Contracts & Agreements
  'nda': ['Previous NDAs', 'Company confidentiality policies', 'Industry-specific trade secrets', 'Jurisdiction confidentiality laws'],
  'employment': ['Labor law codes', 'Company handbook', 'Benefits structure docs', 'Industry wage standards'],
  'contractor': ['Independent contractor regulations', 'Tax classification rules', 'Previous contractor agreements', 'Scope of work templates'],
  'consulting': ['Professional services regulations', 'Previous consulting agreements', 'Industry rate benchmarks', 'Deliverable specifications'],
  'internship': ['Labor law internship requirements', 'Educational institution policies', 'Previous internship agreements', 'Academic credit requirements'],
  'sales': ['UCC Article 2 provisions', 'Industry sales terms', 'Product specifications', 'Warranty standards'],
  'service': ['Service industry regulations', 'SLA benchmarks', 'Previous service agreements', 'Performance metrics'],
  'franchise': ['FTC Franchise Rule', 'State franchise laws', 'Franchise disclosure documents', 'Industry franchise standards'],
  'vendor': ['Procurement policies', 'Vendor qualification standards', 'Previous vendor agreements', 'Supply chain requirements'],
  'joint-venture': ['Partnership laws', 'Previous JV agreements', 'Industry collaboration models', 'Regulatory approval requirements'],
  'partnership': ['Partnership laws', 'Previous partnership agreements', 'Capital contribution structures', 'Exit strategy templates'],
  'shareholder': ['Corporate laws', 'Previous shareholder agreements', 'Voting structures', 'Transfer restrictions'],
  'operating': ['LLC operating laws', 'Previous operating agreements', 'Member rights structures', 'Management frameworks'],
  'loan': ['Banking regulations', 'Previous loan agreements', 'Collateral documentation', 'Interest rate benchmarks'],
  'guaranty': ['Guaranty laws', 'Previous guaranty agreements', 'Financial statements', 'Collateral requirements'],
  'lease': ['Commercial leasing laws', 'Previous lease agreements', 'Property regulations', 'Zoning requirements'],
  'licensing': ['IP licensing laws', 'Previous licensing agreements', 'Royalty structures', 'Territory restrictions'],
  'commission': ['Sales commission regulations', 'Previous commission agreements', 'Performance metrics', 'Payment structures'],
  'distribution': ['Distribution laws', 'Previous distribution agreements', 'Territory maps', 'Pricing structures'],
  'agency': ['Agency laws', 'Previous agency agreements', 'Authority limitations', 'Compensation structures'],

  // Corporate Governance
  'articles': ['State incorporation laws', 'Previous articles', 'Corporate name requirements', 'Share structure templates'],
  'bylaws': ['Corporate governance laws', 'Previous bylaws', 'Board structure requirements', 'Voting procedures'],
  'resolutions': ['Corporate resolutions law', 'Previous resolutions', 'Board authority limits', 'Approval requirements'],
  'minutes': ['Corporate record requirements', 'Previous meeting minutes', 'Attendance records', 'Voting records'],
  'stock-purchase': ['Securities laws', 'Previous stock agreements', 'Valuation reports', 'Transfer restrictions'],
  'equity-grant': ['Equity compensation laws', 'Previous grant agreements', 'Vesting schedules', 'Tax implications'],
  'cap-table': ['Securities laws', 'Previous cap tables', 'Share class structures', 'Dilution calculations'],
  'stock-option': ['Equity compensation laws', 'Previous option plans', 'Vesting schedules', 'Exercise provisions'],
  'founders': ['Partnership laws', 'Previous founder agreements', 'Equity splits', 'Vesting schedules'],
  'handbook': ['Employment laws', 'Previous handbooks', 'Industry best practices', 'Compliance requirements'],

  // Founding & Startup
  'pre-inc': ['Incorporation laws', 'Previous pre-inc agreements', 'Founder commitments', 'IP assignment requirements'],
  'founders-stock': ['Securities laws', 'Previous stock agreements', 'Vesting schedules', 'Restriction agreements'],
  'incorporation-filings': ['SEC filing requirements', 'Previous filings', 'Financial statements', 'Legal opinions'],
  'business-registration': ['State registration laws', 'Previous registrations', 'Business name requirements', 'Registered agent info'],
  'ein-application': ['IRS requirements', 'Previous applications', 'Business structure docs', 'Responsible party info'],

  // Finance & Fundraising
  'safe': ['Securities laws', 'Previous SAFE agreements', 'Valuation caps', 'Discount rates'],
  'convertible-note': ['Securities laws', 'Previous note agreements', 'Interest rates', 'Conversion terms'],
  'investment-subscription': ['Securities laws', 'Previous subscription agreements', 'Investor qualifications', 'Subscription amounts'],
  'capital-call': ['Partnership agreements', 'Previous capital calls', 'Commitment schedules', 'Default provisions'],
  'promissory-note': ['Note regulations', 'Previous promissory notes', 'Interest rate benchmarks', 'Payment schedules'],
  'debt-restructuring': ['Bankruptcy laws', 'Previous restructuring agreements', 'Creditor agreements', 'Financial statements'],
  'revenue-sharing': ['Revenue sharing regulations', 'Previous agreements', 'Revenue calculations', 'Payment structures'],

  // HR & Employment
  'severance': ['Employment laws', 'Previous severance agreements', 'Company severance policies', 'Benefits continuation'],
  'non-compete': ['Non-compete laws', 'Previous agreements', 'Geographic restrictions', 'Industry standards'],
  'non-solicitation': ['Non-solicitation laws', 'Previous agreements', 'Customer lists', 'Employee rosters'],
  'offer-letter': ['Employment laws', 'Previous offer letters', 'Compensation benchmarks', 'Benefits summaries'],
  'bonus-agreement': ['Bonus regulations', 'Previous bonus agreements', 'Performance metrics', 'Payment schedules'],
  'commission-structure': ['Commission regulations', 'Previous structures', 'Sales territories', 'Performance targets'],
  'remote-work': ['Remote work laws', 'Previous policies', 'Equipment requirements', 'Security protocols'],
  'termination-notice': ['Employment laws', 'Previous notices', 'Final pay requirements', 'Benefits termination'],
  'arbitration': ['Arbitration laws', 'Previous agreements', 'Arbitration rules', 'Venue requirements'],

  // Operations & Procurement
  'purchase-order': ['UCC provisions', 'Previous purchase orders', 'Vendor terms', 'Delivery requirements'],
  'inventory-supply': ['Supply chain laws', 'Previous supply agreements', 'Inventory requirements', 'Quality standards'],
  'equipment-lease': ['Leasing laws', 'Previous lease agreements', 'Equipment specifications', 'Maintenance requirements'],
  'logistics': ['Transportation laws', 'Previous logistics agreements', 'Shipping requirements', 'Insurance coverage'],
  'manufacturing': ['Manufacturing regulations', 'Previous agreements', 'Quality standards', 'Production specifications'],
  'packaging': ['Packaging regulations', 'Previous agreements', 'Material specifications', 'Labeling requirements'],
  'quality-control': ['Quality standards', 'Previous agreements', 'Testing procedures', 'Inspection protocols'],

  // Real Estate & Facilities
  'property-purchase': ['Real estate laws', 'Previous purchase agreements', 'Property surveys', 'Title reports'],
  'construction': ['Construction laws', 'Previous contracts', 'Building codes', 'Permit requirements'],
  'facility-maintenance': ['Maintenance regulations', 'Previous agreements', 'Service specifications', 'Performance standards'],
  'coworking-license': ['Commercial leasing laws', 'Previous licenses', 'Space requirements', 'Usage restrictions'],
  'sublease': ['Subletting laws', 'Original lease agreements', 'Landlord consents', 'Space specifications'],

  // IP & Media
  'work-for-hire': ['Copyright laws', 'Previous agreements', 'Work specifications', 'Payment terms'],
  'media-release': ['Privacy laws', 'Previous releases', 'Usage specifications', 'Compensation terms'],
  'trademark-assignment': ['Trademark laws', 'Previous assignments', 'Trademark registrations', 'Goodwill transfers'],
  'copyright-registration': ['Copyright laws', 'Previous registrations', 'Work samples', 'Authorship documentation'],
  'domain-transfer': ['Domain regulations', 'Previous transfers', 'Registration records', 'Transfer procedures'],
  'software-escrow': ['Escrow regulations', 'Previous agreements', 'Source code documentation', 'Release conditions'],

  // International Trade
  'foreign-entity': ['Foreign registration laws', 'Previous registrations', 'Local requirements', 'Agent appointments'],
  'cross-border-tax': ['Tax treaty provisions', 'Previous filings', 'Transfer pricing docs', 'Local tax laws'],
  'foreign-employment': ['Foreign labor laws', 'Previous contracts', 'Work permit requirements', 'Local benefits'],
  'intl-arbitration': ['Arbitration conventions', 'Previous clauses', 'Arbitration rules', 'Venue selections'],
  'intl-agency': ['Agency laws', 'Previous agreements', 'Territory definitions', 'Commission structures'],
  'transfer-pricing-doc': ['Transfer pricing regulations', 'Previous documentation', 'Pricing methodologies', 'Comparability studies'],

  // Government & Compliance
  'sec-filings': ['Securities regulations', 'Previous filings', 'Financial statements', 'Legal opinions'],
  'annual-return': ['Filing requirements', 'Previous returns', 'Financial statements', 'Corporate records'],
  'compliance-checklist': ['Regulatory requirements', 'Previous checklists', 'Audit reports', 'Compliance history'],
  'regulatory-license': ['Licensing regulations', 'Previous applications', 'Qualification requirements', 'Supporting documentation'],
  'environmental-cert': ['Environmental laws', 'Previous certifications', 'Compliance reports', 'Testing results'],
  'gdpr-consent': ['GDPR regulations', 'Previous consent forms', 'Data processing purposes', 'Rights notifications'],
  'risk-framework': ['Risk management standards', 'Previous frameworks', 'Risk assessments', 'Control procedures'],

  // Dispute & Litigation
  'cease-desist': ['IP laws', 'Previous letters', 'Infringement evidence', 'Legal precedents'],
  'settlement': ['Settlement laws', 'Previous agreements', 'Dispute documentation', 'Release terms'],
  'mediation': ['Mediation rules', 'Previous agreements', 'Mediator qualifications', 'Procedure specifications'],
  'demand-letter': ['Legal procedures', 'Previous letters', 'Claim documentation', 'Deadline requirements'],
  'complaint': ['Court rules', 'Previous complaints', 'Cause of action elements', 'Damage calculations'],
  'waiver-release': ['Liability laws', 'Previous waivers', 'Activity risks', 'Release scope'],

  // Corporate Strategy
  'holding-company': ['Corporate laws', 'Previous agreements', 'Subsidiary structures', 'Control mechanisms'],
  'succession-plan': ['Succession planning laws', 'Previous plans', 'Ownership transitions', 'Valuation methods'],
  'share-buyback': ['Securities laws', 'Previous buybacks', 'Valuation methods', 'Funding sources'],
  'reverse-vesting': ['Vesting regulations', 'Previous agreements', 'Trigger events', 'Repurchase terms'],
  'spin-off-strategy': ['Corporate laws', 'Previous spin-offs', 'Asset allocations', 'Tax implications'],
  'asset-protection': ['Trust laws', 'Previous trusts', 'Asset inventories', 'Protection strategies'],
  'change-control': ['Corporate laws', 'Previous agreements', 'Control definitions', 'Trigger events'],
  'share-issuance': ['Securities laws', 'Previous resolutions', 'Share authorizations', 'Pricing terms'],
  'internal-reorg': ['Corporate laws', 'Previous reorganizations', 'Entity structures', 'Tax implications'],

  // Banking & Securities
  'bank-loan': ['Banking regulations', 'Previous loans', 'Financial statements', 'Collateral documentation'],
  'credit-facility': ['Credit regulations', 'Previous facilities', 'Financial covenants', 'Security documents'],
  'intercreditor': ['Creditor laws', 'Previous agreements', 'Priority structures', 'Subordination terms'],
  'security-agreement': ['UCC provisions', 'Previous agreements', 'Collateral descriptions', 'Perfection requirements'],
  'collateral-assignment': ['Assignment laws', 'Previous assignments', 'Collateral documentation', 'Notice requirements'],
  'equity-line': ['Securities laws', 'Previous agreements', 'Pricing mechanisms', 'Commitment terms'],
  'subordination': ['Subordination laws', 'Previous agreements', 'Priority structures', 'Payment waterfalls'],
  'ppm': ['Securities laws', 'Previous PPMs', 'Financial projections', 'Risk disclosures'],
  'securities-purchase': ['Securities laws', 'Previous agreements', 'Purchase terms', 'Representation warranties'],
  'escrow-instructions': ['Escrow laws', 'Previous instructions', 'Deposit terms', 'Release conditions'],

  // Board & Executive
  'board-consent': ['Corporate laws', 'Previous consents', 'Unanimous requirements', 'Record keeping'],
  'exec-compensation': ['Compensation regulations', 'Previous agreements', 'Benchmarking data', 'Performance metrics'],
  'indemnification': ['Indemnification laws', 'Previous agreements', 'Coverage scope', 'Advancement terms'],
  'governance-charter': ['Governance standards', 'Previous charters', 'Best practices', 'Compliance requirements'],
  'do-insurance': ['Insurance regulations', 'Previous policies', 'Coverage analysis', 'Claims history'],
  'business-conduct': ['Ethics regulations', 'Previous codes', 'Industry standards', 'Training requirements'],
  'audit-charter': ['Audit standards', 'Previous charters', 'Independence requirements', 'Reporting procedures'],
  'conflict-disclosure': ['Conflict laws', 'Previous forms', 'Disclosure requirements', 'Review procedures'],

  // Risk & Insurance
  'risk-assessment': ['Risk management standards', 'Previous assessments', 'Industry benchmarks', 'Control frameworks'],
  'business-interruption': ['Insurance regulations', 'Previous policies', 'Coverage terms', 'Business continuity plans'],
  'product-liability': ['Product liability laws', 'Previous waivers', 'Product risks', 'Warning requirements'],
  'cybersecurity-policy': ['Cybersecurity regulations', 'Previous policies', 'Security frameworks', 'Incident response plans'],
  'disaster-recovery': ['Recovery standards', 'Previous plans', 'Business impact analysis', 'Recovery procedures'],
  'business-continuity': ['Continuity standards', 'Previous agreements', 'Critical functions', 'Recovery timelines'],
  'liability-limitation': ['Liability laws', 'Previous clauses', 'Damage caps', 'Exclusion terms'],
  'hold-harmless': ['Indemnity laws', 'Previous agreements', 'Scope definitions', 'Defense obligations'],

  // Industry Specific
  'hipaa-compliance': ['HIPAA regulations', 'Previous agreements', 'PHI definitions', 'Security requirements'],
  'pci-dss': ['PCI standards', 'Previous agreements', 'Security requirements', 'Compliance documentation'],
  'fintech-compliance': ['Financial regulations', 'Previous compliance docs', 'AML/KYC procedures', 'Risk assessments'],
  'export-compliance': ['Export regulations', 'Previous agreements', 'License requirements', 'Restricted party lists'],
  'clinical-trial': ['FDA regulations', 'Previous agreements', 'Protocol documentation', 'Safety reporting'],
  'fda-regulatory': ['FDA regulations', 'Previous filings', 'Clinical data', 'Manufacturing information'],
  'franchise-disclosure': ['Franchise regulations', 'Previous FDDs', 'Financial statements', 'Litigation history'],
  'aviation-lease': ['Aviation regulations', 'Previous leases', 'Aircraft documentation', 'Maintenance requirements'],
  'energy-supply': ['Energy regulations', 'Previous agreements', 'Supply specifications', 'Delivery terms'],
  'mineral-rights': ['Mining laws', 'Previous agreements', 'Property surveys', 'Environmental assessments'],

  // Client Facing
  'client-engagement': ['Professional standards', 'Previous letters', 'Scope definitions', 'Fee structures'],
  'retainer': ['Retainer regulations', 'Previous agreements', 'Service scope', 'Payment terms'],
  'refund-policy': ['Consumer protection laws', 'Previous policies', 'Refund conditions', 'Processing procedures'],
  'sla': ['Service standards', 'Previous SLAs', 'Performance metrics', 'Penalty structures'],
  'aup': ['Acceptable use standards', 'Previous policies', 'Prohibited activities', 'Enforcement procedures'],
  'data-consent': ['Privacy laws', 'Previous forms', 'Data purposes', 'Rights notifications'],
  'cookie-policy': ['Privacy regulations', 'Previous policies', 'Cookie types', 'Consent mechanisms'],
  'custom-client': ['Contract laws', 'Previous agreements', 'Client requirements', 'Customization scope'],

  // Tech & SaaS
  'beta-test': ['Software testing laws', 'Previous agreements', 'Testing scope', 'Feedback requirements'],
  'saas-subscription': ['Subscription laws', 'Previous agreements', 'Service levels', 'Usage terms'],
  'api-license': ['API licensing standards', 'Previous licenses', 'Usage limitations', 'Rate limits'],
  'white-label': ['Licensing laws', 'Previous agreements', 'Branding rights', 'Customization scope'],
  'software-reseller': ['Reseller laws', 'Previous agreements', 'Territory rights', 'Support obligations'],
  'cloud-services': ['Cloud regulations', 'Previous agreements', 'Data location', 'Security requirements'],
  'data-sharing': ['Data protection laws', 'Previous agreements', 'Sharing purposes', 'Security measures'],
  'bug-bounty': ['Bounty program standards', 'Previous terms', 'Scope definitions', 'Reward structures'],
  'ai-model-use': ['AI regulations', 'Previous agreements', 'Model limitations', 'Usage restrictions'],
  'prompt-engineering': ['IP laws', 'Previous agreements', 'Prompt ownership', 'Usage rights'],

  // Sustainability
  'esg-policy': ['ESG standards', 'Previous policies', 'Reporting frameworks', 'Performance metrics'],
  'carbon-offset': ['Carbon regulations', 'Previous agreements', 'Offset verification', 'Credit standards'],
  'green-lease': ['Green building standards', 'Previous leases', 'Sustainability metrics', 'Performance requirements'],
  'sustainability-reporting': ['Reporting standards', 'Previous reports', 'Data collection methods', 'Verification procedures'],
  'csr-charter': ['CSR standards', 'Previous charters', 'Community commitments', 'Impact measurements'],

  // Construction
  'epc-agreement': ['Construction laws', 'Previous EPC agreements', 'Project specifications', 'Performance guarantees'],
  'design-build': ['Design-build regulations', 'Previous contracts', 'Design specifications', 'Construction standards'],
  'construction-loan': ['Construction lending laws', 'Previous loans', 'Draw schedules', 'Completion guarantees'],
  'lien-waiver': ['Lien laws', 'Previous waivers', 'Payment confirmations', 'Waiver scope'],
  'subcontractor': ['Subcontracting laws', 'Previous agreements', 'Work scope', 'Payment terms'],
  'performance-bond': ['Bonding regulations', 'Previous bonds', 'Performance requirements', 'Surety qualifications'],
  'architect': ['Professional standards', 'Previous agreements', 'Design scope', 'Professional liability'],

  // Education & Nonprofit
  'mou': ['MOU standards', 'Previous MOUs', 'Cooperation scope', 'Resource commitments'],
  'grant-agreement': ['Grant regulations', 'Previous agreements', 'Funding terms', 'Reporting requirements'],
  'ngo-partnership': ['Partnership laws', 'Previous agreements', 'Mission alignment', 'Resource sharing'],
  'ppp-contract': ['PPP regulations', 'Previous contracts', 'Public benefits', 'Risk allocation'],
  'academic-collaboration': ['Academic standards', 'Previous agreements', 'Research scope', 'IP ownership'],
  'donation': ['Charitable laws', 'Previous agreements', 'Tax implications', 'Use restrictions'],

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