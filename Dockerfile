# Usa uma imagem Node para instalar dependências e rodar o 'npm run build'.
FROM node:20-alpine AS build
WORKDIR /app

# Copia manifestos e instala dependências para aproveitar o cache (se dependências não mudarem)
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copia o código-fonte
COPY . .
RUN npm run build 

FROM nginx:alpine
# Copia o output estático gerado do estágio de build para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração padrão do Nginx para evitar problemas de roteamento 
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expõe a porta padrão do Nginx (80)
EXPOSE 80