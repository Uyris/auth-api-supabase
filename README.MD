# **Auth API - Supabase + JWT + TypeScript**

API de autenticação construída em **Node.js + Express + TypeScript**, utilizando **Supabase** como banco de dados e **JWT** para autenticação.  
Permite a gestão de usuários (admin/cliente), login seguro, reset de senha em duas etapas e envio de emails via **SMTP customizado**.

---

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Nodemailer](https://nodemailer.com/)
- [dotenv](https://github.com/motdotla/dotenv)

---

## 📂 Estrutura do Projeto
```bash
src/
  controllers/        # Controladores (HTTP)
    authController.ts
    adminController.ts
    clientController.ts

  services/           # Lógica de negócio
    authService.ts
    userService.ts

  middlewares/        # Middlewares de autenticação/autorização
    isAuth.ts
    isAdmin.ts

  routes/             # Definição de rotas
    authRoutes.ts
    adminRoutes.ts
    clientRoutes.ts

  utils/              # Funções auxiliares
    supabaseClient.ts
    jwt.ts
    generatePassword.ts
    sendEmail.ts

  index.ts            # Ponto de entrada da aplicação
```
---

## ⚙️ Configuração do Banco (Supabase)
Crie as tabelas no Supabase:

```
create table users (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    password_hash text not null,
    role text not null check (role in ('admin', 'cliente')),
    created_at timestamp default now(),
    updated_at timestamp default now()
);

create table password_resets (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    code text not null,
    expires_at timestamp not null,
    used boolean default false,
    created_at timestamp default now()
);
```

---

## 🔑 Variáveis de Ambiente
Crie um arquivo .env na raiz:

```
PORT=4000
JWT_SECRET=supersecretaqui
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=chave_supabase_aqui

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seuemail@gmail.com
SMTP_PASS=sua_senha_de_app
```
---

## ▶️ Executando o Projeto

1. Instalar dependências
```bash
npm install
```

2. Rodar em modo desenvolvimento
```bash
npm run dev
```

3. Build para produção
```bash
npm run build
npm start
```

---

## 📬 Rotas da API

### Autenticação
```
- POST /auth/login
- POST /auth/reset/request
- POST /auth/reset/verify
- POST /auth/reset/confirm
```

### Admin
```
- POST /admin/cadastrar
```

### Cliente
```
- GET /cliente
```

---

## 📧 Envio de Emails
- Cadastro → envia email de boas-vindas com senha inicial.
- Reset de senha → envia código de verificação para o email.

---

## 🧪 Testes no Postman
```
- AuthAPI.postman_collection.json
- AuthAPI.postman_environment.json
```
---

## 👨‍💻 Autor
Desenvolvido por **Yuri Henrique**
📧 Email: yurihcs@al.insper.edu.br
🌐 GitHub: https://github.com/Uyris