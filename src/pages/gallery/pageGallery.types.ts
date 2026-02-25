import type { Node } from '@xyflow/react'

export interface PageCardData {
  pageId: string
  title: string
  description: string
  tags: string[]
  componentsUsed: string[]
  selected: boolean
}

export type PageCardNode = Node<PageCardData, 'pageCard'>
