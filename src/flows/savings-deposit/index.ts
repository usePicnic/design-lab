import { registerFlow } from '../../pages/simulator/flowRegistry'
import { registerPage } from '../../pages/gallery/pageRegistry'
import { bootstrapFlowGraph } from '../../pages/simulator/flowGraphStore'
import type { FlowNodeData } from '../../pages/simulator/flowGraph.types'
import Screen1_AmountEntry from './Screen1_AmountEntry'
import Screen2_Review from './Screen2_Review'
import Screen3_Processing from './Screen3_Processing'
import Screen4_Success from './Screen4_Success'

// ── Screen definitions ──

const screenDefs = [
  {
    id: 'savings-deposit-usd',
    title: 'Amount Entry – Card Balance',
    description: 'Amount entry for depositing with card balance (USD→USD). Has BottomSheet for switching payment method.',
    componentsUsed: ['BaseLayout', 'Header', 'CurrencyInput', 'StickyFooter', 'Button', 'BottomSheet', 'ListItem', 'Avatar', 'Chip', 'DataList', 'Banner', 'DataListSkeleton', 'BannerSkeleton'],
    component: Screen1_AmountEntry,
    interactiveElements: [
      { id: 'btn-continuar', component: 'Button', label: 'Continuar' },
      { id: 'btn-mudar', component: 'Button', label: 'Mudar' },
      { id: 'li-saldo', component: 'ListItem', label: 'Saldo do Cartão' },
      { id: 'li-pix', component: 'ListItem', label: 'Real Brasileiro' },
      { id: 'li-ach', component: 'ListItem', label: 'ACH' },
    ],
    states: [
      { id: 'default', name: 'Card Balance', description: 'Default USD→USD via card balance', isDefault: true, data: { initialMethod: 'card-balance' } },
    ],
  },
  {
    id: 'savings-deposit-review',
    title: 'Deposit Review',
    description: 'Review deposit details before confirming. Two DataList sections (operation details + yield info), neutral banner about yield, "Confirmar depósito" CTA.',
    componentsUsed: ['BaseLayout', 'Header', 'StickyFooter', 'Stack', 'Button', 'TextInput', 'DataList', 'GroupHeader', 'Text'],
    component: Screen2_Review,
    interactiveElements: [
      { id: 'btn-confirmar', component: 'Button', label: 'Confirmar depósito' },
    ],
  },
  {
    id: 'savings-deposit-processing',
    title: 'Processing',
    description: 'Animated loading with deposit step messages. Adapts messages per payment method.',
    componentsUsed: ['LoadingScreen'],
    component: Screen3_Processing,
    states: [
      { id: 'default', name: 'Card Balance', description: 'Processing card balance deposit', isDefault: true, data: { paymentMethod: 'card-balance' } },
    ],
  },
  {
    id: 'savings-deposit-success',
    title: 'Deposit Success',
    description: 'Deposit confirmed with transaction summary and yield projection.',
    componentsUsed: ['FeedbackLayout', 'StickyFooter', 'Stack', 'Button', 'DataList', 'Banner', 'GroupHeader', 'Text'],
    component: Screen4_Success,
    interactiveElements: [
      { id: 'btn-entendi', component: 'Button', label: 'Entendi' },
    ],
  },
]

// ── Register pages ──

for (const s of screenDefs) {
  registerPage({
    id: s.id,
    name: s.title,
    description: s.description,
    area: 'Earn',
    componentsUsed: [...s.componentsUsed],
    component: s.component,
    ...('states' in s && s.states ? { states: s.states } : {}),
  })
}

// ── Register flow ──

registerFlow({
  id: 'savings-deposit',
  name: 'Savings Deposit',
  description: 'Deposit into USD savings account via card balance.',
  domain: 'earn',
  level: 2,
  linkedFlows: ['savings-manage'],
  entryPoints: ['savings-hub', 'dashboard-shortcut'],
  screens: screenDefs.map((s) => ({ ...s, pageId: s.id })),
})

// ── Flow graph ──

