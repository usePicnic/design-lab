/**
 * Caixinha Review — curated flow for dev handoff review.
 *
 * Six screens picked from existing savings flows so we can iterate on the
 * final "save-all" set without touching the original source flows.
 *
 *   1. save-all-onboarding-intro        → poupar/Screen1_Intro
 *   2. save-all-onboarding-insurance    → savings-onboarding-b/Screen2_InsuranceAbout
 *   3. save-all-manage-dashboard        → savings-v2/manage/Screen1_Dashboard        (Com saldo)
 *   4. save-all-manage-hub              → savings-v2/manage/Screen2_Hub              (Com saldo)
 *   5. save-all-manage-hub-yield-info   → savings-v2/manage/Screen2_Hub              (BottomSheet de rentabilidade aberto)
 *   6. save-all-manage-insurance        → savings-reviewed/manage/Screen3_InsuranceCard
 */

import { registerFlow } from '../../pages/simulator/flowRegistry'
import { registerPage } from '../../pages/gallery/pageRegistry'
import { bootstrapFlowGraph } from '../../pages/simulator/flowGraphStore'
import type { FlowNodeData } from '../../pages/simulator/flowGraph.types'

// Onboarding
import OnboardingIntro from '../poupar/Screen1_Intro'
import OnboardingInsurance from '../savings-onboarding-b/Screen2_InsuranceAbout'

// Manage (Com saldo — default state of the savings-v2 manage screens)
import ManageDashboard from './Screen1_Dashboard'
import ManageHub from '../savings-v2/manage/Screen2_Hub'

// Manage insurance
import ManageInsurance from '../savings-reviewed/manage/Screen3_InsuranceCard'

// ═══════════════════════════════════════════════════════════════
// SCREEN DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const screenDefs = [
  {
    id: 'save-all-onboarding-intro',
    title: 'Onboarding – Intro',
    description: 'First-time user intro: what the caixinha is and why it matters.',
    componentsUsed: ['FeatureLayout', 'StickyFooter', 'Stack', 'Button', 'Text', 'Chip', 'Summary', 'GroupHeader'],
    component: OnboardingIntro,
  },
  {
    id: 'save-all-onboarding-insurance',
    title: 'Onboarding – Insurance',
    description: 'Explains how the Nexus Mutual-style insurance protects deposits.',
    componentsUsed: ['BaseLayout', 'Header', 'Stack', 'Summary', 'GroupHeader', 'DataList', 'Alert', 'Button', 'Text'],
    component: OnboardingInsurance,
  },
  {
    id: 'save-all-manage-dashboard',
    title: 'Manage – Dashboard (Com saldo)',
    description: 'Dashboard with USD/EUR/BRL caixinhas rendered as ListItem + Avatar (md).',
    componentsUsed: ['FeatureLayout', 'Stack', 'ShortcutButton', 'GroupHeader', 'ListItem', 'Avatar', 'Alert', 'Text'],
    component: ManageDashboard,
    interactiveElements: [
      { id: 'cc-usd', component: 'CurrencyCard', label: 'Dólar americano' },
      { id: 'btn-help', component: 'IconButton', label: 'Ajuda' },
    ],
    states: [
      { id: 'default', name: 'Com saldo', description: 'USD caixinha has balance', isDefault: true, data: {} },
    ],
  },
  {
    id: 'save-all-manage-hub',
    title: 'Manage – Hub (Com saldo)',
    description: 'USD caixinha detail with balance, chart, shortcuts, and insurance.',
    componentsUsed: ['BaseLayout', 'Header', 'LineChart', 'ShortcutButton', 'SegmentedControl', 'DataList', 'Banner', 'Text', 'Stack'],
    component: ManageHub,
    interactiveElements: [
      { id: 'sc-adicionar', component: 'ShortcutButton', label: 'Adicionar' },
      { id: 'sc-resgatar', component: 'ShortcutButton', label: 'Resgatar' },
      { id: 'btn-apolice', component: 'Button', label: 'Ver certificado' },
      { id: 'lk-protecao', component: 'Link', label: 'Proteção Inclusa' },
    ],
    states: [
      { id: 'default', name: 'Com saldo', description: 'Has balance, Details tab', isDefault: true, data: {} },
      { id: 'no-balance', name: 'Sem saldo', description: 'Zero balance — protection Alert above tabs, no-balance Details rows.', data: { hasBalance: false } },
    ],
  },
  {
    id: 'save-all-manage-hub-yield-info',
    title: 'Manage – Hub (Rentabilidade info aberta)',
    description: 'Hub with the "Rentabilidade atual" BottomSheet open — shows the variable-yield explanation + CTA.',
    componentsUsed: ['BaseLayout', 'Header', 'SegmentedControl', 'DataList', 'Alert', 'BottomSheet', 'Button', 'Text', 'Stack'],
    component: ManageHub,
    states: [
      { id: 'default', name: 'Rentabilidade info aberta', description: 'BottomSheet explaining variable yield is open by default.', isDefault: true, data: { showYieldInfo: true } },
    ],
  },
  {
    id: 'save-all-manage-insurance',
    title: 'Manage – Insurance Card',
    description: 'Full coverage detail screen mirroring the onboarding insurance content, with coverage certificate illustration.',
    componentsUsed: ['BaseLayout', 'Header', 'Summary', 'Alert', 'GroupHeader', 'DataList', 'Link', 'Stack'],
    component: ManageInsurance,
  },
]

