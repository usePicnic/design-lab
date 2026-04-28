import type { FlowScreenProps } from '../../pages/simulator/flowRegistry'
import FeedbackLayout from '../../library/layout/FeedbackLayout'
import StickyFooter from '../../library/layout/StickyFooter'
import Stack from '../../library/layout/Stack'
import Button from '../../library/inputs/Button'
import DataList from '../../library/display/DataList'
import Countdown from '../../library/feedback/Countdown'
import GroupHeader from '../../library/navigation/GroupHeader'
import Text from '../../library/foundations/Text'

export default function Screen4_Success({ onBack, onElementTap }: FlowScreenProps) {
  return (
    <FeedbackLayout onClose={onBack}>
      <Stack gap="sm">
        <Text variant="display">Depósito em andamento...</Text>
        <Text variant="body-md" color="content-secondary">
          Você será notificado quando concluído. Seu dinheiro começa a render ainda hoje.
        </Text>
      </Stack>

      <Countdown seconds={180} label="Tempo estimado:" />

      <Stack gap="default">
        <Stack gap="none">
          <GroupHeader text="Resumo da operação" />
          <DataList data={[
            { label: 'Valor guardado', value: 'US$ 100,00' },
            { label: 'Meio de pagamento', value: 'Saldo do Cartão' },
            {
              label: 'Nossa taxa',
              value: (
                <span className="text-[var(--color-feedback-success)] font-medium">Grátis</span>
              ),
            },
            { label: 'Rentabilidade atual', value: '4,72% a.a.' },
          ]} />
        </Stack>
      </Stack>

      <StickyFooter>
        <Button size="base" fullWidth onPress={() => {
          const handled = onElementTap?.('Button: Entendi')
          if (!handled) onBack()
        }}>Entendi</Button>
      </StickyFooter>
    </FeedbackLayout>
  )
}
