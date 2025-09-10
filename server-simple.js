const express = require('express');
const app = express();
const PORT = 3001;

console.log('🔥 Servidor ULTRA SIMPLES iniciando...');

app.use(require('cors')());
app.use(express.json());

app.post('/api/chat', (req, res) => {
  console.log('📨 Recebida:', req.body);
  const { message } = req.body;
  res.json({ reply: `Você disse: "${message}"` });
});

app.get('/', (req, res) => {
  res.send('🚀 Servidor funcionando!');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor na porta ${PORT}`);
});
