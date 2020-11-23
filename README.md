# Cabeleleila Leila Salão de Beleiza
Prova prática da DSIN feita utilizando as tecnologias Adonis.js (Back-end) e Vue.js 3 (Front-end)

## Instalação
Antes de tudo, baixe e instale o Node.js >= 12

### Back-end 

1. Primeiro, configure o servidor (localizado em `backend/`)

    ```
    $ npm ci
    $ cp .env.example .env
    ```

2. Instale o wrapper do seu banco de dados (veja https://adonisjs.com/docs/4.1/database para mais informações)

3. Configure o arquivo `.env` com a conexão do banco de dados

4. Instale globalmente o pacote `adonis`, ele será o responsável por rodar as migrations/seeds e iniciar o servidor

    ```
    npm i -g adonis
    ```

5. Rode as migrations e seeds

    ```
    adonis migration:refresh
    adonis seed
    ```

6. Inicie o servidor

    ```
    adonis serve --dev
    ```

### Front-end

1. Configure o Front-end (localizado em `frontend/`)

    ```
    $ npm ci
    ```

2. Inicie o mini-servidor do Vue.js
    
    ```
    $ npm run serve
    ```

## Sistema
O login do Administrador é `admin@user.com` e a senha é `password`.

## Insomnia
Na pasta principal do projeto, há um arquivo `Insomnia.json` com todas as rotas do sistema para teste manual
