/**
 * Auto-layout: arranges pages in a grid for the gallery canvas.
 * 4-column grid, 280px card width, 40px gap.
 */

import type { Page } from './pageRegistry'
import type { PageCardNode } from './pageGallery.types'

const CARD_WIDTH = 280
const CARD_HEIGHT = 180
const GAP = 40
const COLS = 4
const PADDING = 60

export function autoLayoutPages(pages: Page[], selectedPageId: string | null): PageCardNode[] {
  return pages.map((page, i) => {
    const col = i % COLS
    const row = Math.floor(i / COLS)

    return {
      id: page.id,
      type: 'pageCard',
      position: {
        x: PADDING + col * (CARD_WIDTH + GAP),
        y: PADDING + row * (CARD_HEIGHT + GAP),
      },
      data: {
        pageId: page.id,
        title: page.title,
        description: page.description,
        tags: page.tags,
        componentsUsed: page.componentsUsed,
        selected: page.id === selectedPageId,
      },
    }
  })
}
