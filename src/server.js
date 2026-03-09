import express from 'express';
import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.ts';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
const OK = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Para entender JSON
app.use(express.json());

// Cria novo pedido
app.post('/order', async (req, res) => {

    try {
        // Mapeamento dos campos de Items
        let renamedItems = req.body.items.map(item => {
            return {
                productId : item.idItem,
                quantity : item.quantidadeItem,
                price : item.valorItem
            }
        });

        // Criação do Pedido
        await prisma.order.create({
            data: {
                orderId: req.body.numeroPedido,
                value: req.body.valorTotal,
                creationDate: req.body.dataCriacao,
                items: {
                   create: renamedItems
                }
            }
        });

        console.log('Pedido criado!');

        return res.status(CREATED).json(req.body);
    } catch (error) {
        console.error("An error occurred:", error.message);

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return res.status(INTERNAL_SERVER_ERROR).json({error: "Pedido já criado"});
            }
        }

        return res.status(INTERNAL_SERVER_ERROR).json({error: "Erro interno"});
    }    
});

// Obtém os dados do pedido passando o número do pedido por parâmetro na URL
app.get('/order/:orderId', async (req, res) => {
    try {
        // Pesquisa Pedido na base
        const order = await prisma.order.findUnique({
            where: { 
                orderId: req.params.orderId 
            },
            include: { 
                items: {
                    select: {
                        productId: true,
                        quantity: true,
                        price: true
                    }
                } 
            }
        });

        // Valida retorno da base
        if (order !== null) {
            // Remove campo id da base
            delete order.id;
        } else {
            return res.status(INTERNAL_SERVER_ERROR).json({error: "Pedido não encontrado"});
        }

        return res.status(OK).json(order);
    } catch (error) {
        console.error("An error occurred:", error.message);

        return res.status(INTERNAL_SERVER_ERROR).json({error: "Erro interno"});
    }
});

// Lista todos os pedidos
app.get('/order', async (_req, res) => {
    try {
        // Pesquisa pedidos na base
        const order = await prisma.order.findMany({
            include: { 
                items: {
                    select: {
                        productId: true,
                        quantity: true,
                        price: true
                    }
                } 
            }
        });

        // Valida retorno da base
        if (order !== null) {
            if (Object.keys(order).length !== 0) {
                // Remove campo id da base
                const mappedOrder = order.map(order => {
                    delete order.id;
                });
            } else {
                return res.status(INTERNAL_SERVER_ERROR).json({error: "Não foram encontrados pedidos"});
            }
        }

        return res.status(OK).json(order);
    } catch (error) {
        console.error("An error occurred:", error.message);

        return res.status(INTERNAL_SERVER_ERROR).json({error: "Erro interno"});
    }
});
