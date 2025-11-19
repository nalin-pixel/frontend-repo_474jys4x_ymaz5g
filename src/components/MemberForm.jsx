import { useState } from 'react'

export default function MemberForm({ onCreated }) {
  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, email })
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed')
      const data = await res.json()
      onCreated?.(data.id)
      setFullName(''); setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-end">
      <div className="flex-1">
        <label className="block text-blue-200 text-sm mb-1">Full name</label>
        <input value={full_name} onChange={e=>setFullName(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none" required />
      </div>
      <div className="flex-1">
        <label className="block text-blue-200 text-sm mb-1">Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700 focus:outline-none" required />
      </div>
      <button disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50">
        {loading ? 'Adding...' : 'Add Member'}
      </button>
      {error && <div className="text-red-400 text-sm ml-2">{error}</div>}
    </form>
  )
}
