import { useState, useEffect } from 'react'

export default function Hero() {
  const [backend, setBackend] = useState('')
  const [db, setDb] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/test`).then(r => r.json()).then(d => {
      setBackend(d.backend || 'Running')
      setDb(d.database || 'DB')
    }).catch(() => {})
  }, [])

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">SaaS SACCO</h1>
      <p className="text-blue-200 mb-2">Manage members, savings, and loans in one simple dashboard.</p>
      <p className="text-xs text-blue-300/70">Backend: {backend} • Database: {db}</p>
    </div>
  )
}
