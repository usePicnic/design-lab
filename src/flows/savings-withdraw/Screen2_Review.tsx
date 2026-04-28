import type { FlowScreenProps } from '../../pages/simulator/flowRegistry'
import BaseLayout from '../../library/layout/BaseLayout'
import StickyFooter from '../../library/layout/StickyFooter'
import Stack from '../../library/layout/Stack'
import Header from '../../library/navigation/Header'
import GroupHeader from '../../library/navigation/GroupHeader'
import Button from '../../library/inputs/Button'
import DataList from '../../library/display/DataList'
import Text from '../../library/foundations/Text'

export default function Screen2_Review({ onNext, onBack, onElementTap }: FlowScreenProps) {
  return (
    <BaseLayout>
      <Header title="" onBack={onBack} />

      <Text variant="h1">Confirme o resgate</Text>

      <Stack gap="none">
        <GroupHeader text="Detalhes da operação" />
        <DataList
          data={[
            { label: 'Você está resgatando', value: 'US$ 100,00' },
            { label: 'Destino', value: 'Saldo do Cartão' },
            { label: 'Taxa', value: '3 minutos' },
            { label: 'Taxa', value: <span className="text-[var(--color-feedback-success)] font-medium">Grátis</span> },
          ]}
        />
      </Stack>

      <StickyFooter>
        <Button
          size="base"
          fullWidth
          onPress={() => {
            const handled = onElementTap?.('Button: Confirmar resgate')
            if (!handled) onNext()
          }}
        >
          Confirmar resgate
        </Button>
      </StickyFooter>
    </BaseLayout>
  )
}
