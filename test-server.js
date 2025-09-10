const express = require('express');
const app = express();
const PORT = 3001;

app.use(require('cors')());
app.use(express.json());

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  console.log('Mensagem recebida:', message);
  res.json({ reply: `Você disse: ${message}` });
});

app.get('/', (req, res) => {
  res.send('Servidor de teste rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor de teste rodando na porta ${PORT}`);
});
