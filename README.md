# React Template - Clean Architecture + DDD

Template moderno para aplicações React seguindo os princípios de **Clean Architecture** e **Domain-Driven Design (DDD)**, pronto para escalar e manter.

## 🚀 Stack Tecnológica

### Core

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### Roteamento e Estado

- **React Router v7** - Roteamento client-side
- **TanStack Query v5** - Gerenciamento de estado assíncrono e cache

### UI e Estilização

- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes UI reutilizáveis e acessíveis
- **Recharts** - Biblioteca de gráficos

### Formulários e Validação

- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Schema validation com TypeScript

### Testes

- **Vitest** - Test runner rápido e moderno
- **React Testing Library** - Testes de componentes
- **MSW (Mock Service Worker)** - Mock de API para desenvolvimento e testes

### Utilitários

- **date-fns** - Manipulação de datas
- **clsx + tailwind-merge** - Gerenciamento de classes CSS

## 📁 Arquitetura

Estrutura baseada em **DDD** adaptada para frontend, com separação clara de responsabilidades:

```
src/
├── domain/                    # Módulos de domínio (features)
│   ├── [feature]/
│   │   ├── components/       # Componentes específicos do domínio
│   │   ├── hooks/            # Hooks customizados
│   │   ├── services/         # Lógica de negócio
│   │   ├── api/              # Chamadas HTTP
│   │   ├── schemas/          # Validações Zod
│   │   ├── types/            # Tipos TypeScript
│   │   ├── pages/            # Páginas do domínio
│   │   └── routes/           # Rotas do domínio
│
├── shared/                    # Código compartilhado entre domínios
│   ├── components/ui/        # Componentes UI reutilizáveis
│   ├── hooks/                # Hooks compartilhados
│   ├── lib/                  # Utilitários e helpers
│   └── types/                # Tipos compartilhados
│
├── core/                      # Infraestrutura da aplicação
│   ├── storage/              # Gerenciamento de storage
│   └── store/                # Estado global (Zustand)
│
├── api/                       # Configuração de APIs
├── layouts/                   # Layouts compartilhados
├── routes/                    # Configuração de rotas
├── test/                      # Configuração e mocks de teste
│   ├── mocks/                # Handlers MSW
│   └── fixtures/             # Dados de teste
└── styles/                    # Estilos globais
```

## 🎯 Princípios Aplicados

### Clean Architecture

- **Separação de camadas**: Domínio, Aplicação, Infraestrutura
- **Inversão de dependências**: Abstrações não dependem de implementações
- **Independência de frameworks**: Lógica de negócio isolada
- **Testabilidade**: Cada camada pode ser testada independentemente

### Domain-Driven Design (DDD)

- **Organização por domínio**: Features isoladas e coesas
- **Ubiquitous Language**: Nomenclatura consistente
- **Bounded Contexts**: Cada domínio tem seu próprio contexto

### SOLID

- **Single Responsibility**: Cada módulo tem uma única responsabilidade
- **Open/Closed**: Aberto para extensão, fechado para modificação
- **Liskov Substitution**: Substituição de implementações sem quebrar o código
- **Interface Segregation**: Interfaces específicas e granulares
- **Dependency Inversion**: Dependa de abstrações, não de implementações

### Padrões de Design

- **Adapter Pattern**: Abstração de APIs (mock/real)
- **Repository Pattern**: Abstração de fontes de dados
- **Hook Pattern**: Lógica reutilizável em hooks customizados
- **Factory Pattern**: Criação de instâncias de serviços

## 🔧 Como Usar

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```env
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=true
```

- `VITE_USE_MOCK=true`: Usa mocks (desenvolvimento sem backend)
- `VITE_USE_MOCK=false`: Usa API real

## 🧪 Testes

```bash
# Executar testes
npm test

# Testes com UI
npm run test:ui

# Testes com coverage
npm run test:coverage
```

## 🎨 Features Incluídas

- ✅ Dark Mode
- ✅ Autenticação com rotas protegidas
- ✅ Sistema de notificações (toast)
- ✅ Breadcrumbs automáticos
- ✅ Error Boundary
- ✅ Layout responsivo
- ✅ Mock de API com MSW
- ✅ Testes unitários configurados
- ✅ TypeScript estrito
- ✅ ESLint configurado

## 📦 Adicionando Novos Domínios

1. Crie a estrutura dentro de `src/domain/[nome-do-dominio]/`
2. Siga a estrutura:

```
[nome-do-dominio]/
├── components/
├── hooks/
├── services/
├── api/
├── schemas/
├── types/
├── pages/
└── routes/
```

3. Registre as rotas em `src/routes/index.tsx`
4. Mantenha o domínio isolado e coeso

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview da build
npm test             # Executar testes
npm run test:ui      # Testes com UI
npm run test:coverage # Coverage report
npm run lint         # Executar linter
```

## 🚀 Próximos Passos

Após clonar este template:

1. Renomeie o projeto no `package.json`
2. Configure suas variáveis de ambiente
3. Adicione seus próprios domínios em `src/domain/`
4. Configure a URL da sua API real
5. Customize o tema em `src/styles/globals.css`
6. Atualize este README com informações do seu projeto

## 📄 Licença

MIT

---

**Template desenvolvido seguindo as melhores práticas de engenharia de software, arquitetura escalável e código limpo.**
