# 🏗️ Arquitetura Final - Organizada e Profissional

**Data:** 04 de outubro de 2025  
**Status:** ✅ FINALIZADA  
**Testes:** ✅ 29/29 passando

---

## 📁 Estrutura Final do Projeto

```
src/
├── api/                          ← Configuração Axios
│   ├── apiConfig.ts              ← Cliente axios + interceptors
│   └── index.ts
│
├── domain/                       ← Módulos de Domínio (DDD)
│   ├── auth/
│   │   ├── api/                  ← API Layer
│   │   │   ├── authApi.ts
│   │   │   └── index.ts
│   │   ├── services/             ← Service Layer (Use Cases)
│   │   │   ├── authService.ts
│   │   │   └── index.ts
│   │   ├── types/                ← Types do domínio
│   │   │   ├── authTypes.ts
│   │   │   └── index.ts
│   │   ├── components/           ← React Components
│   │   │   ├── LoginForm.tsx
│   │   │   └── index.ts
│   │   ├── hooks/                ← Custom Hooks
│   │   │   ├── useAuth.ts
│   │   │   └── index.ts
│   │   ├── schemas/              ← Validações (Zod)
│   │   │   ├── login.schema.ts
│   │   │   └── index.ts
│   │   ├── __tests__/            ← Testes
│   │   │   └── authService.test.ts
│   │   └── index.ts              ← Barrel Export do módulo
│   │
│   ├── proposals/
│   │   ├── api/
│   │   │   ├── proposalsApi.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── proposalsService.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   ├── components/
│   │   │   ├── ProposalCard.tsx
│   │   │   ├── ProposalForm.tsx
│   │   │   ├── ProposalsList.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useProposals.ts
│   │   │   └── index.ts
│   │   ├── schemas/
│   │   │   ├── proposal.schema.ts
│   │   │   └── index.ts
│   │   ├── __tests__/
│   │   │   └── proposalsService.test.ts
│   │   └── index.ts
│   │
│   └── dashboard/
│       ├── api/
│       │   ├── dashboardApi.ts
│       │   └── index.ts
│       ├── services/
│       │   ├── dashboardService.ts
│       │   └── index.ts
│       ├── components/
│       │   ├── DashboardView.tsx
│       │   ├── MetricCard.tsx
│       │   ├── ProposalsChart.tsx
│       │   ├── TopProductsChart.tsx
│       │   └── index.ts
│       ├── hooks/
│       │   ├── useDashboard.ts
│       │   └── index.ts
│       └── index.ts
│
├── providers/                    ← Providers centralizados
│   ├── AppProviders.tsx
│   └── index.ts
│
├── routes/                       ← Rotas centralizadas
│   └── index.tsx
│
├── core/                         ← Utilitários Core
│   ├── storage/
│   │   └── index.ts
│   ├── store/
│   │   ├── theme.store.ts
│   │   ├── notifications.store.ts
│   │   └── index.ts
│   └── index.ts
│
├── shared/                       ← Código compartilhado
│   ├── components/
│   │   ├── ui/                   ← Shadcn/ui components
│   │   ├── ProtectedRoute.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── NotificationsDropdown.tsx
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
│
├── pages/                        ← Páginas
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── ProposalsPage.tsx
│   └── index.ts
│
├── layouts/                      ← Layouts
│   ├── AppLayout.tsx
│   ├── Sidebar.tsx
│   └── index.ts
│
├── test/                         ← Configuração de testes
│   ├── fixtures/
│   │   └── proposals.fixture.ts
│   ├── mocks/
│   │   ├── browser.ts
│   │   └── handlers.ts
│   └── setup.ts
│
├── styles/                       ← Estilos globais
│   └── globals.css
│
└── App.tsx                       ← App Component (10 linhas!)
```

---

## 🎯 Organização por Camadas

### **1. API Layer** (`domain/*/api/`)

**Responsabilidade:** Apenas requisições HTTP

```typescript
// domain/auth/api/authApi.ts
import { api } from "@/api";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
};
```

**Características:**

- ✅ Usa axios
- ✅ Apenas HTTP calls
- ✅ Retorna `response.data`
- ✅ Sem lógica de negócio
- ✅ Sem storage

---

### **2. Service Layer** (`domain/*/services/`)

