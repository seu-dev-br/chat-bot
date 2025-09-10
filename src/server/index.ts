import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { processMessage } from '../../chatbot-project/src/server/chat';

const app = express();
const PORT = process.env.PORT || 3001;

console.log('Iniciando servidor...');

app.use(cors());
app.use(express.json());

console.log('Configurando rotas...');

// Endpoint principal do chat
app.post('/api/chat', async (req, res) => {
  console.log('Recebida requisição POST /api/chat');
  const { message } = req.body;
  console.log('Mensagem recebida:', message);

  if (!message) {
    console.log('Mensagem vazia, retornando erro 400');
    return res.status(400).json({ error: 'Mensagem não fornecida.' });
  }
  try {
    console.log('Processando mensagem...');
    const reply = await processMessage(message);
    console.log('Resposta gerada:', reply);
    return res.json({ reply });
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.get('/', (req, res) => {
  console.log('Recebida requisição GET /');
  res.send('Servidor do Chatbot rodando!');
});

console.log(`Tentando iniciar servidor na porta ${PORT}...`);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
}).on('error', (error) => {
  console.error('❌ Erro ao iniciar servidor:', error);
});
