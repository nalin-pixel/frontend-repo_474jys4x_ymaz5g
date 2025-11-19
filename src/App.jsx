import Hero from './components/Hero'
import MemberForm from './components/MemberForm'
import MemberList from './components/MemberList'
import SavingsPanel from './components/SavingsPanel'
import LoansPanel from './components/LoansPanel'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

      <div className="relative min-h-screen p-6 max-w-6xl mx-auto">
        <Hero />

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <MemberForm onCreated={() => {}} />
            <MemberList />
          </div>
          <div className="space-y-4">
            <SavingsPanel />
            <LoansPanel />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-blue-300/60">Use the panels to add members, manage savings, and issue/repay loans.</p>
        </div>
      </div>
    </div>
  )
}

export default App