**Responsabilidade:** Lógica de negócio (Use Cases)

```typescript
// domain/auth/services/authService.ts
import { authApi } from "../api/authApi";
import { storage } from "@/core/storage";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const authService = {
  login: async (email: string, password: string) => {
    // Decide entre mock ou API real
    const response = USE_MOCK
      ? await mockLogin({ email, password })
      : await authApi.login({ email, password });

    // Business logic: salva no storage
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
- ✅ Mock/Real switch
- ✅ Validações

---

### **3. Types Layer** (`domain/*/types/`)

**Responsabilidade:** TypeScript types e interfaces

```typescript
// domain/auth/types/authTypes.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
```

---

### **4. Hooks Layer** (`domain/*/hooks/`)

**Responsabilidade:** React integration (React Query)

```typescript
// domain/auth/hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/authService";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authService.getMe(),
  });
};
```

---

### **5. Components Layer** (`domain/*/components/`)

**Responsabilidade:** React components específicos do domínio

```typescript
// domain/auth/components/LoginForm.tsx
import { useAuth } from "../hooks/useAuth";
import { loginSchema } from "../schemas/login.schema";

export const LoginForm = () => {
  const { login } = useAuth();
  // ... component logic
};
```

---

### **6. Schemas Layer** (`domain/*/schemas/`)

**Responsabilidade:** Validações com Zod

```typescript
// domain/auth/schemas/login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
```

---

### **7. Tests Layer** (`domain/*/__tests__/`)

**Responsabilidade:** Testes unitários e integração

```typescript
// domain/auth/__tests__/authService.test.ts
import { describe, it, expect } from "vitest";
import { authService } from "../services/authService";

describe("Auth Service", () => {
  it("deve fazer login com credenciais válidas", async () => {
    const result = await authService.login("test@email.com", "123456");
    expect(result).toHaveProperty("token");
  });
});
```

---

## 🎨 Fluxo de Dados (Data Flow)

### Exemplo: Login

```
User Action (Click Login)
    ↓
LoginForm Component (components/)
    ↓
useAuth Hook (hooks/)
    ↓
authService.login() (services/)
    ├─→ USE_MOCK ? mockLogin() : authApi.login() (api/)
    └─→ storage.set() (business logic)
    ↓
React Query Cache Update
    ↓
UI Re-render
```

---

## 📦 Barrel Exports (index.ts)

Cada pasta tem um `index.ts` que exporta seus conteúdos:

### Domain Level

```typescript
// domain/auth/index.ts
export * from "./api";
export * from "./services";
export * from "./types";
export * from "./components";
export * from "./hooks";
export * from "./schemas";
```

### Feature Level

```typescript
// domain/auth/api/index.ts
export * from "./authApi";

// domain/auth/services/index.ts
export * from "./authService";

// domain/auth/types/index.ts
export * from "./authTypes";
```

### Uso

```typescript
// Importar tudo do auth
import {
  authApi, // da api/
  authService, // da services/
  LoginRequest, // da types/
  useAuth, // da hooks/
  LoginForm, // da components/
  loginSchema, // da schemas/
} from "@/domain/auth";
```

---

## ✅ Benefícios da Organização

### 1. **Separação Clara de Responsabilidades**

- ✅ Cada pasta tem uma função específica
- ✅ Fácil encontrar arquivos
- ✅ Evita "arquivos soltos"

### 2. **Escalabilidade**

- ✅ Fácil adicionar novos arquivos
- ✅ Padrão consistente
- ✅ Suporta crescimento

### 3. **Manutenibilidade**

- ✅ Código organizado
- ✅ Imports claros
- ✅ Testes próximos ao código

### 4. **Testabilidade**

- ✅ Testes em pasta dedicada `__tests__/`
- ✅ Fácil localizar testes
- ✅ Convenção clara

### 5. **Developer Experience**

- ✅ Navegação fácil
- ✅ Autocomplete melhorado
- ✅ Refactoring seguro

---

## 🔄 Como Adicionar um Novo Módulo

### Passo 1: Criar Estrutura

```bash
mkdir -p src/domain/products/{api,services,types,components,hooks,schemas,__tests__}
```

### Passo 2: API Layer

```typescript
// domain/products/api/productsApi.ts
import { api } from "@/api";

export const productsApi = {
  getAll: async () => {
    const response = await api.get("/products");
    return response.data;
  },
};
```

### Passo 3: Service Layer

```typescript
// domain/products/services/productsService.ts
import { productsApi } from "../api/productsApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const productsService = {
  getAll: async () => {
    return USE_MOCK ? await mockGetAll() : await productsApi.getAll();
  },
};
```

### Passo 4: Hook Layer

```typescript
// domain/products/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { productsService } from "../services/productsService";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getAll(),
  });
};
```

### Passo 5: Barrel Exports

```typescript
// domain/products/api/index.ts
export * from "./productsApi";

// domain/products/services/index.ts
export * from "./productsService";

// domain/products/hooks/index.ts
export * from "./useProducts";

// domain/products/index.ts
export * from "./api";
export * from "./services";
export * from "./hooks";
export * from "./components";
```

---

## 📊 Comparação: Antes vs Depois

| Aspecto            | Antes                       | Depois                        |
| ------------------ | --------------------------- | ----------------------------- |
| **Organização**    | Arquivos soltos             | Pastas organizadas            |
| **API**            | authApi.ts (solto)          | api/authApi.ts                |
| **Service**        | authService.ts (solto)      | services/authService.ts       |
| **Types**          | authTypes.ts (solto)        | types/authTypes.ts            |
| **Tests**          | authService.test.ts (solto) | **tests**/authService.test.ts |
| **Navegação**      | Confusa                     | Clara e intuitiva             |
| **Escalabilidade** | Limitada                    | Alta                          |
| **Manutenção**     | Difícil                     | Fácil                         |

