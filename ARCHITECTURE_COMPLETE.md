# 🏗️ Arquitetura Completa do Projeto

**Projeto:** Motor V2 (AgiSales)  
**Data:** 04 de outubro de 2025  
**Status:** ✅ FINALIZADO E FUNCIONANDO  
**Build:** ✅ PASSANDO  
**Testes:** ✅ 29/29 passando

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura de Pastas](#estrutura-de-pastas)
3. [Camadas da Arquitetura](#camadas-da-arquitetura)
4. [Fluxo de Dados](#fluxo-de-dados)
5. [Padrões de Código](#padrões-de-código)
6. [Importações e Exports](#importações-e-exports)
7. [Testes](#testes)
8. [Como Adicionar Features](#como-adicionar-features)

---

## 🎯 Visão Geral

Aplicação React com **Clean Architecture**, **DDD** e padrão **NubbleApp**, usando:

- ⚛️ **React 18** + **TypeScript**
- 🎨 **Tailwind CSS** + **Shadcn/ui**
- 🔄 **React Query** (TanStack Query)
- 🗂️ **Zustand** (Estado Global)
- 🌐 **Axios** (HTTP Client)
- ✅ **Vitest** + **Testing Library**
- 🎯 **Zod** (Validação de Schemas)

---

## 📁 Estrutura de Pastas

```
src/
├── api/                    # 🌐 Configuração do Axios
│   ├── apiConfig.ts       # Instância do Axios + Interceptors
│   └── index.ts           # Barrel export
│
├── core/                   # 🔧 Funcionalidades Core
│   ├── storage/           # LocalStorage wrapper
│   └── store/             # Zustand stores (theme, notifications)
│
├── domain/                 # 🎯 Lógica de Negócio (DDD)
│   ├── auth/
│   │   ├── api/
│   │   │   ├── authApi.ts        # HTTP calls
│   │   │   └── index.ts          # Barrel export
│   │   ├── services/
│   │   │   ├── authService.ts    # Use Cases + Mock
│   │   │   └── index.ts          # Barrel export
│   │   ├── types/
│   │   │   ├── authTypes.ts      # Type definitions
│   │   │   └── index.ts          # Barrel export
│   │   ├── hooks/
│   │   │   ├── useAuth.ts        # React Query hook
│   │   │   └── index.ts          # Barrel export
│   │   ├── components/
│   │   │   ├── LoginForm.tsx     # UI component
│   │   │   └── index.ts          # Barrel export
│   │   ├── schemas/
│   │   │   ├── login.schema.ts   # Zod validation
│   │   │   └── index.ts          # Barrel export
│   │   ├── __tests__/
│   │   │   └── authService.test.ts
│   │   └── index.ts               # Domain barrel export
│   │
│   ├── proposals/
│   │   ├── api/
│   │   ├── services/
│   │   ├── types/
│   │   ├── hooks/
│   │   ├── components/
│   │   ├── schemas/
│   │   ├── __tests__/
│   │   └── index.ts
│   │
│   └── dashboard/
│       ├── api/
│       ├── services/
│       ├── hooks/
│       ├── components/
│       └── index.ts
│
├── shared/                 # 🔗 Código Compartilhado
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/           # Shadcn/ui components
│   │   └── ...
│   └── types/            # Tipos compartilhados
│
├── layouts/               # 📐 Layouts da Aplicação
│   ├── AppLayout.tsx
│   └── Sidebar.tsx
│
├── pages/                 # 📄 Páginas
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProposalsPage.tsx
│   └── index.ts
│
├── providers/             # 🎭 Providers React
│   ├── AppProviders.tsx  # Todos os providers centralizados
│   └── index.ts
│
├── routes/                # 🛣️ Rotas
│   └── index.tsx         # Todas as rotas centralizadas
│
├── test/                  # 🧪 Setup de Testes
│   ├── fixtures/
│   ├── mocks/
│   └── setup.ts
│
├── App.tsx               # App principal
└── main.tsx              # Entry point
```

---

## 🏛️ Camadas da Arquitetura

### 1. **API Layer** (`domain/*/api/`)

**Responsabilidade:** Apenas requisições HTTP usando Axios.

```typescript
// domain/auth/api/authApi.ts
import { api } from "@/api";
import type { LoginRequest, LoginResponse } from "../types/authTypes";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
};
```

**Características:**

- ✅ Usa axios configurado
- ✅ Apenas HTTP calls
- ✅ Retorna dados brutos
- ✅ Importa tipos de `../types`

---

### 2. **Service Layer** (`domain/*/services/`)

**Responsabilidade:** Lógica de negócio (Use Cases) + Mock

```typescript
// domain/auth/services/authService.ts
import { authApi } from "../api/authApi";
import type { LoginRequest, LoginResponse } from "../types/authTypes";
import { storage } from "@/core/storage";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const data = { email, password };

    // Mock ou API real
    const response = USE_MOCK
      ? await mockLogin(data)
      : await authApi.login(data);

    // Lógica de negócio
    storage.set("token", response.token);
    storage.set("user", response.user);

    return response;
  },
};
```

**Características:**

- ✅ Orquestra API calls
- ✅ Contém lógica de negócio
- ✅ Gerencia storage
- ✅ Implementa mock
- ✅ Switch entre mock e API real

---

### 3. **Types Layer** (`domain/*/types/`)

**Responsabilidade:** Definições de tipos TypeScript

```typescript
// domain/auth/types/authTypes.ts
import type { User } from "@/shared/types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
```

**Características:**

- ✅ Tipos centralizados
- ✅ Exportados via barrel
- ✅ Reutilizáveis

---

### 4. **Hooks Layer** (`domain/*/hooks/`)

**Responsabilidade:** React integration com React Query

```typescript
// domain/auth/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
  });

  return { login: loginMutation };
};
```

**Características:**

- ✅ Usa React Query
- ✅ Gerencia loading/error
- ✅ Cache automático
- ✅ Integra service layer

---

### 5. **Components Layer** (`domain/*/components/`)

**Responsabilidade:** UI components específicos do domínio

```typescript
// domain/auth/components/LoginForm.tsx
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schemas/login.schema";

export const LoginForm = () => {
  const { login } = useAuth();

  const onSubmit = (data) => {
    login.mutate(data);
  };

  return <form onSubmit={onSubmit}>...</form>;
};
```

---

### 6. **Schemas Layer** (`domain/*/schemas/`)

**Responsabilidade:** Validações com Zod

```typescript
// domain/auth/schemas/login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
```

---

### 7. **Tests Layer** (`domain/*/__tests__/`)

**Responsabilidade:** Testes unitários e integração

```typescript
// domain/auth/__tests__/authService.test.ts
import { describe, it, expect } from "vitest";
import { authService } from "../services/authService";

describe("Auth Service", () => {
  it("deve fazer login com credenciais válidas", async () => {
    const result = await authService.login("test@test.com", "123456");
    expect(result.token).toBeDefined();
  });
});
```

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                    USER ACTION (Click Login)                 │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  COMPONENT (LoginForm.tsx)                                   │
│  - Captura dados do formulário                               │
│  - Valida com Zod schema                                     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  HOOK (useAuth.ts)                                           │
│  - React Query mutation                                      │
│  - Gerencia loading/error/success                            │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  SERVICE (authService.ts)                                    │
│  - Decide mock ou API real                                   │
│  - Implementa lógica de negócio                              │
│  - Salva no storage                                          │
└─────────┬──────────────────────────────────────┬────────────┘
          │                                      │
    (Mock)│                                      │(Real API)
          ▼                                      ▼
┌──────────────────────┐            ┌──────────────────────────┐
│  MOCK DATA           │            │  API (authApi.ts)        │
│  - Dados simulados   │            │  - Axios HTTP call       │
│  - Delay artificial  │            │  - POST /auth/login      │
└──────────────────────┘            └──────────────────────────┘
                                                 │
                                                 ▼
                                    ┌──────────────────────────┐
                                    │  BACKEND API             │
                                    │  - Processa requisição   │
                                    │  - Retorna resposta      │
                                    └──────────────────────────┘
```

---

## 📝 Padrões de Código

### Nomenclatura

#### Arquivos

- **API:** `*Api.ts` (ex: `authApi.ts`, `proposalsApi.ts`)
- **Service:** `*Service.ts` (ex: `authService.ts`)
- **Types:** `*Types.ts` (ex: `authTypes.ts`)
- **Hook:** `use*.ts` (ex: `useAuth.ts`)
- **Component:** `PascalCase.tsx` (ex: `LoginForm.tsx`)
- **Schema:** `*.schema.ts` (ex: `login.schema.ts`)
- **Test:** `*.test.ts` (ex: `authService.test.ts`)

#### Exports

- **Barrel Export:** Sempre criar `index.ts` em cada pasta
- **Named Exports:** Preferir `export const` ao invés de `export default`

---

### Estrutura de Pastas por Feature

```
domain/feature/
├── api/              # HTTP calls
├── services/         # Business logic
├── types/            # Type definitions
├── hooks/            # Custom hooks
├── components/       # UI components
├── schemas/          # Validations
├── __tests__/        # Tests
└── index.ts          # Barrel export
```

---

## 📦 Importações e Exports

### Barrel Exports (index.ts)

#### Feature Level (api, services, types)

```typescript
// domain/auth/api/index.ts
export { authApi } from "./authApi";
```

#### Domain Level

```typescript
// domain/auth/index.ts
export * from "./api";
export * from "./services";
export * from "./types";
export * from "./hooks";
export * from "./components";
export * from "./schemas";
```

### Como Importar

#### Importar do Domínio

```typescript
import { authApi, authService, LoginRequest } from "@/domain/auth";
```

#### Importar Específico

```typescript
import { authApi } from "@/domain/auth/api";
import { authService } from "@/domain/auth/services";
import { LoginRequest } from "@/domain/auth/types";
```

---

## 🧪 Testes

### Estrutura

```
domain/auth/__tests__/
└── authService.test.ts
```

### Padrão de Teste

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { authService } from "../services/authService";
import { storage } from "@/core/storage";

describe("Auth Service", () => {
  beforeEach(() => {
    storage.clear();
  });

  describe("login", () => {
    it("deve fazer login com credenciais válidas", async () => {
      const result = await authService.login("vendedor@agisales.com", "123456");

      expect(result.token).toBeDefined();
      expect(result.user.email).toBe("vendedor@agisales.com");
    });

    it("deve lançar erro com credenciais inválidas", async () => {
      await expect(
        authService.login("wrong@email.com", "wrongpass")
      ).rejects.toThrow("Credenciais inválidas");
    });
  });
});
```

### Executar Testes

```bash
npm run test           # Roda todos os testes
npm run test:ui        # Interface visual
npm run test:coverage  # Com coverage
```

---

## ➕ Como Adicionar Features

### Passo 1: Criar Estrutura

```bash
mkdir -p src/domain/novaFeature/{api,services,types,hooks,components,schemas,__tests__}
```

### Passo 2: API Layer

```typescript
// domain/novaFeature/api/novaFeatureApi.ts
import { api } from "@/api";

export const novaFeatureApi = {
  getData: async () => {
    const response = await api.get("/nova-feature");
    return response.data;
  },
};

// domain/novaFeature/api/index.ts
export { novaFeatureApi } from "./novaFeatureApi";
```

### Passo 3: Types Layer

```typescript
// domain/novaFeature/types/novaFeatureTypes.ts
export interface Data {
  id: string;
  name: string;
}

// domain/novaFeature/types/index.ts
export * from "./novaFeatureTypes";
```

### Passo 4: Service Layer

```typescript
// domain/novaFeature/services/novaFeatureService.ts
import { novaFeatureApi } from "../api/novaFeatureApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

const mockGetData = async () => {
  // Mock implementation
};

export const novaFeatureService = {
  getData: async () => {
    return USE_MOCK ? await mockGetData() : await novaFeatureApi.getData();
  },
};

// domain/novaFeature/services/index.ts
export { novaFeatureService } from "./novaFeatureService";
```

### Passo 5: Hook Layer

```typescript
// domain/novaFeature/hooks/useNovaFeature.ts
import { useQuery } from "@tanstack/react-query";
import { novaFeatureService } from "../services/novaFeatureService";

export const useNovaFeature = () => {
  return useQuery({
    queryKey: ["novaFeature"],
    queryFn: () => novaFeatureService.getData(),
  });
};

// domain/novaFeature/hooks/index.ts
export { useNovaFeature } from "./useNovaFeature";
```

### Passo 6: Component Layer

```typescript
// domain/novaFeature/components/NovaFeatureView.tsx
import { useNovaFeature } from "../hooks/useNovaFeature";

export const NovaFeatureView = () => {
  const { data, isLoading } = useNovaFeature();

  if (isLoading) return <div>Loading...</div>;

  return <div>{/* UI */}</div>;
};

// domain/novaFeature/components/index.ts
export { NovaFeatureView } from "./NovaFeatureView";
```

### Passo 7: Barrel Export do Domínio

```typescript
// domain/novaFeature/index.ts
export * from "./api";
export * from "./services";
export * from "./types";
export * from "./hooks";
export * from "./components";
```

### Passo 8: Criar Página

```typescript
// pages/NovaFeaturePage.tsx
import { NovaFeatureView } from "@/domain/novaFeature";

export const NovaFeaturePage = () => {
  return <NovaFeatureView />;
};
```

### Passo 9: Adicionar Rota

```typescript
// routes/index.tsx
import { NovaFeaturePage } from "@/pages";

<Route path="nova-feature" element={<NovaFeaturePage />} />;
```

### Passo 10: Escrever Testes

```typescript
// domain/novaFeature/__tests__/novaFeatureService.test.ts
import { describe, it, expect } from "vitest";
import { novaFeatureService } from "../services/novaFeatureService";

describe("Nova Feature Service", () => {
  it("deve retornar dados", async () => {
    const result = await novaFeatureService.getData();
    expect(result).toBeDefined();
  });
});
```

---

## ✅ Checklist para Nova Feature

- [ ] Estrutura de pastas criada
- [ ] API layer implementada
- [ ] Types definidos
- [ ] Service layer com mock
- [ ] Hook com React Query
- [ ] Component criado
- [ ] Barrel exports configurados
- [ ] Página criada
- [ ] Rota adicionada
- [ ] Testes escritos
- [ ] Testes passando
- [ ] Build passando
- [ ] Documentação atualizada

---

## 🎯 Boas Práticas

### 1. **Sempre Use Barrel Exports**

```typescript
// ✅ BOM
import { authService, LoginRequest } from "@/domain/auth";

// ❌ RUIM
import { authService } from "@/domain/auth/services/authService";
```

### 2. **Mantenha Services Independentes**

```typescript
// ✅ BOM - Service não conhece React
export const authService = {
  login: async (email: string, password: string) => { ... }
};

// ❌ RUIM - Service acoplado ao React
export const useAuthService = () => {
  const [user, setUser] = useState(null);
  ...
};
```

### 3. **Mock Sempre no Service**

```typescript
// ✅ BOM
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const authService = {
  login: async (data) => {
    return USE_MOCK ? await mockLogin(data) : await authApi.login(data);
  },
};
```

### 4. **Tipos Centralizados**

```typescript
// ✅ BOM - Types em types/
// domain/auth/types/authTypes.ts
export interface LoginRequest { ... }

// domain/auth/api/authApi.ts
import type { LoginRequest } from "../types/authTypes";

// ❌ RUIM - Types espalhados
// domain/auth/api/authApi.ts
export interface LoginRequest { ... }
```

### 5. **Testes no **tests**/**

```
// ✅ BOM
domain/auth/__tests__/authService.test.ts

// ❌ RUIM
domain/auth/services/authService.test.ts
```

---

## 📊 Status do Projeto

| Aspecto              | Status      | Observações               |
| -------------------- | ----------- | ------------------------- |
| **Build**            | ✅ Passando | Sem erros TypeScript      |
| **Testes**           | ✅ 29/29    | 100% passando             |
| **Coverage**         | ✅ 80%+     | Boa cobertura             |
| **Organização**      | ✅ Limpo    | Estrutura consistente     |
| **Documentação**     | ✅ Completa | Bem documentado           |
| **Escalabilidade**   | ✅ Alta     | Fácil adicionar features  |
| **Manutenibilidade** | ✅ Alta     | Código limpo e organizado |

---

## 🚀 Próximos Passos Sugeridos

1. **Adicionar Error Boundaries**
2. **Implementar CI/CD com GitHub Actions**
3. **Adicionar Husky + Lint-Staged**
4. **Implementar Logger Service**
5. **Adicionar Commitlint**
6. **Melhorar Feature Flags**
7. **Adicionar Monitoring (Sentry)**

---

**Status Final:** 🎉 **ARQUITETURA COMPLETA E FUNCIONANDO PERFEITAMENTE!**
