/**
 * Reverse index: given a page ID, find all flows that reference it.
 */

import { getAllFlows, type Flow } from '../simulator/flowRegistry'

export function getFlowsUsingPage(pageId: string): Flow[] {
  return getAllFlows().filter((flow) =>
    flow.screens.some((s) => s.pageId === pageId),
  )
}
