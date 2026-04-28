/**
 * @screen Coverage
 * @description Full coverage detail screen — mirrors the onboarding insurance screen
 *   and shows the coverage certificate illustration at the top.
 */
import type { FlowScreenProps } from '../../../pages/simulator/flowRegistry'
import BaseLayout from '../../../library/layout/BaseLayout'
import Stack from '../../../library/layout/Stack'
import Header from '../../../library/navigation/Header'
import Link from '../../../library/foundations/Link'
import Alert from '../../../library/display/Alert'
import Summary from '../../../library/display/Summary'
import GroupHeader from '../../../library/navigation/GroupHeader'
import DataList from '../../../library/display/DataList'
import { RiCodeLine, RiLineChartLine, RiShieldCheckLine } from '@remixicon/react'
import coverageSvg from '../../../assets/images/coverage.svg'

export default function Screen3_InsuranceCard({ onBack }: FlowScreenProps) {
  return (
    <BaseLayout>
      <Header
        title="Seu dinheiro protegido"
        description="Sua caixinha já vem com proteção inclusa. Sem contratação, sem custo extra."
        onBack={onBack}
      />

      <Stack gap="lg">
        <img src={coverageSvg} alt="Certificado de cobertura" className="w-full h-auto" />

        <Stack gap="none">
          <Stack gap="none">
            <GroupHeader text="O que está coberto" />
            <Summary
              data={[
                { icon: <RiCodeLine size={20} />, title: 'Falhas técnicas', description: 'Erros técnicos do provedor que afetem seu saldo ou bloqueiem o resgate' },
                { icon: <RiLineChartLine size={20} />, title: 'Valores incorretos', description: 'Erros de cotação que causem perda do valor depositado e rendimentos' },
                { icon: <RiShieldCheckLine size={20} />, title: 'Ataques ao provedor', description: 'Ataques maliciosos que comprometam o valor investido' },
              ]}
            />
          </Stack>

          <Alert
            variant="neutral"
            title="O que não é coberto?"
            description="Quedas normais de mercado e acesso indevido à conta — como ataques de phishing ou malware"
          />
        </Stack>

        <Stack gap="none">
          <GroupHeader text="Detalhes da cobertura" />
          <DataList data={[
            { label: 'Provedor', value: 'OpenCover × Nexus Mutual' },
            { label: 'Cobertura', value: '97% do valor investido' },
            { label: 'Custo', value: 'Grátis' },
            { label: 'Período de carência', value: '14 dias' },
            { label: 'Reembolso após aprovação', value: 'Até 30 dias' },
            {
              label: 'Termos e condições',
              value: (
                <Link
                  linkText="Consultar"
                  size="base"
                  onLinkPress={() => window.open('https://api.nexusmutual.io/v2/ipfs/QmUJFWdxC7UxQBJXatgkUmJstcb6Kb9erYfSanVkReeXhE', '_blank')}
                />
              ),
            },
          ]} />
        </Stack>
      </Stack>
    </BaseLayout>
  )
}
