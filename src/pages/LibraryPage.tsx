import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link, useLocation } from 'react-router-dom'

/* Force side-effect registration of all components */
import '../library/foundations'
import '../library/inputs'
import '../library/display'
import '../library/feedback'
import '../library/navigation'
import '../library/layout'

import ComponentSidebar from './library/ComponentSidebar'
import ComponentDetail from './library/ComponentDetail'
import TokenEditor from './library/TokenEditor'
import { getAllComponents } from '../library/registry'
import { isSupabaseConnected } from '../lib/supabase'

export default function LibraryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  /* Pick first component as default on mount */
  useEffect(() => {
    if (!selected) {
      const all = getAllComponents()
      if (all.length > 0) {
        setSelected(all[0].name)
      }
    }
  }, [selected])

  const handleSelect = (name: string) => {
    setSelected(name)
  }

  const isLibrary = location.pathname.startsWith('/library')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex flex-col bg-shell-bg"
    >
      {/* Top bar */}
      <header className="h-[48px] flex items-center justify-between px-[var(--token-spacing-md)] border-b border-shell-border bg-shell-surface shrink-0">
        <div className="flex items-center gap-[var(--token-spacing-2)]">
          <h1 className="text-[length:var(--token-font-size-heading-sm)] font-semibold text-shell-text">
            Picnic Design Lab
          </h1>
          <span
            title={isSupabaseConnected() ? 'Connected to Supabase' : 'Local only (localStorage)'}
            className="flex items-center gap-[4px] text-[length:var(--token-font-size-caption)] text-shell-text-tertiary"
          >
            <span className={`inline-block w-[8px] h-[8px] rounded-[var(--token-radius-full)] ${isSupabaseConnected() ? 'bg-[#16A34A]' : 'bg-shell-active'}`} />
            {isSupabaseConnected() ? 'Synced' : 'Local'}
          </span>
        </div>
        <nav className="flex gap-[var(--token-spacing-1)]">
          <Link
            to="/library"
            className={`px-[var(--token-spacing-3)] py-[var(--token-spacing-1)] rounded-[var(--token-radius-sm)] text-[length:var(--token-font-size-body-sm)] font-medium transition-colors no-underline ${
              isLibrary
                ? 'bg-shell-selected text-shell-selected-text'
                : 'text-shell-text-secondary hover:bg-shell-hover'
            }`}
          >
            Library
          </Link>
          <Link
            to="/simulator"
            className={`px-[var(--token-spacing-3)] py-[var(--token-spacing-1)] rounded-[var(--token-radius-sm)] text-[length:var(--token-font-size-body-sm)] font-medium transition-colors no-underline ${
              !isLibrary
                ? 'bg-shell-selected text-shell-selected-text'
                : 'text-shell-text-secondary hover:bg-shell-hover'
            }`}
            onClick={(e) => {
              e.preventDefault()
              navigate('/simulator')
            }}
          >
            Simulator
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <ComponentSidebar selected={selected} onSelect={handleSelect} />
        {selected ? (
          <ComponentDetail componentName={selected} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-shell-text-tertiary">
            Select a component
          </div>
        )}
        <TokenEditor />
      </div>
    </motion.div>
  )
}
