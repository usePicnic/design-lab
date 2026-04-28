/**
 * @screen Dashboard (caixinha-review copy)
 * @description Caixinhas list uses ListItem + Avatar (size md, 40px) instead of
 *   the bespoke CaixinhaCard. Only USD active, EUR/BRL disabled with "Em breve".
 */
import { RiArrowDownLine, RiArrowRightUpLine, RiInformationLine } from '@remixicon/react'
import { BiSolidShield } from 'react-icons/bi'
import savingsPiggy from '../../assets/images/savings-piggy-3d.jpg'
import type { FlowScreenProps } from '../../pages/simulator/flowRegistry'
import { useScreenData } from '../../lib/ScreenDataContext'
import FeatureLayout from '../../library/layout/FeatureLayout'
import Stack from '../../library/layout/Stack'
import Text from '../../library/foundations/Text'
import GroupHeader from '../../library/navigation/GroupHeader'
import ShortcutButton from '../../library/inputs/ShortcutButton'
import Alert from '../../library/display/Alert'
import Avatar from '../../library/display/Avatar'
import ListItem from '../../library/display/ListItem'
import { motion } from 'framer-motion'
import { BalanceDisplay } from '../savings-reviewed/manage/Screen2_Hub.parts'
import {
  CURRENCIES,
  formatBrlEquivalent,
  formatCurrency,
  type CaixinhaCurrency,
} from '../savings-reviewed/shared/data'

interface ScreenData {
  hasBalance?: boolean
  hasPending?: boolean
  [key: string]: unknown
}

interface CaixinhaRow {
  currency: CaixinhaCurrency
  name: string
  balance: number
  yieldToday: number
  disabled?: boolean
  protected?: boolean
  onPress?: () => void
}

function CaixinhaRow({ currency, name, balance, yieldToday, disabled, protected: isProtected, onPress }: CaixinhaRow) {
  const curr = CURRENCIES[currency]
  const subtitle = disabled
    ? 'Em breve'
    : `Rendendo ${curr.apyDisplay.replace(' a.a.', '')} ao ano`

  const right = disabled ? null : (
    <Stack gap="none" align="end">
      <Text variant="body-lg" className="font-medium tracking-tight">
        {formatCurrency(balance, currency)}
      </Text>
      {yieldToday > 0 && (
        <Text
          variant="body-sm"
          className="text-[var(--color-feedback-success)] font-semibold tracking-tight"
        >
          ↑ {formatCurrency(yieldToday, currency)}
        </Text>
      )}
    </Stack>
  )

  return (
    <ListItem
      left={
        <Avatar
          src={curr.flagIcon}
          size="md"
          overlay={isProtected ? <BiSolidShield size={12} className="text-white" /> : undefined}
          overlayBg={isProtected ? 'var(--token-brand-black)' : undefined}
        />
      }
      title={name}
      subtitle={subtitle}
      right={right}
      trailing={null}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    />
  )
}

export default function Screen1_Dashboard({ onNext, onElementTap }: FlowScreenProps) {
  const data = useScreenData<ScreenData>()
  const hasBalance = data.hasBalance ?? true
  const hasPending = data.hasPending ?? false

  const usdBalance = hasBalance ? 9894.89 : 0
  const usdYield = hasBalance ? 80.32 : 0

  const handleTapDolar = () => {
    const resolved = onElementTap?.('CaixinhaCard: Caixinha em Dólar')
    if (!resolved) onNext()
  }

  const handleTapAdicionar = () => {
    const resolved = onElementTap?.('ShortcutButton: Adicionar')
    if (!resolved) onNext()
  }

  const handleTapResgatar = () => {
    const resolved = onElementTap?.('ShortcutButton: Resgatar')
    if (!resolved) onNext()
  }

  const handleTapHelp = () => {
    const resolved = onElementTap?.('IconButton: Ajuda')
    if (!resolved) onNext()
  }

  return (
    <FeatureLayout
      imageBgColor="#F2C0CB"
      imageMaxHeight={300}
      imageHeader={
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${savingsPiggy})`,
              backgroundSize: '130%',
              backgroundPosition: '48% 92%',
              backgroundRepeat: 'no-repeat',
              transform: 'scaleX(-1)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(180,60,100,0.75) 0%, rgba(180,60,100,0.35) 30%, transparent 55%)',
            }}
          />
          <Stack gap="none" className="relative z-10">
            <Text variant="h1" className="!text-white">Caixinhas</Text>
            <Text variant="body-md" className="!text-white/95 leading-[140%]">
              Rendimento automático e simples
            </Text>
          </Stack>
          <div className="absolute top-[var(--safe-area-top,12px)] right-[var(--token-spacing-24)] z-20">
            <Avatar
              size="md"
              inverted
              icon={<RiInformationLine size={24} />}
              onPress={handleTapHelp}
            />
          </div>
        </>
      }
    >
      <Stack gap="lg">
        {/* Total balance */}
        <Stack gap="none" className="gap-[var(--token-spacing-8)]">
          <Text variant="body-sm" color="content-secondary">Total guardado</Text>
          <Stack gap="none" className="gap-[var(--token-spacing-4)]">
            <div className={hasPending ? 'opacity-40' : ''}>
              <BalanceDisplay value={usdBalance} symbol="US$" />
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
                    <path
                      d="M12 2a10 10 0 0 1 10 10"
                      stroke="var(--color-content-primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
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
                {formatBrlEquivalent(usdBalance, 'USD')}
              </Text>
            )}
          </Stack>
        </Stack>

        {!hasBalance && (
          <Alert
            variant="neutral"
            title="Seu dinheiro rende em moeda forte"
            description="Planeje sua próxima viagem, monte uma reserva em dólar ou euro e veja seu saldo crescer com rendimento automático."
          />
        )}

        {/* Shortcuts */}
        <Stack direction="row" gap="default" align="start">
          <ShortcutButton
            icon={<RiArrowDownLine size={22} />}
            label="Adicionar"
            variant="primary"
            onPress={handleTapAdicionar}
          />
          <ShortcutButton
            icon={<RiArrowRightUpLine size={22} />}
            label="Resgatar"
            variant="secondary"
            disabled={!hasBalance}
            onPress={handleTapResgatar}
          />
        </Stack>

        {/* Caixinhas list */}
        <Stack gap="none">
          <GroupHeader text="Suas caixinhas" />
          <Stack gap="none">
            <CaixinhaRow
              currency="USD"
              name="Dólar Protegido"
              balance={usdBalance}
              yieldToday={usdYield}
              protected
              onPress={handleTapDolar}
            />
            <CaixinhaRow currency="EUR" name="Caixinha em Euro" balance={0} yieldToday={0} disabled />
            <CaixinhaRow currency="BRL" name="Caixinha em Reais" balance={0} yieldToday={0} disabled />
          </Stack>
        </Stack>
      </Stack>
    </FeatureLayout>
  )
}
