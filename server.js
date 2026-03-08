import express from 'express'

const app = express();
const PORT = 3000;

// Middleware para entender JSON
app.use(express.json());

// Rota GET básica
app.get('/order', (req, res) => {
    res.json({ mensagem: 'API Node.js funcionando!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});