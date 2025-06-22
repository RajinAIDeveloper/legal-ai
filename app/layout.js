// app/layout.js
import './globals.css'

export const metadata = {
  title: 'LegalAI Platform',
  description: 'AI-powered legal document automation and analysis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}