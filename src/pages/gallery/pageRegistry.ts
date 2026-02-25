import type { ComponentType } from 'react'
import { getPageOverrides } from './pageStore'
import { getDynamicPages, type DynamicPageDef } from './dynamicPageStore'
import { createPlaceholderComponent } from '../../flows/PlaceholderScreen'

export interface PageProps {
  onNext: () => void
  onBack: () => void
}

export interface Page {
  id: string
  title: string
  description: string
  tags: string[]
  componentsUsed: string[]
  component: ComponentType<PageProps>
  isDynamic?: boolean
}

const pages = new Map<string, Page>()

export function registerPage(page: Page): void {
  pages.set(page.id, page)
}

export function unregisterPage(id: string): void {
  pages.delete(id)
}

/** Register a dynamic page from the dynamicPageStore data model. */
export function registerDynamicPage(def: DynamicPageDef): void {
  const page: Page = {
    id: def.id,
    title: def.title,
    description: def.description,
    tags: def.tags,
    componentsUsed: def.componentsUsed,
    component: createPlaceholderComponent(def.title, def.description),
    isDynamic: true,
  }
  pages.set(page.id, page)
}

/** Hydrate all dynamic pages from localStorage into the registry. */
export function hydrateDynamicPages(): void {
  const dynamicPages = getDynamicPages()
  for (const def of dynamicPages) {
    registerDynamicPage(def)
  }
}

/** Returns the page with localStorage overrides merged in. */
export function getPage(id: string): Page | undefined {
  const base = pages.get(id)
  if (!base) return undefined

  const overrides = getPageOverrides(id)
  return {
    ...base,
    title: overrides.title ?? base.title,
    description: overrides.description ?? base.description,
    tags: overrides.tags ?? base.tags,
  }
}

/** Returns base page without overrides (for reset comparisons). */
export function getBasePage(id: string): Page | undefined {
  return pages.get(id)
}

export function getAllPages(): Page[] {
  return Array.from(pages.keys()).map((id) => getPage(id)!)
}

export function getPagesByTag(): Record<string, Page[]> {
  const grouped: Record<string, Page[]> = {}
  for (const id of pages.keys()) {
    const page = getPage(id)!
    for (const tag of page.tags) {
      if (!grouped[tag]) grouped[tag] = []
      grouped[tag].push(page)
    }
  }
  return grouped
}
