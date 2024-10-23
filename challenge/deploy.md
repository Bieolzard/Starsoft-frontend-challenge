Deploy - StarSoft Frontend Challenge
Este documento contém instruções para realizar o deploy do projeto StarSoft Frontend Challenge, desenvolvido em Next.js.

Repositório
[Starsoft Frontend Challenge](https://github.com/Bieolzard/Starsoft-frontend-challenge)

1. Pré-requisitos
Antes de iniciar o processo de deploy, verifique se possui os seguintes itens:

Node.js (versão 18 ou superior)
Git: Para clonar o repositório e versionar as alterações.
Servidor Web: Como Vercel, Netlify ou outro de sua escolha para hospedar a aplicação Next.js.

Deploy Manual (Em Servidores Próprios)
    Passo 1: Clonar o Repositório
        git clone https://github.com/Bieolzard/Starsoft-frontend-challenge.git
        cd challenge

    Passo 2: Instalar as Dependências
        npm install

    Passo 3: Build da Aplicação
        Gere a build da aplicação Next.js:
        npm run build

    Passo 4: Iniciar a Aplicação
        Inicie a aplicação com o comando:
        npm start
        A aplicação estará disponível em http://localhost:3000.

Deploy Automático (Usando Vercel)
    A forma mais simples de realizar o deploy de uma aplicação Next.js é utilizando a Vercel.

    Passo 1: Conectar Repositório ao Vercel
        Acesse Vercel e faça login.
        Clique em New Project e conecte seu repositório GitHub.
        Siga as instruções para configurar o projeto.

    Passo 2: Configurar Variáveis de Ambiente
        Na aba de configurações do projeto na Vercel, adicione as variáveis de ambiente necessárias, como NEXT_PUBLIC_API_URL e JWT_SECRET.

    Passo 3: Deploy
        Após configurar o projeto e as variáveis de ambiente, clique em Deploy. A Vercel irá automaticamente construir e implantar sua aplicação.

    Passo 4: Acesso à Aplicação
        Quando o processo de deploy estiver concluído, a Vercel fornecerá uma URL pública onde sua aplicação estará disponível.