{
  const ROW = 120
  const x = 300

  const nodes = [
    { id: 'n-amount-usd', type: 'screen', position: { x, y: 0 },
      data: { label: 'Amount Entry (Card)', screenId: 'savings-deposit-usd', nodeType: 'screen',
              pageId: 'savings-deposit-usd', description: 'USD→USD via card balance' } as FlowNodeData },

    { id: 'n-tap-continuar-usd', type: 'action', position: { x, y: ROW },
      data: { label: 'Tap Continuar', screenId: null, nodeType: 'action',
              actionType: 'tap', actionTarget: 'Button: Continuar' } as FlowNodeData },

    { id: 'n-review', type: 'screen', position: { x, y: ROW * 2 },
      data: { label: 'Deposit Review', screenId: 'savings-deposit-review', nodeType: 'screen',
              pageId: 'savings-deposit-review', description: 'Review amount, method, fees before confirming' } as FlowNodeData },

    { id: 'n-tap-confirmar', type: 'action', position: { x, y: ROW * 3 },
      data: { label: 'Tap Confirmar depósito', screenId: null, nodeType: 'action',
              actionType: 'tap', actionTarget: 'Button: Confirmar depósito' } as FlowNodeData },

    { id: 'n-api-deposit', type: 'api-call', position: { x, y: ROW * 4 },
      data: { label: 'Process Deposit', screenId: null, nodeType: 'api-call',
              apiMethod: 'POST', apiEndpoint: '/api/savings/deposit',
              description: 'Submit deposit order to backend' } as FlowNodeData },

    { id: 'n-processing', type: 'screen', position: { x, y: ROW * 5 },
      data: { label: 'Processing', screenId: 'savings-deposit-processing', nodeType: 'screen',
              pageId: 'savings-deposit-processing', description: 'Animated loading with step messages' } as FlowNodeData },

    { id: 'n-success', type: 'screen', position: { x, y: ROW * 6 },
      data: { label: 'Deposit Success', screenId: 'savings-deposit-success', nodeType: 'screen',
              pageId: 'savings-deposit-success', description: 'Deposit confirmed with summary' } as FlowNodeData },

    { id: 'n-tap-entendi', type: 'action', position: { x, y: ROW * 7 },
      data: { label: 'Tap Entendi', screenId: null, nodeType: 'action',
              actionType: 'tap', actionTarget: 'Button: Entendi' } as FlowNodeData },

    { id: 'n-ref-savings', type: 'flow-reference', position: { x, y: ROW * 8 },
      data: { label: 'Savings Hub', screenId: null, nodeType: 'flow-reference',
              targetFlowId: 'savings-manage', description: 'Return to savings hub after successful deposit' } as FlowNodeData },
  ]

  const edges = [
    { id: 'e-amt-cont', source: 'n-amount-usd', target: 'n-tap-continuar-usd' },
    { id: 'e-cont-rev', source: 'n-tap-continuar-usd', target: 'n-review' },
    { id: 'e-rev-conf', source: 'n-review', target: 'n-tap-confirmar' },
    { id: 'e-conf-api', source: 'n-tap-confirmar', target: 'n-api-deposit' },
    { id: 'e-api-proc', source: 'n-api-deposit', target: 'n-processing' },
    { id: 'e-proc-suc', source: 'n-processing', target: 'n-success' },
    { id: 'e-suc-ent', source: 'n-success', target: 'n-tap-entendi' },
    { id: 'e-ent-ref', source: 'n-tap-entendi', target: 'n-ref-savings' },
  ]

  // Force-refresh the stored graph so the simplified version overrides any cached version
  try {
    const STORAGE_KEY = 'picnic-design-lab:flow-graphs'
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const graphs = JSON.parse(raw)
      if (graphs['savings-deposit']?.nodes?.some((n: { id: string }) => n.id === 'n-amount-pix' || n.id === 'n-decision-balance')) {
        delete graphs['savings-deposit']
        localStorage.setItem(STORAGE_KEY, JSON.stringify(graphs))
      }
    }
  } catch { /* ignore */ }

  bootstrapFlowGraph('savings-deposit', nodes, edges)
}
