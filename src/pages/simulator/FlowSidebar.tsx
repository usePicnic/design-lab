import { getFlowsByArea, type Flow } from './flowRegistry'

interface FlowSidebarProps {
  selectedFlowId: string | null
  onSelect: (flowId: string) => void
}

export default function FlowSidebar({ selectedFlowId, onSelect }: FlowSidebarProps) {
  const grouped = getFlowsByArea()
  const areas = Object.keys(grouped)

  return (
    <aside className="w-[240px] h-full shrink-0 overflow-y-auto border-r border-shell-border bg-shell-surface">
      <div className="p-[var(--token-spacing-md)]">
        <h2 className="text-[length:var(--token-font-size-caption)] leading-[var(--token-line-height-caption)] font-semibold text-shell-text-tertiary uppercase tracking-wider mb-[var(--token-spacing-3)]">
          Flows
        </h2>
      </div>

      {areas.length === 0 && (
        <p className="px-[var(--token-spacing-md)] text-[length:var(--token-font-size-body-sm)] text-shell-text-tertiary">
          No flows registered yet
        </p>
      )}

      {areas.map((area) => (
        <div key={area} className="mb-[var(--token-spacing-2)]">
          <p className="px-[var(--token-spacing-md)] py-[var(--token-spacing-1)] text-[length:var(--token-font-size-caption)] font-medium text-shell-text-tertiary uppercase tracking-wider">
            {area}
          </p>
          {grouped[area].map((flow: Flow) => (
            <button
              key={flow.id}
              type="button"
              onClick={() => onSelect(flow.id)}
              className={`
                w-full text-left px-[var(--token-spacing-md)] py-[var(--token-spacing-2)]
                text-[length:var(--token-font-size-body-sm)] leading-[var(--token-line-height-body-sm)]
                transition-colors duration-[var(--token-transition-fast)] cursor-pointer
                ${
                  selectedFlowId === flow.id
                    ? 'bg-shell-selected text-shell-selected-text font-medium'
                    : 'text-shell-text hover:bg-shell-hover'
                }
              `}
            >
              {flow.name}
              <span className="block text-[length:var(--token-font-size-caption)] text-shell-text-tertiary">
                {flow.screens.length} screens
              </span>
            </button>
          ))}
        </div>
      ))}
    </aside>
  )
}
