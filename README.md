# Sistema de Medidas Pessoais - Backend

Este repositório contém o **backend** do projeto **Sistema de Medidas Pessoais**, desenvolvido como parte de um trabalho acadêmico.  
O sistema permite que usuários cadastrem e consultem medidas corporais, visando auxiliar e-commerces de vestuário a oferecer tamanhos mais adequados.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** 
- **Express.js** 
- **TypeScript** 
- **MySQL**
- **Sequelize ORM** 
- **JWT** (Autenticação)
- **Dotenv** (Variáveis de ambiente)

---

---

## ⚙️ Configuração do Ambiente

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/alanls1/fase_1_backend.git
   cd sistema-medidas/backend

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**
   Criar um arquivo `.env` baseado no `.env.example`:

   ```env
    PORT=""
    DATABASE=""
    DATABASE_USERNAME=""
    PASSWORD=""
    HOST=""
    JWT_SECRET=""
    REFRESH_TOKEN_SECURE=""
   ```

4. **Rodar as migrações do banco**

   ```bash
   npx sequelize db:migrate
   ```

5. **Iniciar servidor**

   ```bash
   npm run dev
   ```

O servidor ficará disponível em:
👉 `http://localhost:{PORTA}`

---

## 🔑 Endpoints Principais

### Usuários

* `POST /users` → Criação de usuário
* `POST /users/login` → Login e geração de token
* `POST /users/logout` → logout da conta
* `DELETE /users` → Deletar conta
* `POST /users/refreshToken`  → Renovar access token caso o refreshToken seja válido

### Medidas

* `POST /metrics` → Criar medida
* `GET /metrics` → Listar medidas do usuário autenticado
* `GET /metrics` → Listar medidas por código público
* `DELETE /metrics/:id` → Excluir medida
* `PUT /metrics` → Atualizar medidas cadastradas

---
