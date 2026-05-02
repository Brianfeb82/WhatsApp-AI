import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function Home() {
  const { userId } = auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          WhatsApp AI Assistant
        </h1>
        <p className="text-xl text-slate-400 text-center max-w-2xl">
          Automate your customer service with AI. Integrated with Groq for blazing fast responses.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/dashboard" 
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold transition-all shadow-lg shadow-emerald-500/20"
          >
            Get Started
          </Link>
          <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-full font-bold transition-all border border-slate-700">
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-3 gap-8 w-full max-w-6xl">
        {[
          { title: "AI Powered", desc: "Using Llama 3 on Groq for instant replies." },
          { title: "Dashboard", desc: "Full conversation history and analytics." },
          { title: "Easy Setup", desc: "Scan a QR code and you're ready to go." }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all">
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
