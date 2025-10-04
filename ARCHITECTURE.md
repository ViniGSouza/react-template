# Arquitetura do Projeto Agisales

## 🏗️ Visão Geral da Arquitetura

Este projeto segue os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)** adaptados para frontend React, com foco em:

- **Separação de Responsabilidades**
- **Testabilidade**
- **Escalabilidade**
- **Manutenibilidade**

## 📐 Camadas da Aplicação

### 1. Domain (Domínio)
Módulos de negócio organizados por funcionalidade. Cada módulo é auto-contido e independente.

\`\`\`
domain/
├── auth/                    # Autenticação e autorização
│   ├── components/         # Componentes específicos do domínio
│   │   └── LoginForm.tsx
│   ├── hooks/             # Hooks customizados
│   │   └── useAuth.ts
│   ├── services/          # Lógica de negócio
│   │   ├── auth.service.ts          # Service principal
│   │   ├── auth-mock.adapter.ts     # Implementação mock
│   │   └── auth-api.adapter.ts      # Implementação API real
│   ├── schemas/           # Validações Zod
│   │   └── login.schema.ts
│   └── types/             # Tipos TypeScript
│
├── proposals/              # Gestão de propostas
│   ├── components/
│   │   ├── ProposalForm.tsx
│   │   ├── ProposalCard.tsx
│   │   └── ProposalsList.tsx
│   ├── hooks/
│   │   └── useProposals.ts
│   ├── services/
│   │   ├── proposals.service.ts
│   │   ├── proposals-mock.adapter.ts
│   │   └── proposals-api.adapter.ts
│   ├── schemas/
│   │   └── proposal.schema.ts
│   └── types/
│       └── index.ts
│
└── dashboard/              # Dashboard e métricas
    ├── components/
    │   ├── MetricCard.tsx
    │   ├── ProposalsChart.tsx
    │   ├── TopProductsChart.tsx
    │   └── DashboardView.tsx
    ├── hooks/
    │   └── useDashboard.ts
    └── services/
        ├── dashboard.service.ts
        └── dashboard-mock.adapter.ts
\`\`\`

### 2. Core (Infraestrutura)
Camada de infraestrutura que fornece serviços básicos para toda a aplicação.

\`\`\`
core/
├── api/
│   └── client.ts           # Cliente HTTP genérico
├── adapters/
│   └── api-adapter.interface.ts  # Interfaces dos adapters
└── storage/
    └── index.ts            # Abstração do localStorage
\`\`\`

### 3. Shared (Compartilhado)
Código reutilizável em toda a aplicação.

\`\`\`
shared/
├── components/ui/          # Componentes UI do Shadcn
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   ├── table.tsx
│   ├── dialog.tsx
│   ├── label.tsx
│   └── chart.tsx
├── components/
│   └── ProtectedRoute.tsx  # Componente de rota protegida
├── lib/
│   └── utils.ts            # Utilitários (cn, etc)
└── types/
    └── index.ts            # Tipos compartilhados
\`\`\`

### 4. Pages e Layouts
Camada de apresentação que organiza os componentes em páginas.

\`\`\`
pages/
├── LoginPage.tsx
├── DashboardPage.tsx
└── ProposalsPage.tsx

layouts/
└── AppLayout.tsx           # Layout principal com navegação
\`\`\`

## 🎯 Padrões de Design Implementados

### 1. Adapter Pattern

O padrão Adapter permite trocar facilmente entre implementação mock e API real sem alterar o código de negócio.

**Interface:**
\`\`\`typescript
interface AuthAdapter {
  login(email: string, password: string): Promise<AuthResponse>;
  logout(): Promise<void>;
  getMe(): Promise<User>;
}
\`\`\`

**Implementações:**
\`\`\`typescript
// Mock - Para desenvolvimento
class AuthMockAdapter implements AuthAdapter {
  async login(email, password) {
    // Simula API com dados locais
  }
}

// Real - Para produção
class AuthApiAdapter implements AuthAdapter {
  async login(email, password) {
    // Chama API real
  }
}
\`\`\`

**Service Factory:**
\`\`\`typescript
class AuthService {
  private adapter: AuthAdapter;
  
  constructor() {
    // Escolhe adapter baseado no ambiente
    this.adapter = USE_MOCK 
      ? new AuthMockAdapter() 
      : new AuthApiAdapter();
  }
}
\`\`\`

**Benefícios:**
- ✅ Desenvolvimento sem backend
- ✅ Testes mais fáceis
- ✅ Troca transparente de implementação
- ✅ Código desacoplado

### 2. Repository Pattern

Abstrai a fonte de dados, permitindo múltiplas implementações.

\`\`\`typescript
interface ApiAdapter<T> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
\`\`\`

### 3. Custom Hooks Pattern

Encapsula lógica reutilizável e gerenciamento de estado.

\`\`\`typescript
export const useProposals = () => {
  const queryClient = useQueryClient();

  const { data: proposals, isLoading } = useQuery({
    queryKey: ["proposals"],
    queryFn: () => proposalsService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (data) => proposalsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
  });

  return { proposals, isLoading, createProposal: createMutation.mutateAsync };
};
\`\`\`

### 4. Factory Pattern

Services atuam como factories para adapters.

## 🔄 Fluxo de Dados

### Autenticação
\`\`\`
User Action (Login)
    ↓
LoginForm Component
    ↓
useAuth Hook
    ↓
AuthService (Factory)
    ↓
AuthAdapter (Mock/API)
    ↓
Storage Service
    ↓
TanStack Query Cache
    ↓
UI Update
\`\`\`

### Propostas
\`\`\`
User Action (Create/Update)
    ↓
ProposalsList Component
    ↓
useProposals Hook
    ↓
ProposalsService (Factory)
    ↓
ProposalsAdapter (Mock/API)
    ↓
TanStack Query Cache
    ↓
UI Update (Automatic via React Query)
\`\`\`

## 🧪 Estratégia de Testes

### 1. Testes Unitários
- **Services**: Testar lógica de negócio isolada
- **Adapters**: Testar implementações mock e real
- **Utils**: Testar funções utilitárias
- **Hooks**: Testar hooks isoladamente

### 2. Testes de Componentes
- **UI Components**: Testar renderização e interação
- **Forms**: Testar validação e submissão
- **Integration**: Testar fluxos completos

### 3. Mock Service Worker (MSW)
- Intercepta requisições HTTP
- Simula respostas da API
- Permite desenvolvimento sem backend

## 🎨 Gerenciamento de Estado

### TanStack Query (React Query)
- **Cache inteligente**: Dados em cache com invalidação automática
- **Background fetching**: Atualização em background
- **Optimistic updates**: UI responsiva
- **Error handling**: Tratamento de erros centralizado

### LocalStorage
- **Persistência**: Token e dados do usuário
- **Abstração**: StorageService encapsula lógica
- **Namespace**: Prefixo para evitar conflitos

## 🔒 Segurança

### Autenticação
- Token JWT (simulado no mock)
- Storage seguro com abstração
- Rotas protegidas com ProtectedRoute

### Validação
- **Client-side**: Zod para validação de formulários
- **Type-safety**: TypeScript em toda aplicação
- **Sanitização**: Validação antes de enviar dados

## 📦 Code Splitting

O projeto está preparado para code splitting:

\`\`\`typescript
// Lazy loading de páginas
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
\`\`\`

## 🚀 Performance

### Otimizações Implementadas
- **React.memo**: Componentes memorizados
- **useMemo/useCallback**: Evitar recálculos
- **TanStack Query**: Cache inteligente
- **Lazy loading**: Carregamento sob demanda (preparado)

## 📈 Escalabilidade

### Adicionar Novo Módulo de Domínio

1. Criar estrutura de pastas em `domain/`:
\`\`\`
domain/novo-modulo/
├── components/
├── hooks/
├── services/
├── schemas/
└── types/
\`\`\`

2. Criar adapters (mock e real)
3. Criar service factory
4. Criar hooks customizados
5. Criar componentes
6. Adicionar rotas

### Adicionar Nova Feature

1. Identificar o domínio
2. Criar componentes no domínio apropriado
3. Criar hooks se necessário
4. Criar testes
5. Integrar na aplicação

## 🔧 Manutenibilidade

### Princípios Seguidos

**SOLID:**
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

**Clean Code:**
- Nomenclatura descritiva
- Funções pequenas e focadas
- DRY (Don't Repeat Yourself)
- Comentários apenas quando necessário

**DDD:**
- Linguagem ubíqua
- Módulos por domínio
- Separação clara de responsabilidades

## 📝 Convenções

### Nomenclatura
- **Componentes**: PascalCase (Button.tsx)
- **Hooks**: camelCase com prefixo 'use' (useAuth.ts)
- **Services**: camelCase com sufixo '.service' (auth.service.ts)
- **Types**: PascalCase (User, Proposal)
- **Interfaces**: PascalCase com sufixo 'Props' ou 'Config'

### Estrutura de Arquivos
- **Componentes**: Um componente por arquivo
- **Exports**: Named exports preferidos
- **Imports**: Organizados por origem (externos, @/, relativos)

### Git
- **Commits**: Mensagens descritivas
- **Branches**: feature/, bugfix/, hotfix/
- **Pull Requests**: Com descrição e checklist

## 🎯 Próximos Passos

### Performance
- Implementar lazy loading completo
- Adicionar Service Worker (PWA)
- Otimizar bundle size

### Features
- WebSocket para updates em tempo real
- Notificações push
- Multi-idioma (i18n)
- Dark mode
- Exportação de relatórios

### Qualidade
- E2E tests com Playwright
- Aumentar coverage para 90%+
- Adicionar performance monitoring
- Implementar error tracking (Sentry)

---

**Esta arquitetura foi projetada para ser escalável, testável e fácil de manter, seguindo as melhores práticas da indústria.**

