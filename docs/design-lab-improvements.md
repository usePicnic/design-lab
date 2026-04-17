# Design Lab — Melhorias do Sistema (para o Rafael)

> Período: desde o merge `feature/library` (commit `5f515f1`)

---

## 1. Sidebar de componentes

- Indicador visual de **componente revisado** (checkmark verde) ao lado de cada nome na lista
- Ordenação alfabética por categoria
- Campo de busca/filtro de componentes

---

## 2. Página de detalhe de componente

- **Hero section** com nome, descrição e lista de variantes/sizes disponíveis
- **Preview interativo** com toggle Light/Dark — renderiza o componente no contexto certo de cor
- **Tabela de props** (Property / Description / Type / Default) gerada a partir dos metadados registrados
- Botão de copiar no bloco de código de exemplo

---

## 3. Previews ricos por componente

Cada componente tem agora uma preview customizada com todas as variantes lado a lado por linha, com label identificando a seção.

| Componente | O que o preview mostra |
|------------|------------------------|
| Button     | 4 variantes × 4 estados (default, hover, disabled, loading) em grid com toggle claro/escuro |
| TextInput  | Tamanhos, hint text, ícones leading/trailing, focus ring |
| Chip       | Todas as variantes |
| Alert      | Variantes semânticas (neutral, success, warning, critical) |

---

## 4. Campo `reviewed` no registry

- Campo `reviewed?: boolean` adicionado ao `ComponentMeta`
- Componentes já marcados como revisados: **Button, Avatar, Alert, Checkbox, RadioGroup, Toggle, Chip**

---

## 5. Componentes revisados / adicionados

| Componente | Status | O que mudou |
|------------|--------|-------------|
| **Alert**  | Novo (substituiu Banner) | Variantes semânticas, slot de ícone via Avatar, collapsable, dismissible, action slot |
| **Chip**   | Novo (substituiu Badge) | Variantes completas |
| **Avatar** | Revisado | Slot de ícone, tones semânticos |
| **Button** | Revisado | Mais variantes de tamanho e estados |
| **TextInput** | Revisado | Sizes, hint text, ícones, focus ring melhorado |
| ~~Banner~~ | Removido | Substituído por Alert |
| ~~Badge~~  | Removido | Substituído por Chip |
| ~~IconButton~~ | Removido | — |

---

## 6. Sistema de tokens

- Tokens CSS reorganizados com nomes mais descritivos
- Aliases Tailwind via `@theme` atualizados para refletir o novo naming
