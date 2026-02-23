FROM node:20-alpine

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o resto do código
COPY . .

# Porta exposta
EXPOSE 3000

# Comando para desenvolvimento
CMD ["sh", "-c", "npm run dev"]