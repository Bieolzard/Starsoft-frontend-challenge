# Usar a imagem base oficial do Node.js
FROM node:16-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
