// constants.js
import { Scale, FileText, Upload, MessageSquare, Shield, Home, Users, Zap } from 'lucide-react'

export const STATS = [
  { title: 'Active Cases', value: '12', icon: Scale, color: 'blue' },
  { title: 'Contracts Drafted', value: '48', icon: FileText, color: 'green' },
  { title: 'Documents Analyzed', value: '156', icon: Upload, color: 'purple' },
  { title: 'AI Consultations', value: '324', icon: MessageSquare, color: 'orange' }
]

export const CONTRACT_TYPES = [
  { id: 'nda', name: 'Non-Disclosure Agreement', icon: Shield, color: 'bg-blue-500' },
  { id: 'lease', name: 'Lease Agreement', icon: Home, color: 'bg-green-500' },
  { id: 'employment', name: 'Employment Contract', icon: Users, color: 'bg-purple-500' },
  { id: 'jv', name: 'Joint Venture', icon: Zap, color: 'bg-orange-500' }
]

export const MOCK_CASES = [
  { id: 1, title: 'Contract Dispute - ABC Corp', status: 'active', priority: 'high', lastUpdate: '2 hours ago' },
  { id: 2, title: 'IP Infringement Case', status: 'pending', priority: 'medium', lastUpdate: '1 day ago' },
  { id: 3, title: 'Employment Law Matter', status: 'completed', priority: 'low', lastUpdate: '3 days ago' }
]