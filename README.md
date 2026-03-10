# PedidosAPI

Desafio API de Pedidos - REST API para gerenciamento de pedidos

## 📋 Descrição

API desenvolvida com Express.js e Prisma para gerenciar pedidos e seus itens. A API fornece endpoints para criar, consultar, atualizar e deletar pedidos.

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **Swagger UI** - Documentação interativa da API

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd PedidosAPI
```

2. Instale as dependências:
```bash
npm install
```

3. Configure seu banco de dados no arquivo `.env`

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

## 🚀 Como Usar

Inicie o servidor:
```bash
npm start
```

O servidor rodará em `http://localhost:3000`

## 📚 Endpoints

### Criar Pedido
- **POST** `/order`
- Cria um novo pedido com seus itens

### Obter Pedido
- **GET** `/order/:orderId`
- Retorna os dados de um pedido específico

### Listar Todos os Pedidos
- **GET** `/order`
- Retorna todos os pedidos cadastrados

### Atualizar Pedido
- **PUT** `/order/:orderId`
- Atualiza um pedido existente

### Deletar Pedido
- **DELETE** `/order/:orderId`
- Remove um pedido da base de dados

## 📖 Documentação

Acesse a documentação interativa Swagger em:
```
http://localhost:3000/swagger
```

## 📝 Estrutura do Projeto

```
PedidosAPI/
├── src/
│   └── server.js
├── generated/
│   └── prisma/
├── swagger.json
└── package.json
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:
```
DATABASE_URL="sua-connection-string"
```

## 📄 Licença

Projeto desenvolvido como desafio técnico.
