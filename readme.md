# 📌 PROJETO P1 - Desenvolvimento de API com Node.js e Express

## 📖 Descrição

Este projeto tem como objetivo o desenvolvimento de uma API utilizando **Node.js** com **Express** e **TypeORM**, baseada em arquitetura modular com **controllers**, **services**, **migrations** e **seeds**.
A API é organizada em camadas seguindo boas práticas de desenvolvimento.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Superset JavaScript tipado
- **TypeORM** - ORM para banco de dados
- **MySQL** - Banco de dados relacional

## 📂 Estrutura do Projeto

```
text
├── .vscode/
├── dist/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── productsCategoriesController.ts
│   │   ├── productsController.ts
│   │   ├── productsSituationController.ts
│   │   └── situationController.ts
│   ├── entity/
│   │   ├── products.ts
│   │   ├── productsCategories.ts
│   │   ├── productsSituation.ts
│   │   └── users.ts
│   ├── migration/
│   │   ├── 1759531807679-CreateSituationsTable.ts
│   │   ├── 1759531830965-CreateUsersTable.ts
│   │   ├── 1759668379060-CreateProductsTable.ts
│   │   ├── 1759668399097-CreateProductsSituationTable.ts
│   │   └── 1759668410000-CreateProductsCategoriesTable.ts
│   ├── routes/
│   │   └── apiRoutes.ts
│   ├── seeds/
│   │   ├── createProductsSeeds.ts
│   │   └── createSituationsSeeds.ts
│   ├── services/
│   │   ├── paginationServices.ts
│   │   ├── data-source.ts
│   │   └── run-seeds.ts
│   └── server.ts
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## ⚙️ Funcionalidades

- ✅ Configuração completa da API com Express e TypeScript
- ✅ Entities representando todas as entidades do sistema
- ✅ Variáveis de ambiente para configurações sensíveis
- ✅ Migrations para versionamento do banco de dados
- ✅ CRUD completo para todas as entidades
- ✅ Controllers separando lógica de negócio das rotas
- ✅ Seeds para popular o banco com dados iniciais
- ✅ Services incluindo paginação de resultados
- ✅ TypeORM para operações de banco de dados

## 🚀 Como Executar o Projeto

1. **Clonar o repositório**

```bash
git clone https://github.com/Eliel-DM/projeto_node_p1.git
cd projeto_node_p1
```

2. **Instalar dependências**

```bash
npm install
```

3. **Configurar variáveis de ambiente**

```
Exemplo de uso:

API_PORT=3000
DB_TYPE="mysql"
DB_HOST="localhost"
DB_PORT=3306
DB_DATABASE="nodeapi"
DB_USERNAME="root"
DB_PASSWORD="12345678"
```

4. **Criar o banco de dados**

```bash
#Precisa estar em um Shell Mysql
CREATE DATABASE nodeapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

5. **Compilar o projeto TypeScript**

```bash
npm run transpile
```

6. **Executar as migrations**

```bash
npx typeorm migration:run -d dist/data-source.js
```

7. **Executar os seeds**

```bash
node dist/run-seeds.js
```

8. **Executar a API**

````bash
# Modo desenvolvimento
npm run start-watch # Roda a api diratamente em TypeScript
npm run start-transpile # Faz o Build para Js e depois roda o arquivo server.js

## 📡 Endpoints da API

### 🔐 Auth Routes // Ainda não iniciado

| Método | Endpoint | Descrição                    |
| ------ | -------- | ---------------------------- |
| GET    | /api/    | Verifica autenticação da API |

### 📋 Situations Routes

| Método | Endpoint            | Descrição                   |
| ------ | ------------------- | --------------------------- |
| GET    | /api/situations     | Lista todas as situações    |
| GET    | /api/situations/:id | Busca situação por ID       |
| POST   | /api/situations     | Cria nova situação          |
| PUT    | /api/situations/:id | Atualiza situação existente |
| DELETE | /api/situations/:id | Remove situação             |

### 🏷️ Products Routes

| Método | Endpoint          | Descrição                  |
| ------ | ----------------- | -------------------------- |
| GET    | /api/products     | Lista todos os produtos    |
| GET    | /api/products/:id | Busca produto por ID       |
| POST   | /api/products     | Cria novo produto          |
| PUT    | /api/products/:id | Atualiza produto existente |
| DELETE | /api/products/:id | Remove produto             |

### 📂 Products Categories Routes

| Método | Endpoint                    | Descrição                    |
| ------ | --------------------------- | ---------------------------- |
| GET    | /api/productsCategories     | Lista todas as categorias    |
| GET    | /api/productsCategories/:id | Busca categoria por ID       |
| POST   | /api/productsCategories     | Cria nova categoria          |
| PUT    | /api/productsCategories/:id | Atualiza categoria existente |
| DELETE | /api/productsCategories/:id | Remove categoria             |

### 🔄 Products Situation Routes

| Método | Endpoint                  | Descrição                     |
| ------ | ------------------------- | ----------------------------- |
| GET    | /api/productSituation     | Lista situações de produtos   |
| GET    | /api/productSituation/:id | Busca situação por ID         |
| POST   | /api/productSituation     | Cria nova situação de produto |
| PUT    | /api/productSituation/:id | Atualiza situação existente   |
| DELETE | /api/productSituation/:id | Remove situação de produto    |

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start-dev # Executa em modo desenvolvimento usando ts-node
npm run start-watch # Executa em modo watch com ts-node-dev

# Build
npm run transpile # Compila TypeScript para JavaScript
npm run start-transpile # Compila e executa o projeto em produção

````

## 🗄️ Entidades do Sistema

- **Users** - Usuários do sistema
- **Products** - Produtos cadastrados
- **ProductsCategories** - Categorias de produtos
- **ProductsSituation** - Situações dos produtos
- **Situations** - Situações gerais do sistema

## 🔧 Comandos Úteis

### Banco de Dados

```bash
mysql -u root -p -e "CREATE DATABASE nodeapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
npx typeorm migration:run -d dist/services/data-source.js
node dist/services/run-seeds.js
npx typeorm migration:revert -d dist/services/data-source.js
```

## 🐛 Solução de Problemas

- **Erro de conexão com o banco**:

  - Verifique se o MySQL está rodando
  - Confirme as credenciais no arquivo `.env`
  - Certifique-se que o banco `nodeapi` foi criado

- **Erro de migrations**:

  - Execute o build primeiro: `npm run transpile`
  - Verifique se o arquivo `data-source.js` existe em `dist/services/`

- **Erro de portas**:

  - Verifique se a porta selecionada não está sendo usada
  - Altere a `API_PORT` no arquivo `.env` se necessário

## ✅ Critérios de Entrega

- Código versionado no GitHub pessoal
- API funcional com todos os endpoints
- Migrations e seeds implementados
- Variáveis de ambiente configuradas
- Controllers e services organizados
- Documentação completa

**Valor:** 8,0 pontos
