import type { FlowScreenProps } from '../../pages/simulator/flowRegistry'
import Header from '../../library/navigation/Header'
import BaseLayout from '../../library/layout/BaseLayout'
import StickyFooter from '../../library/layout/StickyFooter'
import Stack from '../../library/layout/Stack'
import Button from '../../library/inputs/Button'
import DataList from '../../library/display/DataList'
import GroupHeader from '../../library/navigation/GroupHeader'
import Alert from '../../library/display/Alert'
import Link from '../../library/foundations/Link'
import Text from '../../library/foundations/Text'
import { formatCurrency } from '../savings-reviewed/shared/data'
import { getLastAmount } from './state'

const HIGH_VALUE_THRESHOLD = 10000

export default function Screen2_Review({ onNext, onBack, onElementTap }: FlowScreenProps) {
  const amount = getLastAmount() || 100
  const isHighValue = amount > HIGH_VALUE_THRESHOLD

  return (
    <BaseLayout>
      <Header title="" onBack={onBack} />

      <Text variant="h1">Revise os dados</Text>

      <Stack gap="default">
        <Stack gap="none">
          <GroupHeader text="Detalhes da operação" />
          <DataList data={[
            { label: 'Você está guardando', value: formatCurrency(amount, 'USD') },
            { label: 'Meio de pagamento', value: 'Saldo do Cartão' },
            { label: 'Prazo', value: isHighValue ? '30 minutos' : '3 minutos' },
            {
              label: 'Nossa taxa',
              value: (
                <span className="text-[var(--color-feedback-success)] font-medium">Grátis</span>
              ),
            },
          ]} />
        </Stack>

        <Stack gap="none">
          <GroupHeader text="Sobre o rendimento" />
          <DataList data={[
            { label: 'Rentabilidade atual', value: '4,72% a.a.' },
            { label: 'Resgate', value: 'A qualquer momento' },
            { label: 'Proteção Inclusa', value: <Link linkText="Consultar" onLinkPress={() => {}} size="base" /> },
          ]} />
        </Stack>

        {isHighValue && (
          <Alert
            variant="neutral"
            title="Depósito acima de US$ 10.000"
            description="Valores acima desse limite passam por uma confirmação extra do nosso time — o saldo entra em rendimento em cerca de 30 minutos."
          />
        )}
      </Stack>

      <StickyFooter>
        <Button size="base" fullWidth onPress={() => {
          const handled = onElementTap?.('Button: Confirmar depósito')
          if (!handled) onNext()
        }}>
          Confirmar depósito
        </Button>
      </StickyFooter>
    </BaseLayout>
  )
}
