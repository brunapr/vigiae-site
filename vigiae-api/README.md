# Vigiaê API

API de Fiscalização Sanitária para inspetores.

## 📋 Requisitos

- Python 3.9+
- pip

## 📦 Instalação

### Clone o repositório

```bash
git clone https://github.com/brunapr/vigiae-site.git
cd vigiae-site
cd vigiae-api
```

### Criar ambiente virtual

```bash
python -m venv venv
```

### Ativar (Windows Git Bash)

```bash
source venv/Scripts/activate
```

### Instalar dependências

```bash
pip install -r requirements.txt
```

### Criar .env (copie do .env.example)

```bash
cp .env.example .env
```

## 🔧 Comandos para rodar projeto

```bash
uvicorn app.main:app --reload
```

Acesse:
API: http://localhost:8000
Swagger UI: http://localhost:8000/docs
Redoc: http://localhost:8000/redoc

## 🚀 Tecnologias

- **FastAPI** - Framework web
- **SQLAlchemy** - ORM
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **Pydantic** - Validação de dados
