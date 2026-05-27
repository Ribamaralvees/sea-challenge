# 🚀 SEA Tecnologia — Frontend Challenge: Guia Completo Passo a Passo

> Stack: **React + TypeScript + Redux Toolkit + Ant Design + React Router + json-server + Axios**

---

## 📋 ÍNDICE

1. [Setup do Projeto](#1-setup-do-projeto)
2. [Estrutura de Pastas](#2-estrutura-de-pastas)
3. [Configurações Iniciais](#3-configurações-iniciais)
4. [Backend Fake com json-server](#4-backend-fake-com-json-server)
5. [Tipos TypeScript](#5-tipos-typescript)
6. [Redux Store](#6-redux-store)
7. [Serviço de API (Axios)](#7-serviço-de-api-axios)
8. [Componentes de Layout](#8-componentes-de-layout)
9. [Componente Stepper](#9-componente-stepper)
10. [Tela Principal: Lista de Funcionários](#10-tela-principal-lista-de-funcionários)
11. [Formulário: Adicionar Funcionário](#11-formulário-adicionar-funcionário)
12. [Rodapé com Toggle de Etapa](#12-rodapé-com-toggle-de-etapa)
13. [Página "Em Breve"](#13-página-em-breve)
14. [Roteamento (App.tsx)](#14-roteamento-apptsx)
15. [Estilos Globais](#15-estilos-globais)
16. [Checklist Final](#16-checklist-final)

---

## 1. Setup do Projeto

### 1.1 Criar o projeto com Vite

```bash
npm create vite@latest sea-challenge -- --template react-ts
cd sea-challenge
```

### 1.2 Instalar todas as dependências

```bash
# Dependências principais
npm install antd @ant-design/icons
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
npm install axios
npm install json-server

# Tipos (se necessário)
npm install -D @types/react-router-dom
```

### 1.3 Adicionar scripts no package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "server": "json-server --watch db.json --port 3001",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\""
  }
}
```

> Instale o concurrently: `npm install -D concurrently`

---

## Estrutura de Pastas

```
sea-challenge/
├── db.json                        ← Backend fake
├── public/
└── src/
    ├── main.tsx                   ← Entry point
    ├── App.tsx                    ← Rotas
    ├── types/
    │   └── index.ts               ← Interfaces TypeScript
    ├── store/
    │   ├── index.ts               ← Configura a store Redux
    │   └── slices/
    │       ├── employeeSlice.ts   ← CRUD de funcionários
    │       └── stepSlice.ts       ← Estado das etapas
    ├── services/
    │   └── api.ts                 ← Axios + chamadas HTTP
    ├── components/
    │   ├── layout/
    │   │   ├── MainLayout.tsx     ← Layout geral (sidebar + conteúdo)
    │   │   └── Sidebar.tsx        ← Barra lateral com ícones
    │   ├── stepper/
    │   │   └── StepperBar.tsx     ← Barra de progresso no topo
    │   ├── employee/
    │   │   ├── EmployeeList.tsx   ← Lista de funcionários
    │   │   ├── EmployeeCard.tsx   ← Card individual
    │   │   └── EmployeeForm.tsx   ← Formulário add/edit
    │   ├── common/
    │   │   ├── StepFooter.tsx     ← Toggle "etapa concluída" + botão
    │   │   └── EmBreve.tsx        ← Página placeholder
    │   └── info/
    │       └── InfoPanel.tsx      ← Painel esquerdo com texto
    └── pages/
        ├── Step1Page.tsx          ← Página da etapa 1 (funcionários)
        └── EmBrevePage.tsx        ← Páginas de etapas futuras
```

---

## Checklist Final

### ✅ Requisitos do desafio

| Requisito | Status |
|-----------|--------|
| React + TypeScript | ✅ Vite + TSX |
| Pixel perfect / responsivo | ✅ CSS fiel ao Figma |
| Estado global com framework | ✅ Redux Toolkit |
| GitHub privado | 📌 Você adiciona |
| Biblioteca de estilos | ✅ Ant Design |
| Redux (abstração correta) | ✅ Slices + Thunks |
| Formulário com validações | ✅ Ant Design Form + rules |
| Adicionar EPI | ✅ Dinâmico |
| Adicionar Atividade | ✅ Dinâmico |
| Persistir informações | ✅ json-server + PATCH/PUT |
| Estado da etapa (concluída?) | ✅ Toggle no footer + PATCH |
| Funcionar nos principais browsers | ✅ Vite build padrão |
| Email no GitHub | 📌 Settings > Collaborators |
| json-server (diferencial) | ✅ Configurado |
| Links para todas as etapas | ✅ React Router |
| "Em breve" nas outras etapas | ✅ EmBreve component |
| Editar funcionário (ellipsis) | ✅ Dropdown menu + openEditForm |

### 🏃 Comandos para rodar

```bash
# Terminal 1: Backend
npm run server   # http://localhost:3001

# Terminal 2: Frontend
npm run dev      # http://localhost:5173

# Ou ambos juntos:
npm run dev:all
```

### 🎯 Dica final

No README.md do repositório, explique:
1. Como rodar o projeto
2. Quais foram suas decisões técnicas
3. O que você melhoraria com mais tempo

Isso demonstra maturidade técnica e é muito valorizado por recrutadores sênior.

---

*Guia gerado para o Desafio Frontend SEA Tecnologia — Boa sorte no processo seletivo! 🚀*
