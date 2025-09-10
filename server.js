const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Lista de respostas pré-definidas para simular IA (mais leve!)
const responses = {
  'ola': ['Olá! Como posso ajudar você hoje?', 'Oi! Em que posso ser útil?', 'Olá! Estou aqui para ajudar!'],
  'oi': ['Oi! Como posso ajudar você hoje?', 'Oi! Em que posso ser útil?', 'Oi! Estou aqui para ajudar!'],
  'bom dia': ['Bom dia! Como posso ajudar você hoje?', 'Bom dia! Em que posso ser útil?'],
  'boa tarde': ['Boa tarde! Como posso ajudar você hoje?', 'Boa tarde! Em que posso ser útil?'],
  'boa noite': ['Boa noite! Como posso ajudar você hoje?', 'Boa noite! Em que posso ser útil?'],
  'horario': ['Funcionamos de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h.', 'Nossos horários são: segunda a sexta, 8h-18h, sábado 8h-12h.'],
  'endereco': ['Estamos localizados na Rua Principal, 123 - Centro.', 'Nosso endereço é Rua Principal, 123 - Centro da cidade.'],
  'telefone': ['Você pode nos contatar pelo telefone (11) 9999-9999.', 'Ligue para (11) 9999-9999 para falar conosco.'],
  'preco': ['Nossos preços variam conforme o serviço. Posso te passar mais detalhes?', 'Para informações sobre preços, preciso saber qual serviço você está interessado.'],
  'default': [
    'Entendi sua mensagem. Como posso ajudar você melhor?',
    'Obrigado por sua mensagem! Em que mais posso ajudar?',
    'Interessante! Conte-me mais para que eu possa ajudar melhor.',
    'Como posso ser mais útil para você hoje?'
  ]
};

const processMessage = async (message) => {
  try {
    console.log('Processando mensagem:', message);

    // Converter para minúsculas para matching
    const msg = message.toLowerCase();

    // Procurar por palavras-chave nas respostas
    for (const [key, replies] of Object.entries(responses)) {
      if (key !== 'default' && msg.includes(key)) {
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        return randomReply;
      }
    }

    // Resposta padrão se não encontrou nenhuma palavra-chave
    const defaultReplies = responses.default;
    const randomReply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
    return randomReply;

  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return `Olá! Você disse: "${message}". Como posso ajudar você hoje?`;
  }
};

console.log('🚀 Iniciando servidor leve (sem IA pesada)...');

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  console.log('📨 Recebida requisição POST /api/chat');
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensagem não fornecida.' });
  }

  try {
    const reply = await processMessage(message);
    console.log('📤 Enviando resposta:', reply);
    return res.json({ reply });
  } catch (error) {
    console.error('❌ Erro no endpoint:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.get('/', (req, res) => {
  res.send('🤖 Servidor do Chatbot Leve (sem IA pesada) - Rodando!');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor LEVE rodando na porta ${PORT}`);
  console.log(`💡 Este servidor usa respostas pré-definidas (mais rápido e leve!)`);
  console.log(`🌐 Teste em: http://localhost:${PORT}`);
});
