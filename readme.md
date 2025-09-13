# 📌 PROJETO P1 - Desenvolvimento de API com Node.js e Express

## 📖 Descrição

Este projeto tem como objetivo o **desenvolvimento de uma API** utilizando **Node.js** com **Express**, baseada no diagrama fornecido em aula.  
A API será organizada em camadas e boas práticas, incluindo o uso de **migrations, seeds, variáveis de ambiente, services e controllers**.  
O projeto será versionado e submetido ao **GitHub**.

---

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)

---

## 📂 Estrutura do Projeto

```

```

---

## ⚙️ Funcionalidades

- **Configuração da API** com Express
- **Models** representando as entidades do diagrama
- **Variáveis de ambiente** para configuração de porta, credenciais de banco
- **Migrations** para versionamento do banco
- **CRUD completo** para cada entidade
- **Controllers** para separar regras de negócio das rotas
- **Seeds** para popular o banco com dados iniciais
- **Services** incluindo paginação de resultados

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Eliel-DM/projeto_node_p1.git
cd projeto-p1
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=aqui_sua_porta
DB_HOST=localhost
DB_USER=usuario
DB_PASS=senha
DB_NAME=nome_do_banco
DB_DIALECT=postgres
```

### 4. Executar migrations e seeds

```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 5. Rodar a API

```bash
npm run start-dev
npm run start-watch (Roda em modo Watch)
```

---

## 📡 Endpoints da API

---

## ✅ Entrega

- O código deve ser submetido no **GitHub** pessoal do aluno.
- Valor: **8,0 pontos**.
