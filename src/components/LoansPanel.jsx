import { useEffect, useState } from 'react'

export default function LoansPanel() {
  const [members, setMembers] = useState([])
  const [memberId, setMemberId] = useState('')
  const [principal, setPrincipal] = useState(0)
  const [rate, setRate] = useState(12)
  const [term, setTerm] = useState(12)
  const [loans, setLoans] = useState([])

  const loadMembers = () => fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members`).then(r=>r.json()).then(setMembers)
  const loadLoans = () => fetch(`${import.meta.env.VITE_BACKEND_URL}/api/loans`).then(r=>r.json()).then(setLoans)

  useEffect(() => { loadMembers(); loadLoans() }, [])

  const createLoan = async (e) => {
    e.preventDefault()
    if (!memberId) return
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/loans`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member_id: memberId, principal: parseFloat(principal), interest_rate: parseFloat(rate), term_months: parseInt(term) })
    })
    if (res.ok) {
      setPrincipal(0)
      loadLoans()
    }
  }

  const repay = async (loanId) => {
    const amount = prompt('Repayment amount:')
    if (!amount) return
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/loans/${loanId}/repay`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loan_id: loanId, member_id: memberId || loans.find(l=>l.id===loanId)?.member_id, amount: parseFloat(amount) })
    })
    if (res.ok) loadLoans()
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Loans</h3>
      <form onSubmit={createLoan} className="flex flex-wrap gap-3 items-end mb-4">
        <div>
          <label className="block text-blue-200 text-sm mb-1">Member</label>
          <select value={memberId} onChange={e=>setMemberId(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700">
            <option value="">Select member</option>
            {members.map(m => <option value={m.id} key={m.id}>{m.full_name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Principal</label>
          <input type="number" min="0" step="0.01" value={principal} onChange={e=>setPrincipal(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700 w-32" />
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Interest %</label>
          <input type="number" min="0" step="0.01" value={rate} onChange={e=>setRate(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700 w-28" />
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Term (months)</label>
          <input type="number" min="1" step="1" value={term} onChange={e=>setTerm(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700 w-28" />
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Create</button>
      </form>

      <div className="space-y-2">
        {loans.map(l => (
          <div key={l.id} className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2">
            <div className="text-sm">
              <p className="text-white font-medium">Loan • {l.member_id}</p>
              <p className="text-blue-300/80">Bal: {l.balance.toFixed(2)} • Status: {l.status}</p>
            </div>
            <button onClick={() => repay(l.id)} className="px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-500 text-white rounded">Repay</button>
          </div>
        ))}
        {loans.length === 0 && <p className="text-blue-200">No loans yet.</p>}
      </div>
    </div>
  )
}
