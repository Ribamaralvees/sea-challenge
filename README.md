# SEA Tecnologia — Desafio Frontend React

Implementação do desafio técnico para a vaga de Desenvolvedor Frontend na SEA Tecnologia.

---

## Sobre o projeto

O desafio consistia em implementar uma interface de gerenciamento de funcionários baseada em um protótipo Figma, com foco em fidelidade visual, boas práticas de React e arquitetura escalável.

O sistema permite cadastrar funcionários com seus dados pessoais, EPIs por atividade e atestado de saúde, tudo dentro de um fluxo de etapas (stepper) com estado persistido.

---

## Stack e decisões técnicas

| Tecnologia | Versão | Por que escolhi |
|---|---|---|
| React | 18 | Base do projeto conforme requisito |
| TypeScript | 5 | Tipagem forte nos slices Redux e nas props dos componentes evitou vários bugs silenciosos durante o desenvolvimento |
| Redux Toolkit | 2 | Requisito explícito do desafio. Usei `createAsyncThunk` para todas as operações assíncronas e `createSlice` para manter os reducers coesos |
| Ant Design | 5 | Recomendado no desafio. Usei principalmente para `Form` com validações, `Switch`, `Select` e `Upload` |
| React Router DOM | 6 | Roteamento declarativo — cada etapa do stepper tem sua própria URL, o que facilita deep linking e o controle de estado ativo |
| Axios | 1.7 | Cliente HTTP com instância configurada para o `baseURL` do json-server |
| json-server | 0.17 | Backend fake com REST completo (GET, POST, PUT, PATCH, DELETE) sem código de servidor |
| Vite | 5 | Build tool mais rápida para o ecossistema React atualmente |

---

## Como rodar localmente

**Pré-requisitos:** Node.js 18+

```bash
# 1. Instalar dependências
npm install

# 2. Rodar backend e frontend juntos
npm run dev:all
```

Ou em terminais separados:

```bash
# Terminal 1 — API fake (http://localhost:3001)
npm run server

# Terminal 2 — Aplicação (http://localhost:5173)
npm run dev
```

---

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/         # MainLayout, Sidebar
│   ├── stepper/        # StepperBar com navegação por URL
│   ├── employee/       # EmployeeList, EmployeeCard, EmployeeForm
│   ├── info/           # InfoPanel com avatar SVG
│   └── common/         # StepFooter, EmBreve
├── pages/              # Step1Page, EmBrevePage
├── store/
│   ├── slices/         # employeeSlice, stepSlice
│   ├── hooks.ts        # useAppDispatch e useAppSelector tipados
│   └── index.ts        # configureStore com RootState e AppDispatch
├── services/
│   └── api.ts          # Instância Axios + employeeService + stepService
└── types/
    └── index.ts        # Interfaces Employee, Step, EpiActivity, EPI
```

---

## Funcionalidades implementadas

- [x] Listagem de funcionários com contagem de ativos
- [x] Filtro "Ver apenas ativos" com estado global
- [x] Cadastro de funcionário com validações (CPF com regex, campos obrigatórios)
- [x] Edição via menu de contexto (ellipsis `...`)
- [x] Exclusão com remoção imediata da lista
- [x] Toggle ativo/inativo no formulário e na listagem
- [x] EPIs dinâmicos por atividade (adicionar múltiplas atividades e EPIs)
- [x] Checkbox "O trabalhador não usa EPI"
- [x] Upload de atestado de saúde (opcional)
- [x] Stepper com 9 etapas navegáveis por URL
- [x] Toggle "A etapa está concluída?" com PATCH no json-server
- [x] Botão "Próximo passo" com navegação sequencial
- [x] Sidebar com 8 itens, estado ativo baseado na rota atual
- [x] Páginas "Em breve" para etapas e itens de menu ainda não implementados
- [x] Persistência completa via json-server (REST API)

---

## Decisões de arquitetura

**Redux apenas para estado global real**
Não usei Redux para estado local de UI (como abrir/fechar um modal simples). O `showForm` e `editingEmployee` estão no slice porque múltiplos componentes precisam reagir a eles. Já o estado de campos do formulário fica no `Form` do Ant Design — misturar isso no Redux seria over-engineering.

**Roteamento reflete o estado da UI**
Cada etapa tem sua própria URL (`/step/1`, `/step/2`...). Isso significa que o usuário pode compartilhar ou favoritar uma etapa específica, e o botão voltar do browser funciona naturalmente. O `activeIndex` do stepper é derivado da URL em vez do Redux para evitar dessincronização.

**`createAsyncThunk` com tipagem `unknown` no catch**
Segui a recomendação do TypeScript strict: `err: unknown` + helper `getErrMsg(err)` em vez de `err: any`. Pequeno detalhe, mas demonstra atenção com segurança de tipos em código assíncrono.

**SVG inline para o avatar**
O placeholder de avatar é um SVG inline em vez de uma imagem externa. Não cria dependência de asset, escala perfeitamente em qualquer densidade de tela e permite trocar as cores via props quando necessário.

**Serviço de API separado do Redux**
Os `thunks` chamam funções do `employeeService` e `stepService` em vez de usar Axios diretamente. Isso facilita trocar a implementação (por exemplo, de json-server para uma API real) sem tocar nos slices.

---

## O que melhoraria com mais tempo

- **Testes unitários** nos slices Redux com `@testing-library/react` e nos componentes críticos (formulário com validações, lógica de filtro)
- **Máscara de CPF** em tempo real no input em vez de validar só no submit
- **Confirmação antes de excluir** funcionário (modal de confirmação)
- **Paginação ou scroll infinito** na lista para suportar muitos registros
- **Tratamento de erro** mais granular na UI (toast de erro vindo da API, não só de validação de form)
- **Acessibilidade**: `aria-labels` mais descritivos, navegação por teclado no stepper
- **Backend em Node.js** substituindo o json-server, como indicado no diferencial do desafio

---

## Estrutura do `db.json`

```json
{
  "employees": [
    {
      "id": "1",
      "name": "Daniel Alves da Silva",
      "cpf": "000.000.000-99",
      "rg": "1234567",
      "birthDate": "1990-05-10",
      "gender": "masculino",
      "role": "Cargo 1",
      "active": true,
      "epiActivities": [
        {
          "activity": "Atividade 1",
          "epis": [{ "name": "Calçado de segurança", "ca": "9356" }]
        }
      ],
      "healthCertificate": null
    }
  ],
  "steps": [
    { "id": "1", "label": "Item 1", "completed": false }
  ]
}
```

---

*Desenvolvido por José Ribamar — [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-ribamar-01a6b6371/) · [GitHub](https://github.com/Ribamaralvees/)*
