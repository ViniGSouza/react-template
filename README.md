# Agisales - Plataforma de Gestão de Propostas

Uma plataforma moderna e escalável para gestão de propostas comerciais, desenvolvida com as melhores práticas de engenharia de software.

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
- **Shadcn/ui** - Componentes UI reutilizáveis
- **Recharts** - Biblioteca de gráficos

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Schema validation

### Testes
- **Vitest** - Test runner
- **React Testing Library** - Testes de componentes
- **MSW (Mock Service Worker)** - Mock de API

### Utilitários
- **date-fns** - Manipulação de datas
- **clsx + tailwind-merge** - Gerenciamento de classes CSS

## 📁 Arquitetura do Projeto

O projeto segue uma arquitetura baseada em **Domain-Driven Design (DDD)** adaptada para frontend, com separação clara de responsabilidades:

\`\`\`
src/
├── domain/                 # Módulos de domínio (features)
│   ├── auth/              # Autenticação
│   │   ├── components/    # Componentes específicos
│   │   ├── hooks/         # Hooks customizados
│   │   ├── services/      # Lógica de negócio e adapters
│   │   ├── schemas/       # Validações Zod
│   │   └── types/         # Tipos TypeScript
│   ├── proposals/         # Gestão de propostas
│   └── dashboard/         # Dashboard e métricas
│
├── shared/                # Código compartilhado
│   ├── components/ui/     # Componentes UI reutilizáveis
│   ├── hooks/            # Hooks compartilhados
│   ├── lib/              # Utilitários
│   └── types/            # Tipos compartilhados
│
├── core/                  # Infraestrutura
│   ├── api/              # Cliente HTTP
│   ├── adapters/         # Interfaces de adapters
│   └── storage/          # Gerenciamento de storage
│
├── pages/                 # Páginas da aplicação
├── layouts/              # Layouts compartilhados
├── test/                 # Configuração e mocks de teste
│   ├── mocks/           # Handlers MSW
│   └── fixtures/        # Dados de teste
└── styles/              # Estilos globais
\`\`\`

## 🎯 Padrões de Design Implementados

### Adapter Pattern
Utilizado para abstrair a comunicação com APIs, permitindo trocar facilmente entre implementação mock e real:

\`\`\`typescript
// Interface comum
interface AuthAdapter {
  login(email: string, password: string): Promise<AuthResponse>;
}

// Implementação Mock
class AuthMockAdapter implements AuthAdapter { ... }

// Implementação Real
class AuthApiAdapter implements AuthAdapter { ... }

// Service Factory
class AuthService {
  private adapter: AuthAdapter;
  constructor() {
    this.adapter = USE_MOCK ? new AuthMockAdapter() : new AuthApiAdapter();
  }
}
\`\`\`

### Repository Pattern
Abstraindo a fonte de dados para propostas e usuários.

### Hook Pattern
Encapsulando lógica reutilizável em hooks customizados.

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

\`\`\`bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
\`\`\`

### Variáveis de Ambiente

Crie um arquivo \`.env\` na raiz do projeto:

\`\`\`env
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=true
\`\`\`

- \`VITE_USE_MOCK=true\`: Usa mocks para desenvolvimento sem backend
- \`VITE_USE_MOCK=false\`: Usa API real

## 🧪 Testes

\`\`\`bash
# Executar testes
npm test

# Testes com UI
npm run test:ui

# Testes com coverage
npm run test:coverage
\`\`\`

### Metas de Coverage
- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

## 👥 Funcionalidades

### Autenticação
- Login com e-mail e senha
- Validação com Zod
- Gerenciamento de sessão com localStorage
- Rotas protegidas

**Credenciais de teste:**
- **Vendedor**: vendedor@agisales.com / 123456
- **Gerente**: gerente@agisales.com / 123456

### Dashboard
- KPIs em tempo real:
  - Total de propostas
  - Propostas pendentes
  - Taxa de aprovação
  - Valor total aprovado
- Gráficos:
  - Propostas por mês
  - Top produtos/serviços
  - Distribuição por status

### Gestão de Propostas
- **Vendedor pode:**
  - Criar novas propostas
  - Visualizar suas propostas
  - Editar propostas em rascunho

- **Gerente pode:**
  - Visualizar todas as propostas
  - Aprovar propostas pendentes
  - Rejeitar propostas pendentes

## 🏗️ Princípios Aplicados

### Clean Code
- Nomenclatura descritiva
- Funções pequenas e focadas
- Comentários apenas quando necessário
- DRY (Don't Repeat Yourself)

### Clean Architecture
- Separação de camadas
- Inversão de dependências
- Independência de frameworks
- Testabilidade

### SOLID
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

## 📈 Performance e Otimizações

- **Code Splitting**: Rotas carregadas sob demanda
- **Query Caching**: TanStack Query com cache inteligente
- **Memoization**: Hooks com useMemo e useCallback quando necessário
- **Lazy Loading**: Componentes carregados sob demanda

## 🔒 Segurança

- Validação de formulários no client e server
- Sanitização de inputs
- Tokens de autenticação em localStorage
- Rotas protegidas
- CORS configurado

## 🚀 Próximos Passos

### Backend Integration
Quando o backend estiver pronto, basta alterar a variável de ambiente:

\`\`\`env
VITE_USE_MOCK=false
VITE_API_URL=https://api.agisales.com
\`\`\`

Os adapters estão prontos para consumir a API real sem necessidade de alterações no código de negócio.

### Melhorias Futuras
- [ ] Notificações em tempo real (WebSocket)
- [ ] Exportação de relatórios (PDF, Excel)
- [ ] Filtros avançados e busca
- [ ] Histórico de alterações
- [ ] Multi-idioma (i18n)
- [ ] Dark mode
- [ ] PWA (Progressive Web App)
- [ ] E2E tests com Playwright

## 📝 Scripts Disponíveis

\`\`\`json
{
  "dev": "Inicia servidor de desenvolvimento",
  "build": "Compila para produção",
  "preview": "Preview da build de produção",
  "test": "Executa testes",
  "test:ui": "Executa testes com UI",
  "test:coverage": "Executa testes com coverage",
  "lint": "Executa linter"
}
\`\`\`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ seguindo as melhores práticas de engenharia de software.

---

**Observação**: Este projeto foi desenvolvido como uma base escalável e de fácil manutenção. A arquitetura permite adicionar novas features sem comprometer a estrutura existente.
