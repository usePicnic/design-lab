import { getComponentsByCategory, type ComponentMeta } from '../../library/registry'

interface ComponentSidebarProps {
  selected: string | null
  onSelect: (name: string) => void
}

const categories: { key: ComponentMeta['category']; label: string }[] = [
  { key: 'foundations', label: 'Foundations' },
  { key: 'inputs', label: 'Inputs' },
  { key: 'display', label: 'Display' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'navigation', label: 'Navigation' },
  { key: 'layout', label: 'Layout' },
]

export default function ComponentSidebar({ selected, onSelect }: ComponentSidebarProps) {
  return (
    <aside className="w-[240px] h-full shrink-0 overflow-y-auto border-r border-shell-border bg-shell-surface">
      <div className="p-[var(--token-spacing-md)]">
        <h2 className="text-[length:var(--token-font-size-caption)] leading-[var(--token-line-height-caption)] font-semibold text-shell-text-tertiary uppercase tracking-wider mb-[var(--token-spacing-3)]">
          Components
        </h2>
      </div>
      {categories.map(({ key, label }) => {
        const components = getComponentsByCategory(key)
        if (components.length === 0) return null
        return (
          <div key={key} className="mb-[var(--token-spacing-2)]">
            <p className="px-[var(--token-spacing-md)] py-[var(--token-spacing-1)] text-[length:var(--token-font-size-caption)] font-medium text-shell-text-tertiary uppercase tracking-wider">
              {label}
            </p>
            {components.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => onSelect(c.name)}
                className={`
                  w-full text-left px-[var(--token-spacing-md)] py-[var(--token-spacing-2)]
                  text-[length:var(--token-font-size-body-sm)] leading-[var(--token-line-height-body-sm)]
                  transition-colors duration-[var(--token-transition-fast)] cursor-pointer
                  ${
                    selected === c.name
                      ? 'bg-shell-selected text-shell-selected-text font-medium'
                      : 'text-shell-text hover:bg-shell-hover'
                  }
                `}
              >
                {c.name}
              </button>
            ))}
          </div>
        )
      })}
    </aside>
  )
}
