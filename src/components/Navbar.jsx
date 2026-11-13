import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  ['features', 'Features'],
  ['how', 'How it works'],
  ['pricing', 'Pricing'],
  ['contact', 'Contact'],
]

export function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2 font-display text-xl font-bold text-white">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-mint">
        <span className="h-2 w-3.5 -rotate-45 border-b-[3px] border-l-[3px] border-ink" />
      </span>
      JobTrail
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
          scrolled ? 'border border-white/10 bg-ink/70 shadow-2xl backdrop-blur-xl' : 'border border-transparent'
        }`}
      >
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative text-sm font-medium transition hover:text-white ${active === id ? 'text-white' : ''}`}
            >
              {label}
              {active === id && (
                <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 rounded-full bg-mint" />
              )}
            </a>
          ))}
          <a href="#contact" className="btn-primary !px-5 !py-2 text-sm">Get started</a>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <motion.div style={{ scaleX: progress }} className="absolute inset-x-6 -bottom-px h-px origin-left bg-mint" />
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-ink/95 p-4 backdrop-blur-xl md:hidden"
          >
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium text-white hover:bg-white/5">
                {label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">Get started</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
