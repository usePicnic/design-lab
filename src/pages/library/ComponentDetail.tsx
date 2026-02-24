import { useState, useMemo } from 'react'
import { getComponent } from '../../library/registry'
import ComponentPreview from './ComponentPreview'

interface ComponentDetailProps {
  componentName: string
}

export default function ComponentDetail({ componentName }: ComponentDetailProps) {
  const meta = getComponent(componentName)
  const [phoneView, setPhoneView] = useState(false)

  const codeSnippet = useMemo(() => {
    if (!meta) return ''
    const requiredProps = meta.props.filter((p) => p.required)
    const propsStr = requiredProps.map((p) => `${p.name}={...}`).join(' ')
    return `<${meta.name}${propsStr ? ` ${propsStr}` : ''} />`
  }, [meta])

  if (!meta) {
    return (
      <div className="flex-1 flex items-center justify-center text-text-tertiary">
        Select a component from the sidebar
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-[var(--token-spacing-lg)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-[var(--token-spacing-lg)]">
          <div>
            <h1 className="text-[length:var(--token-font-size-heading-lg)] leading-[var(--token-line-height-heading-lg)] font-semibold text-text-primary">
              {meta.name}
            </h1>
            <p className="text-[length:var(--token-font-size-body-md)] text-text-secondary mt-[var(--token-spacing-1)]">
              {meta.description}
            </p>
            <span className="inline-block mt-[var(--token-spacing-2)] px-[var(--token-spacing-2)] py-[1px] bg-surface-secondary rounded-[var(--token-radius-full)] text-[length:var(--token-font-size-caption)] text-text-tertiary">
              {meta.category}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPhoneView(!phoneView)}
            className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-body-sm)] border border-border-default rounded-[var(--token-radius-sm)] hover:bg-surface-secondary transition-colors cursor-pointer text-text-primary"
          >
            {phoneView ? '↔ Expanded' : '📱 Phone (393px)'}
          </button>
        </div>

        {/* Preview */}
        <div
          className={`
            bg-surface-secondary rounded-[var(--token-radius-lg)] p-[var(--token-spacing-lg)] mb-[var(--token-spacing-lg)]
            ${phoneView ? 'max-w-[393px] mx-auto' : ''}
          `}
        >
          <ComponentPreview meta={meta} />
        </div>

        {/* Code Snippet */}
        <div className="mb-[var(--token-spacing-lg)]">
          <h2 className="text-[length:var(--token-font-size-heading-sm)] font-medium text-text-primary mb-[var(--token-spacing-3)]">
            Usage
          </h2>
          <div className="relative bg-neutral-900 rounded-[var(--token-radius-md)] p-[var(--token-spacing-md)]">
            <code className="text-[length:var(--token-font-size-body-sm)] text-[#E5E7EB] font-mono whitespace-pre-wrap break-all">
              {codeSnippet}
            </code>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(codeSnippet)}
              className="absolute top-[var(--token-spacing-2)] right-[var(--token-spacing-2)] px-[var(--token-spacing-2)] py-[var(--token-spacing-1)] text-[length:var(--token-font-size-caption)] text-neutral-400 hover:text-neutral-200 bg-neutral-800 rounded-[var(--token-radius-sm)] cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Props Table */}
        <div>
          <h2 className="text-[length:var(--token-font-size-heading-sm)] font-medium text-text-primary mb-[var(--token-spacing-3)]">
            Props
          </h2>
          <div className="overflow-x-auto rounded-[var(--token-radius-md)] border border-border-default">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-secondary">
                  <th className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-caption)] font-semibold text-text-secondary">Name</th>
                  <th className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-caption)] font-semibold text-text-secondary">Type</th>
                  <th className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-caption)] font-semibold text-text-secondary">Default</th>
                  <th className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-caption)] font-semibold text-text-secondary">Description</th>
                </tr>
              </thead>
              <tbody>
                {meta.props.map((p) => (
                  <tr key={p.name} className="border-t border-border-default">
                    <td className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-body-sm)] font-mono text-text-primary">
                      {p.name}
                      {p.required && <span className="text-error ml-[2px]">*</span>}
                    </td>
                    <td className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-caption)] font-mono text-text-secondary">
                      {p.type}
                    </td>
                    <td className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-caption)] text-text-tertiary">
                      {p.defaultValue ?? '—'}
                    </td>
                    <td className="px-[var(--token-spacing-3)] py-[var(--token-spacing-2)] text-[length:var(--token-font-size-body-sm)] text-text-secondary">
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
