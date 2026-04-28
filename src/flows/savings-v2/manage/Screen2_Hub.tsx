/**
 * @screen Savings Details
 * @description Savings details with balance, relevant data and shortcuts to deposit and
 *   withdraw
 */
import { useState } from 'react'
import type { FlowScreenProps } from '../../../pages/simulator/flowRegistry'
import { useScreenData } from '../../../lib/ScreenDataContext'
import BaseLayout from '../../../library/layout/BaseLayout'
import Stack from '../../../library/layout/Stack'
import Header from '../../../library/navigation/Header'
import SegmentedControl from '../../../library/navigation/SegmentedControl'
import ShortcutButton from '../../../library/inputs/ShortcutButton'
import Text from '../../../library/foundations/Text'
import Alert from '../../../library/display/Alert'
import { motion } from 'framer-motion'
import { RiArrowDownLine, RiArrowRightUpLine } from '@remixicon/react'
import { DetailsTab, HistoryTab, DocumentsTab } from './Screen2_Hub.parts'
import { BalanceDisplay } from '../../savings-reviewed/manage/Screen2_Hub.parts'
import { formatCurrency, formatBrlEquivalent } from '../../savings-reviewed/shared/data'

const CURRENT_BALANCE = 9894.89
const CURRENT_GAINS = 80.32

interface ScreenData {
  tab?: number
  hasBalance?: boolean
  hasPending?: boolean
  showYieldInfo?: boolean
  [key: string]: unknown
}

export default function Screen2_Hub({ onNext, onBack, onElementTap }: FlowScreenProps) {
  const { tab: initialTab, hasBalance: hasBalanceData, hasPending: hasPendingData, showYieldInfo } = useScreenData<ScreenData>()
  const hasBalance = hasBalanceData ?? true
  const hasPending = hasPendingData ?? false
  const [activeTab, setActiveTab] = useState(initialTab ?? 0)

  const handleAdicionar = () => {
    const resolved = onElementTap?.('ShortcutButton: Adicionar')
    if (!resolved) onNext()
  }

  const handleResgatar = () => {
    const resolved = onElementTap?.('ShortcutButton: Resgatar')
    if (!resolved) onNext()
  }

  const handleViewPolicy = () => {
    const resolved = onElementTap?.('Button: Ver certificado')
    if (!resolved) onNext()
  }

  const handleViewInsurance = () => {
    const resolved = onElementTap?.('Link: Proteção Inclusa')
    if (!resolved) onNext()
  }

  return (
    <BaseLayout>
      <Header title="Caixinha em Dólar" onBack={onBack} />

      <Stack gap="lg">
        <Stack gap="none" className="gap-[var(--token-spacing-4)]">
          <div className={hasPending ? 'opacity-40' : ''}>
            <BalanceDisplay value={hasBalance ? CURRENT_BALANCE : 0} symbol="US$" />
          </div>
          {hasPending && (
            <div className="flex items-center gap-[var(--token-spacing-8)]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="shrink-0"
                style={{ width: 16, height: 16 }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <circle cx="12" cy="12" r="10" stroke="var(--token-neutral-200)" strokeWidth="3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="var(--color-content-primary)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </motion.div>
              <span className="text-[length:var(--token-font-size-body-sm)] leading-[var(--token-line-height-body-sm)] font-medium text-[var(--color-content-primary)]">
                Processando depósito...
              </span>
            </div>
          )}
          {hasBalance && !hasPending && (
            <Text
              variant="body-md"
              className="text-[var(--color-content-secondary)] font-medium tracking-tight"
            >
              {formatBrlEquivalent(CURRENT_BALANCE, 'USD')}
            </Text>
          )}
        </Stack>

        {!hasBalance && (
          <Alert
            variant="neutral"
            title="Rendimento com proteção inclusa"
            description="O saldo dessa caixinha  é protegido contra falhas técnicas e fraudes — sem custo adicional."
          />
        )}

        <Stack direction="row" gap="default" align="start">
          <ShortcutButton
            icon={<RiArrowDownLine size={22} />}
            label="Adicionar"
            variant="primary"
            onPress={handleAdicionar}
          />
          <ShortcutButton
            icon={<RiArrowRightUpLine size={22} />}
            label="Resgatar"
            variant="secondary"
            disabled={!hasBalance}
            onPress={handleResgatar}
          />
        </Stack>

        <Stack gap="sm" className="mt-[var(--token-spacing-8)]">
          <SegmentedControl
            segments={['Detalhes', 'Histórico', 'Documentos']}
            activeIndex={activeTab}
            onChange={setActiveTab}
            className="self-start"
          />

          {activeTab === 0 && <DetailsTab hasBalance={hasBalance} yieldAmount={formatCurrency(CURRENT_GAINS, 'USD')} defaultYieldSheetOpen={showYieldInfo} onViewInsurance={handleViewInsurance} />}
          {activeTab === 1 && <HistoryTab hasBalance={hasBalance} />}
          {activeTab === 2 && <DocumentsTab onViewPolicy={handleViewPolicy} />}
        </Stack>
      </Stack>
    </BaseLayout>
  )
}
