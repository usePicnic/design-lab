import { type ChangeEvent } from 'react'
import type { ReactNode } from 'react'
import { registerComponent } from '../registry'
import { cn } from '../../lib/cn'

export type TextInputSize = 'default' | 'lg'

export interface TextInputProps {
  label?: string
  hint?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  size?: TextInputSize
  helperText?: string
  error?: string
  disabled?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  className?: string
}

export default function TextInput({
  label,
  hint,
  placeholder,
  value,
  onChange,
  type = 'text',
  size = 'default',
  helperText,
  error,
  disabled = false,
  leadingIcon,
  trailingIcon,
  className,
}: TextInputProps) {
  const hasError = !!error
  const isLg = size === 'lg'

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div data-component="TextInput" className={cn('flex flex-col gap-[var(--token-spacing-4)]', className)}>
      {(label || hint) && (
        <div className="flex items-center justify-between gap-[var(--token-spacing-8)]">
          {label && (
            <label className="text-[length:var(--token-font-size-body-sm)] leading-[var(--token-line-height-body-sm)] font-medium text-[var(--color-content-secondary)]">
              {label}
            </label>
          )}
          {hint && (
            <span className="text-[length:var(--token-font-size-caption)] leading-[var(--token-line-height-caption)] text-[var(--color-content-tertiary)]">
              {hint}
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          'flex items-center gap-[var(--token-spacing-8)]',
          'border border-[var(--color-border)] rounded-[var(--token-radius-md)]',
          'bg-[var(--color-surface-level-0)]',
          'transition-shadow duration-150',
          isLg
            ? 'h-[56px] px-[var(--token-spacing-16)] py-[var(--token-spacing-16)]'
            : 'h-[48px] px-[var(--token-spacing-16)] py-[var(--token-spacing-12)]',
          hasError
            ? 'shadow-[0_0_0_2px_white,0_0_0_4px_var(--color-feedback-error)]'
            : 'focus-within:shadow-[0_0_0_2px_white,0_0_0_4px_var(--color-action)]',
          disabled && 'bg-[var(--color-action-disabled)] cursor-not-allowed',
        )}
      >
        {leadingIcon && (
          <span className="shrink-0 inline-flex text-[var(--color-content-tertiary)]">{leadingIcon}</span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'flex-1 min-w-0 bg-transparent outline-none',
            isLg
              ? 'text-[length:var(--token-font-size-body-lg)] leading-[var(--token-line-height-body-lg)]'
              : 'text-[length:var(--token-font-size-body-md)] leading-[var(--token-line-height-body-md)]',
            'text-[var(--color-content-primary)] placeholder:text-[var(--color-content-tertiary)]',
            disabled && 'cursor-not-allowed text-[var(--color-content-secondary)]',
          )}
        />
        {trailingIcon && (
          <span className="shrink-0 inline-flex text-[var(--color-content-tertiary)]">{trailingIcon}</span>
        )}
      </div>

      {(helperText || error) && (
        <span
          className={cn(
            'text-[length:var(--token-font-size-caption)] leading-[var(--token-line-height-caption)]',
            hasError ? 'text-[var(--color-feedback-error)]' : 'text-[var(--color-content-tertiary)]',
          )}
        >
          {error ?? helperText}
        </span>
      )}
    </div>
  )
}

registerComponent({
  name: 'TextInput',
  category: 'inputs',
  reviewed: true,
  description: 'Text field with label, optional corner hint, leading/trailing icons, and validation states. Use for names, emails, and general form input.',
  component: TextInput,
  props: [
    { name: 'label',        type: 'string',                      required: false, description: 'Field label' },
    { name: 'hint',         type: 'string',                      required: false, description: 'Corner hint (right side of label row)' },
    { name: 'placeholder',  type: 'string',                      required: false, description: 'Placeholder text' },
    { name: 'value',        type: 'string',                      required: false, description: 'Input value' },
    { name: 'onChange',     type: '(value: string) => void',     required: false, description: 'Change handler' },
    { name: 'type',         type: 'string',                      required: false, defaultValue: 'text', description: 'Input type (text, email, password, etc.)' },
    { name: 'size',         type: '"default" | "lg"',            required: false, defaultValue: 'default', description: 'Field height — default 48px, lg 56px' },
    { name: 'helperText',   type: 'string',                      required: false, description: 'Helper text below field' },
    { name: 'error',        type: 'string',                      required: false, description: 'Error message (shows red ring + text)' },
    { name: 'disabled',     type: 'boolean',                     required: false, defaultValue: 'false', description: 'Disable the field' },
    { name: 'leadingIcon',  type: 'ReactNode',                   required: false, description: 'Icon before the text' },
    { name: 'trailingIcon', type: 'ReactNode',                   required: false, description: 'Icon after the text (e.g. check for filled state)' },
  ],
})
