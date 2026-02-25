/**
 * Page data persistence — Supabase with localStorage fallback.
 *
 * Write path: Supabase (if connected) + localStorage (always, as cache/fallback).
 * Read path: localStorage first (instant), then Supabase hydrate overwrites.
 */

import { supabase, isSupabaseConnected } from '../../lib/supabase'

const STORAGE_KEY = 'picnic-design-lab:page-overrides'

export interface PageOverrides {
  title?: string
  description?: string
  tags?: string[]
}

type AllOverrides = Record<string, PageOverrides>

// ── localStorage layer (always available) ──

function readAll(): AllOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAll(data: AllOverrides): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ── Public API ──

export function getPageOverrides(pageId: string): PageOverrides {
  return readAll()[pageId] ?? {}
}

export async function setPageTitle(pageId: string, title: string): Promise<void> {
  const all = readAll()
  if (!all[pageId]) all[pageId] = {}
  all[pageId].title = title
  writeAll(all)

  if (isSupabaseConnected()) {
    await supabase!.from('page_overrides').upsert(
      { page_id: pageId, title, updated_at: new Date().toISOString() },
      { onConflict: 'page_id' },
    )
  }
}

export async function setPageDescription(pageId: string, description: string): Promise<void> {
  const all = readAll()
  if (!all[pageId]) all[pageId] = {}
  all[pageId].description = description
  writeAll(all)

  if (isSupabaseConnected()) {
    await supabase!.from('page_overrides').upsert(
      { page_id: pageId, description, updated_at: new Date().toISOString() },
      { onConflict: 'page_id' },
    )
  }
}

export async function setPageTags(pageId: string, tags: string[]): Promise<void> {
  const all = readAll()
  if (!all[pageId]) all[pageId] = {}
  all[pageId].tags = tags
  writeAll(all)

  if (isSupabaseConnected()) {
    await supabase!.from('page_overrides').upsert(
      { page_id: pageId, tags, updated_at: new Date().toISOString() },
      { onConflict: 'page_id' },
    )
  }
}

export async function resetPageOverrides(pageId: string): Promise<void> {
  const all = readAll()
  delete all[pageId]
  writeAll(all)

  if (isSupabaseConnected()) {
    await supabase!.from('page_overrides').delete().eq('page_id', pageId)
  }
}

// ── Supabase → localStorage hydration ──

export async function hydratePageOverridesFromSupabase(): Promise<boolean> {
  if (!isSupabaseConnected()) return false

  try {
    const res = await supabase!.from('page_overrides').select('*')
    if (res.error) return false

    const all: AllOverrides = {}
    for (const row of res.data ?? []) {
      const id = row.page_id as string
      if (!all[id]) all[id] = {}
      if (row.title) all[id].title = row.title
      if (row.description) all[id].description = row.description
      if (row.tags) all[id].tags = row.tags
    }

    writeAll(all)
    return true
  } catch {
    return false
  }
}

// ── Real-time subscription ──

export function subscribeToPageChanges(onUpdate: () => void): (() => void) | null {
  if (!isSupabaseConnected()) return null

  const channel = supabase!
    .channel('page-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'page_overrides' }, () => {
      hydratePageOverridesFromSupabase().then(() => onUpdate())
    })
    .subscribe()

  return () => {
    supabase!.removeChannel(channel)
  }
}
