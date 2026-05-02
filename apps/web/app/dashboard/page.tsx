import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-50">
        <h1 className="text-xl font-bold text-slate-900">WA Automation Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Overview</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening with your bot.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Conversations" value="0" change="+0%" />
          <StatCard title="AI Messages Sent" value="0" change="+0%" />
          <StatCard title="Handoff Rate" value="0%" change="+0%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Recent Conversations</h3>
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <p>No conversations yet.</p>
              <p className="text-sm">Connect your WhatsApp to get started.</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4">AI Connection Status</h3>
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-700">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="font-medium">System operational</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
          {change}
        </span>
      </div>
    </div>
  )
}