---

## 🧪 Testes - 100% Passando

```bash
✓ src/lib/utils.test.ts (5 tests)
✓ src/shared/components/ui/button.test.tsx (5 tests)
✓ src/domain/auth/__tests__/authService.test.ts (7 tests)
✓ src/domain/proposals/__tests__/proposalsService.test.ts (12 tests)

Test Files  4 passed (4)
Tests       29 passed (29)
Duration    9.71s
```

---

## 🎯 Convenções Estabelecidas

### Nomenclatura

- **API:** `*Api.ts` (ex: `authApi.ts`)
- **Service:** `*Service.ts` (ex: `authService.ts`)
- **Types:** `*Types.ts` (ex: `authTypes.ts`)
- **Hook:** `use*.ts` (ex: `useAuth.ts`)
- **Component:** `*.tsx` (ex: `LoginForm.tsx`)
- **Schema:** `*.schema.ts` (ex: `login.schema.ts`)
- **Test:** `*.test.ts` (ex: `authService.test.ts`)
- **Barrel:** `index.ts`

### Estrutura de Pastas

- **api/** - HTTP calls
- **services/** - Business logic
- **types/** - TypeScript types
- **components/** - React components
- **hooks/** - Custom hooks
- **schemas/** - Validations
- ****tests**/** - Unit tests

---

## 📚 Principais Vantagens

### 1. **Organização Profissional**

✅ Cada arquivo tem seu lugar  
✅ Fácil localizar código  
✅ Padrão da indústria

### 2. **Manutenibilidade**

✅ Código limpo e organizado  
✅ Fácil adicionar features  
✅ Refactoring seguro

### 3. **Escalabilidade**

✅ Suporta crescimento do projeto  
✅ Padrão consistente  
✅ Múltiplos desenvolvedores

### 4. **Developer Experience**

✅ Navegação intuitiva  
✅ Autocomplete funciona melhor  
✅ Menos confusão

---

## 🎉 Conclusão

A arquitetura está **100% organizada e profissional**! Cada arquivo está em sua pasta apropriada, seguindo convenções claras e padrões da indústria.

### Checklist Final

- [x] ✅ Arquivos organizados em pastas
- [x] ✅ API em `api/`
- [x] ✅ Services em `services/`
- [x] ✅ Types em `types/`
- [x] ✅ Tests em `__tests__/`
- [x] ✅ Barrel exports em todas as pastas
- [x] ✅ Imports atualizados
- [x] ✅ **29/29 testes passando**
- [x] ✅ Documentação completa

**Arquitetura finalizada com sucesso! 🚀**
