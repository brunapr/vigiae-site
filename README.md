# Vigiaê

Sistema completo de **Fiscalização Sanitária** para inspetores, com aplicação web moderna e API robusta.

## 📋 Sobre o Projeto

Vigiaê permite que inspetores sanitários:

- Cadastrem e gerenciem inspeções em estabelecimentos comerciais
- Acompanhem status de conformidade (em aberto, pendente, interdições)
- Visualizem histórico de vistorias
- Vejam alertas de fechamento imediato

## 🏗️ Arquitetura

`vigiae-site/`  
`├── vigiae-client/` # Frontend (Next.js + React)  
`└── vigiae-api/` # Backend (FastAPI + SQLite)

## 📦 Pré-requisitos Gerais

- **Node.js** 18+ (para frontend)
- **Python** 3.9+ (para backend)
- **npm** 
- **Git**

## 🏃 Como Rodar o Projeto

Caso você tenha o Docker instalado, apenas use:

```bash
docker compose up 
```

Caso não tenha, cada pasta ensina a servir o back e o front separadamente.
