# Guia de Configuração Rápida - Agisales

## 🚀 Início Rápido

### 1. Instalar Dependências

\`\`\`bash
npm install
\`\`\`

### 2. Configurar Variáveis de Ambiente

O projeto já vem com um arquivo \`.env\` padrão, mas você pode personalizá-lo:

\`\`\`env
VITE_API_URL=http://localhost:3000/api
VITE_USE_MOCK=true # true para usar mocks, false para API real
\`\`\`

### 3. Executar em Desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

A aplicação estará disponível em: **http://localhost:5173**

### 4. Credenciais de Acesso

#### Vendedor

- **E-mail:** vendedor@agisales.com
- **Senha:** 123456
- **Permissões:** Criar e visualizar propostas

#### Gerente

- **E-mail:** gerente@agisales.com
- **Senha:** 123456
- **Permissões:** Visualizar todas as propostas, aprovar e rejeitar

## 🧪 Executar Testes

\`\`\`bash

# Testes com watch mode

npm test

# Testes com UI interativa

npm run test:ui

# Testes com coverage

npm run test:coverage
\`\`\`

## 📦 Build para Produção

\`\`\`bash

# Build

npm run build

# Preview da build

npm run preview
\`\`\`

## 🔧 Estrutura de Pastas Principais

\`\`\`
src/
├── domain/ # Módulos de domínio (auth, proposals, dashboard)
├── shared/ # Código compartilhado
├── core/ # Infraestrutura (API, storage, adapters)
├── pages/ # Páginas da aplicação
└── layouts/ # Layouts compartilhados
\`\`\`

## 🔄 Alternar entre Mock e API Real

### Usando Mocks (padrão)

Bom para desenvolvimento sem backend:
\`\`\`env
VITE_USE_MOCK=true
\`\`\`

### Usando API Real

Quando o backend estiver disponível:
\`\`\`env
VITE_USE_MOCK=false
VITE_API_URL=https://sua-api.com/api
\`\`\`

**Importante:** Graças ao Adapter Pattern, não é necessário alterar código, apenas a variável de ambiente!

## 📱 Funcionalidades Disponíveis

### Dashboard

- Métricas em tempo real
- Gráficos de propostas por mês
- Top produtos/serviços
- Taxa de aprovação

### Propostas

- Criar nova proposta (Vendedor)
- Visualizar propostas
- Aprovar/Rejeitar (Gerente)
- Filtrar por status

### Autenticação

- Login com e-mail/senha
- Rotas protegidas
- Controle de permissões por perfil

## 🛠️ Tecnologias

- React 19 + TypeScript
- Vite
- TailwindCSS v4 + Shadcn/ui
- TanStack Query
- React Hook Form + Zod
- Recharts
- Vitest + RTL + MSW

## 💡 Dicas

### Dados Persistidos

Os dados mockados são salvos no `localStorage`, então suas alterações persistem entre reloads.

### Limpar Dados

Para resetar os dados mockados:
\`\`\`javascript
localStorage.clear()
// ou
localStorage.removeItem('agisales_proposals')
\`\`\`

### DevTools

- **React Query DevTools**: Disponível no canto inferior esquerdo
- **Vitest UI**: \`npm run test:ui\`

## 🐛 Troubleshooting

### Erro ao iniciar

\`\`\`bash

# Limpar node_modules e reinstalar

rm -rf node_modules package-lock.json
npm install
\`\`\`

### Testes falhando

\`\`\`bash

# Limpar cache do Vitest

npx vitest --clearCache
\`\`\`

### Build falhando

\`\`\`bash

# Verificar erros de tipo

npx tsc --noEmit
\`\`\`

## 📚 Documentação Adicional

- [README.md](./README.md) - Documentação completa
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Shadcn/ui](https://ui.shadcn.com/)

## 🤝 Suporte

Para dúvidas ou problemas, consulte o README.md ou abra uma issue no repositório.

---

**Happy Coding! 🚀**
