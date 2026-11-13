import { Logo } from './Navbar'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-8 px-6">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-slate-500">Track every application. Miss no follow-up.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm">
          {[['features', 'Features'], ['how', 'How it works'], ['pricing', 'Pricing'], ['contact', 'Contact']].map(([id, l]) => (
            <a key={id} href={`#${id}`} className="hover:text-white">{l}</a>
          ))}
        </nav>
        <p className="w-full text-sm text-slate-600">© 2026 JobTrail. Demo project.</p>
      </div>
    </footer>
  )
}
