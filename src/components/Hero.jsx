import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const stages = ['Wishlist', 'Applied', 'Interview', 'Offer']
const initial = [
  { id: 1, c: 'Northwind Labs', r: 'Junior Frontend Dev', s: 0 },
  { id: 2, c: 'Pixelcraft', r: 'React Intern', s: 1 },
  { id: 3, c: 'Cloudly', r: 'UI Developer', s: 1 },
  { id: 4, c: 'Brightpath', r: 'Frontend Trainee', s: 2 },
  { id: 5, c: 'Orbit Studio', r: 'Web Developer', s: 0 },
]

function Board() {
  const [jobs, setJobs] = useState(initial)
  const [paused, setPaused] = useState(false)

  const move = (id) => setJobs((j) => j.map((x) => (x.id === id ? { ...x, s: Math.min(x.s + 1, 3) } : x)))

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => {
      setJobs((j) => {
        const open = j.filter((x) => x.s < 3)
        if (!open.length) return initial
        const pick = open[Math.floor(Math.random() * open.length)]
        return j.map((x) => (x.id === pick.id ? { ...x, s: x.s + 1 } : x))
      })
    }, 2600)
    return () => clearInterval(t)
  }, [paused])

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="rounded-3xl border border-white/10 bg-panel/80 p-3 shadow-[0_30px_80px_-20px_rgba(124,245,192,.25)] backdrop-blur"
    >
      <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-xs text-slate-500">My job search</span>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[720px] grid-cols-4 gap-3">
          {stages.map((name, i) => {
            const items = jobs.filter((j) => j.s === i)
            return (
              <div key={name} className="min-h-[250px] rounded-2xl bg-black/30 p-3">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold text-white">
                  {name}
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-slate-400">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((j) => (
                    <motion.div
                      key={j.id}
                      layout
                      layoutId={`job-${j.id}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className={`rounded-xl border p-3 text-sm ${i === 3 ? 'border-mint/40 bg-mint/10' : 'border-white/10 bg-white/5'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-white">{j.r}</p>
                          <p className="text-xs text-slate-400">{j.c}</p>
                        </div>
                        {i === 3 && <Check size={16} className="mt-0.5 text-mint" />}
                      </div>
                      {i < 3 && (
                        <button
                          onClick={() => move(j.id)}
                          aria-label={`Move ${j.r} at ${j.c} to ${stages[i + 1]}`}
                          className="mt-2 rounded-lg border border-white/10 px-2.5 py-1 text-xs font-semibold text-white transition hover:border-mint hover:bg-mint hover:text-ink"
                        >
                          Move on
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const words = 'Land your next job without losing track.'.split(' ')

  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden
        className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-mint/20 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-violet/25 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.35fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-mint" /> Free for your first 15 applications
          </motion.p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
            {words.map((w, i) => (
              <span key={i} className="mr-[.25em] inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className={`inline-block ${i >= 5 ? 'text-gradient' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 max-w-md text-lg text-slate-400"
          >
            Keep every application on one board, get reminded when to follow up, and see where each opportunity stands.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-primary">Get started free <ArrowRight size={18} /></a>
            <a href="#how" className="btn-ghost">See how it works</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.9 }}>
          <Board />
          <p className="mt-4 text-center text-sm text-slate-500">Live demo: press “Move on” or watch it play. Hover to pause.</p>
        </motion.div>
      </div>
    </section>
  )
}