// ═══════════════════════════════════════════════════════════════
// REGISTER PAGES
// ═══════════════════════════════════════════════════════════════

for (const s of screenDefs) {
  registerPage({
    id: s.id,
    name: s.title,
    description: s.description,
    area: 'Earn',
    componentsUsed: [...s.componentsUsed],
    component: s.component,
    ...('states' in s && Array.isArray(s.states) ? { states: s.states } : {}),
  })
}

// ═══════════════════════════════════════════════════════════════
// REGISTER FLOW
// ═══════════════════════════════════════════════════════════════

registerFlow({
  id: 'caixinha-review',
  name: 'Caixinha Review',
  description:
    'Handoff review set: onboarding intro + insurance, manage dashboard + hub (Com saldo), and the insurance card.',
  domain: 'earn',
  level: 1,
  screens: screenDefs.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    componentsUsed: s.componentsUsed,
    component: s.component,
    ...('interactiveElements' in s && Array.isArray(s.interactiveElements)
      ? { interactiveElements: s.interactiveElements }
      : {}),
    ...('states' in s && Array.isArray(s.states) ? { states: s.states } : {}),
  })),
})

// ═══════════════════════════════════════════════════════════════
// GRAPH — linear onboarding → manage with a branch into insurance
// ═══════════════════════════════════════════════════════════════

const X = 400
const ROW = 160

bootstrapFlowGraph(
  'caixinha-review',
  [
    {
      id: 'n-onboarding-intro',
      type: 'screen',
      position: { x: X, y: 0 },
      data: {
        label: 'Onboarding Intro',
        screenId: 'save-all-onboarding-intro',
        nodeType: 'screen',
        pageId: 'save-all-onboarding-intro',
      } as FlowNodeData,
    },
    {
      id: 'n-onboarding-insurance',
      type: 'screen',
      position: { x: X, y: ROW },
      data: {
        label: 'Onboarding Insurance',
        screenId: 'save-all-onboarding-insurance',
        nodeType: 'screen',
        pageId: 'save-all-onboarding-insurance',
      } as FlowNodeData,
    },
    {
      id: 'n-manage-dashboard',
      type: 'screen',
      position: { x: X, y: ROW * 2 },
      data: {
        label: 'Manage Dashboard',
        screenId: 'save-all-manage-dashboard',
        nodeType: 'screen',
        pageId: 'save-all-manage-dashboard',
      } as FlowNodeData,
    },
    {
      id: 'n-manage-hub',
      type: 'screen',
      position: { x: X, y: ROW * 3 },
      data: {
        label: 'Manage Hub',
        screenId: 'save-all-manage-hub',
        nodeType: 'screen',
        pageId: 'save-all-manage-hub',
      } as FlowNodeData,
    },
    {
      id: 'n-manage-hub-yield-info',
      type: 'screen',
      position: { x: X, y: ROW * 4 },
      data: {
        label: 'Manage Hub (yield info open)',
        screenId: 'save-all-manage-hub-yield-info',
        nodeType: 'screen',
        pageId: 'save-all-manage-hub-yield-info',
      } as FlowNodeData,
    },
    {
      id: 'n-manage-insurance',
      type: 'screen',
      position: { x: X, y: ROW * 5 },
      data: {
        label: 'Manage Insurance',
        screenId: 'save-all-manage-insurance',
        nodeType: 'screen',
        pageId: 'save-all-manage-insurance',
      } as FlowNodeData,
    },
    {
      id: 'n-dash-help',
      type: 'action',
      position: { x: X - 240, y: ROW * 2 },
      data: {
        label: 'Tap Ajuda',
        screenId: null,
        nodeType: 'action',
        actionType: 'tap',
        actionTarget: 'IconButton: Ajuda',
      } as FlowNodeData,
    },
    {
      id: 'n-hub-protecao',
      type: 'action',
      position: { x: X + 240, y: ROW * 3 },
      data: {
        label: 'Tap Proteção Inclusa',
        screenId: null,
        nodeType: 'action',
        actionType: 'tap',
        actionTarget: 'Link: Proteção Inclusa',
      } as FlowNodeData,
    },
  ],
  [
    { id: 'e-intro-ins', source: 'n-onboarding-intro', target: 'n-onboarding-insurance' },
    { id: 'e-ins-dash', source: 'n-onboarding-insurance', target: 'n-manage-dashboard' },
    { id: 'e-dash-hub', source: 'n-manage-dashboard', target: 'n-manage-hub' },
    { id: 'e-hub-yieldinfo', source: 'n-manage-hub', target: 'n-manage-hub-yield-info' },
    { id: 'e-yieldinfo-ins', source: 'n-manage-hub-yield-info', target: 'n-manage-insurance' },
    { id: 'e-dash-help', source: 'n-manage-dashboard', target: 'n-dash-help' },
    { id: 'e-help-intro', source: 'n-dash-help', target: 'n-onboarding-intro' },
    { id: 'e-hub-protecao', source: 'n-manage-hub', target: 'n-hub-protecao' },
    { id: 'e-protecao-ins', source: 'n-hub-protecao', target: 'n-manage-insurance' },
  ],
  4,
)
