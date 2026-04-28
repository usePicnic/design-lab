import type { FlowScreenProps } from '../../pages/simulator/flowRegistry'
import FeedbackLayout from '../../library/layout/FeedbackLayout'
import StickyFooter from '../../library/layout/StickyFooter'
import Stack from '../../library/layout/Stack'
import GroupHeader from '../../library/navigation/GroupHeader'
import Button from '../../library/inputs/Button'
import DataList from '../../library/display/DataList'
import Countdown from '../../library/feedback/Countdown'
import Text from '../../library/foundations/Text'
export default function Screen4_Success({ onBack }: FlowScreenProps) {
  return (
    <FeedbackLayout onClose={onBack}>
      <Stack gap="sm">
        <Text variant="display">Resgate em andamento...</Text>
        <Text variant="body-md" color="content-secondary">
          Você será notificado quando concluído. O valor será creditado no saldo do seu cartão em alguns minutos.
        </Text>
      </Stack>

      <Countdown seconds={180} label="Tempo estimado:" />

      <Stack gap="none">
        <GroupHeader text="Resumo da operação" />
        <DataList
          data={[
            { label: 'Valor resgatado', value: 'US$ 100,00' },
            { label: 'Destino', value: 'Saldo do Cartão' },
            { label: 'Nossa taxa', value: <span className="text-[var(--color-feedback-success)] font-medium">Grátis</span> },
          ]}
        />
      </Stack>

      <StickyFooter>
        <Button size="base" fullWidth onPress={onBack}>
          Concluir
        </Button>
      </StickyFooter>
    </FeedbackLayout>
  )
}
