import { useEffect, useState } from 'react'

export default function MemberList() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members`)
      const data = await res.json()
      setMembers(data)
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Members</h3>
        <button onClick={load} className="text-blue-300 text-sm hover:text-white">Refresh</button>
      </div>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {members.map(m => (
            <li key={m.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2">
              <div>
                <p className="text-white text-sm font-medium">{m.full_name}</p>
                <p className="text-blue-300/80 text-xs">{m.email}</p>
              </div>
            </li>
          ))}
          {members.length === 0 && <p className="text-blue-200">No members yet.</p>}
        </ul>
      )}
    </div>
  )
}
