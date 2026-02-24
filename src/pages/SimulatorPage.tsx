import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'

/* Force flow registrations */
import '../flows/deposit'

import FlowSidebar from './simulator/FlowSidebar'
import FlowPlayer from './simulator/FlowPlayer'
import { getAllFlows } from './simulator/flowRegistry'
import { hydrateFromSupabase, subscribeToChanges } from './simulator/flowStore'
import { isSupabaseConnected } from '../lib/supabase'

export default function SimulatorPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedFlowId, setSelectedFlowId] = useState<string | null>(null)
  const [, setVersion] = useState(0)
  const isSimulator = location.pathname.startsWith('/simulator')

  useEffect(() => {
    if (!selectedFlowId) {
      const all = getAllFlows()
      if (all.length > 0) setSelectedFlowId(all[0].id)
    }
  }, [selectedFlowId])

  // Hydrate from Supabase + subscribe to real-time changes
  useEffect(() => {
    hydrateFromSupabase().then((ok) => {
      if (ok) setVersion((v) => v + 1)
    })
    const unsub = subscribeToChanges(() => setVersion((v) => v + 1))
    return () => { unsub?.() }
  }, [])

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
              !isSimulator
                ? 'bg-shell-selected text-shell-selected-text'
                : 'text-shell-text-secondary hover:bg-shell-hover'
            }`}
            onClick={(e) => {
              e.preventDefault()
              navigate('/library')
            }}
          >
            Library
          </Link>
          <Link
            to="/simulator"
            className={`px-[var(--token-spacing-3)] py-[var(--token-spacing-1)] rounded-[var(--token-radius-sm)] text-[length:var(--token-font-size-body-sm)] font-medium transition-colors no-underline ${
              isSimulator
                ? 'bg-shell-selected text-shell-selected-text'
                : 'text-shell-text-secondary hover:bg-shell-hover'
            }`}
          >
            Simulator
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <FlowSidebar selectedFlowId={selectedFlowId} onSelect={setSelectedFlowId} />
        {selectedFlowId ? (
          <FlowPlayer flowId={selectedFlowId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-shell-text-tertiary">
            Select a flow from the sidebar
          </div>
        )}
      </div>
    </motion.div>
  )
}
