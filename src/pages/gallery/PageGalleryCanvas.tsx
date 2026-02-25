import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Background,
  MiniMap,
  BackgroundVariant,
  type OnNodeClick,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import PageCardNode from './nodes/PageCardNode'
import { autoLayoutPages } from './pageAutoLayout'
import type { Page } from './pageRegistry'

const nodeTypes = { pageCard: PageCardNode }

interface PageGalleryCanvasProps {
  pages: Page[]
  selectedPageId: string | null
  onSelectPage: (pageId: string | null) => void
}

export default function PageGalleryCanvas({
  pages,
  selectedPageId,
  onSelectPage,
}: PageGalleryCanvasProps) {
  const nodes = useMemo(
    () => autoLayoutPages(pages, selectedPageId),
    [pages, selectedPageId],
  )

  const handleNodeClick: OnNodeClick = useCallback(
    (_event, node) => {
      onSelectPage(node.id)
    },
    [onSelectPage],
  )

  const handlePaneClick = useCallback(() => {
    onSelectPage(null)
  }, [onSelectPage])

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodesDraggable={false}
        nodesConnectable={false}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="var(--color-shell-border)"
        />
        <MiniMap
          nodeColor="var(--color-shell-hover)"
          maskColor="rgba(0,0,0,0.6)"
          className="!bg-shell-surface !border-shell-border"
        />
      </ReactFlow>
    </div>
  )
}
