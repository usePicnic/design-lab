import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { FileText, Layers } from 'lucide-react'
import type { PageCardData } from '../pageGallery.types'

function PageCardNode({ data, selected }: NodeProps) {
  const nodeData = data as PageCardData

  return (
    <div
      className={`
        w-[280px] rounded-[var(--token-radius-md)] border-2 overflow-hidden
        transition-colors duration-[var(--token-transition-fast)]
        ${selected
          ? 'border-shell-selected-text shadow-[0_0_0_2px_rgba(74,222,128,0.3)]'
          : 'border-shell-border'
        }
        bg-shell-surface
      `}
    >
      {/* Header bar */}
      <div className="flex items-center gap-[var(--token-spacing-2)] px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] bg-shell-hover">
        <FileText size={14} className="text-shell-selected-text shrink-0" />
        <span className="text-[length:var(--token-font-size-body-sm)] font-medium text-shell-text truncate flex-1">
          {nodeData.title}
        </span>
      </div>

      {/* Description */}
      {nodeData.description && (
        <div className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)]">
          <p className="text-[length:var(--token-font-size-caption)] text-shell-text-tertiary line-clamp-3">
            {nodeData.description}
          </p>
        </div>
      )}

      {/* Tags */}
      {nodeData.tags.length > 0 && (
        <div className="px-[var(--token-spacing-3)] pb-[var(--token-spacing-2)] flex flex-wrap gap-[4px]">
          {nodeData.tags.map((tag) => (
            <span
              key={tag}
              className="px-[6px] py-[1px] rounded-[var(--token-radius-sm)] text-[length:10px] font-medium bg-shell-hover text-shell-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-[var(--token-spacing-1)] px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] border-t border-shell-border">
        <Layers size={12} className="text-shell-text-tertiary" />
        <span className="text-[length:var(--token-font-size-caption)] text-shell-text-tertiary">
          {nodeData.componentsUsed.length} component{nodeData.componentsUsed.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}

export default memo(PageCardNode)
