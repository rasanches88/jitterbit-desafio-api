import express from 'express';
import { PrismaClient } from './generated/prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
const HTTP_OK = 200;
const HTTP_CREATED = 201;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Para entender JSON
app.use(express.json());

//const pedidos = [];

// Cria novo pedido
app.post('/order', async (req, res) => {

    await prisma.pedido.create({
        data: {
            orderId: req.body.numeroPedido,
            value: req.body.valorTotal,
            creationDate: req.body.dataCriacao,
            items: req.body.items
        }
    })
    //pedidos.push(req.body);

    console.log('Pedido criado!');

    res.status(HTTP_CREATED).json(req.body);
});

// Obtém os dados do pedido passando o número do pedido por parâmetro na URL
app.get('/order', (req, res) => {
    // res.status(HTTP_OK).json(pedidos);
    res.status(HTTP_OK).json();
});
