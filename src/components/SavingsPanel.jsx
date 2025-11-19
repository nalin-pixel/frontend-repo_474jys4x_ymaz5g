import { useEffect, useState } from 'react'

export default function SavingsPanel() {
  const [memberId, setMemberId] = useState('')
  const [members, setMembers] = useState([])
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('deposit')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members`).then(r=>r.json()).then(setMembers)
  }, [])

  const loadBalance = async (id) => {
    if (!id) return
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/savings/balance/${id}`)
    const data = await res.json()
    setBalance(data.balance || 0)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!memberId) return
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/savings`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ member_id: memberId, type, amount: parseFloat(amount) })
    })
    if (res.ok) {
      setAmount(0)
      await loadBalance(memberId)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Savings</h3>
      <form onSubmit={submit} className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-blue-200 text-sm mb-1">Member</label>
          <select value={memberId} onChange={e=>{setMemberId(e.target.value); loadBalance(e.target.value)}} className="px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700">
            <option value="">Select member</option>
            {members.map(m => <option value={m.id} key={m.id}>{m.full_name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Type</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700">
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Amount</label>
          <input type="number" min="0" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-900/60 text-white border border-slate-700 w-36" />
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">Submit</button>
        <div className="ml-auto text-right">
          <p className="text-blue-300/80 text-xs">Balance</p>
          <p className="text-white text-lg font-semibold">{balance.toFixed(2)}</p>
        </div>
      </form>
    </div>
  )
}
