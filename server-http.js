const http = require('http');

// 🎯 PROMPT PERSONALIZADO PARA NEGÓCIO LOCAL
const BUSINESS_INFO = {
  name: "Tech Solutions Pro",
  address: "Rua das Tecnologias, 123 - Centro, São Paulo - SP",
  phone: "(11) 9999-9999",
  email: "contato@techsolutions.com.br",
  hours: "Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h",
  services: ["Desenvolvimento de Software", "Consultoria em TI", "Suporte Técnico", "Treinamentos"]
};

// 💬 RESPOSTAS INTELIGENTES BASEADAS EM PALAVRAS-CHAVE
const responses = {
  // SAUDAÇÕES - MAIS NATURAIS
  'ola': [
    `Olá! 😊 Bem-vindo à ${BUSINESS_INFO.name}! Sou a Ana, sua assistente virtual. Como posso te ajudar hoje?`,
    `Oi! 👋 Que bom ter você aqui na ${BUSINESS_INFO.name}! Em que posso ser útil?`,
    `Olá! 🌟 Obrigado por entrar em contato conosco. Sou a Ana e estou aqui para ajudar. O que você precisa?`,
    `Oi, tudo bem? 😊 Sou a Ana da ${BUSINESS_INFO.name}. Como posso ajudar você hoje?`
  ],
  'oi': [
    `Oi! 😊 Bem-vindo à ${BUSINESS_INFO.name}! Sou a Ana, sua assistente virtual. Como posso te ajudar hoje?`,
    `Oi! 👋 Que bom ter você aqui na ${BUSINESS_INFO.name}! Em que posso ser útil?`,
    `Oi! 🌟 Obrigado por entrar em contato conosco. Sou a Ana e estou aqui para ajudar. O que você precisa?`,
    `Oi, tudo bem? 😊 Sou a Ana da ${BUSINESS_INFO.name}. Como posso ajudar você hoje?`
  ],
  'bom dia': [
    `Bom dia! ☀️ Bem-vindo à ${BUSINESS_INFO.name}! Sou a Ana, sua assistente virtual. Como posso te ajudar hoje?`,
    `Bom dia! 🌅 Que bom ter você aqui na ${BUSINESS_INFO.name}! Sou a Ana. Em que posso ser útil?`,
    `Bom dia! ☀️ Obrigado por entrar em contato conosco. Sou a Ana e estou aqui para ajudar. O que você precisa?`,
    `Bom dia! 😊 Sou a Ana da ${BUSINESS_INFO.name}. Como posso ajudar você hoje?`
  ],
  'boa tarde': [
    `Boa tarde! �️ Bem-vindo à ${BUSINESS_INFO.name}! Sou a Ana, sua assistente virtual. Como posso te ajudar hoje?`,
    `Boa tarde! 🌅 Que bom ter você aqui na ${BUSINESS_INFO.name}! Sou a Ana. Em que posso ser útil?`,
    `Boa tarde! 🌤️ Obrigado por entrar em contato conosco. Sou a Ana e estou aqui para ajudar. O que você precisa?`,
    `Boa tarde! 😊 Sou a Ana da ${BUSINESS_INFO.name}. Como posso ajudar você hoje?`
  ],
  'boa noite': [
    `Boa noite! 🌙 Bem-vindo à ${BUSINESS_INFO.name}! Sou a Ana, sua assistente virtual. Como posso te ajudar hoje?`,
    `Boa noite! 🌙 Que bom ter você aqui na ${BUSINESS_INFO.name}! Sou a Ana. Em que posso ser útil?`,
    `Boa noite! 🌙 Obrigado por entrar em contato conosco. Sou a Ana e estou aqui para ajudar. O que você precisa?`,
    `Boa noite! 😊 Sou a Ana da ${BUSINESS_INFO.name}. Como posso ajudar você hoje?`
  ],

  // DESPEDIDAS
  'tchau': [
    `Foi um prazer conversar com você! 😊 Se precisar de mais alguma coisa, é só chamar. Até logo! 👋`,
    `Obrigado por entrar em contato! 🙏 Se tiver mais dúvidas, estamos sempre aqui. Até a próxima!`,
    `Foi ótimo te atender! 😄 Qualquer coisa, é só voltar aqui. Tenha um ótimo dia! 🌟`,
    `Até logo! 👋 Lembre-se: estamos sempre disponíveis para ajudar. Qualquer dúvida, é só perguntar!`
  ],

  // HORÁRIO DE FUNCIONAMENTO - MAIS CONVERSACIONAL
  'horario': [
    `🕐 Claro! Nossos horários de atendimento são:\n${BUSINESS_INFO.hours}\n\nEstamos sempre prontos para te ajudar! 😊`,
    `Ah, sobre horários... Funcionamos assim:\n${BUSINESS_INFO.hours}\n\nQualquer dia desses, pode aparecer! 😉`,
    `📅 Perfeito! Atendemos nos seguintes horários:\n${BUSINESS_INFO.hours}\n\nEstamos à sua disposição!`,
    `Sobre nossos horários: ${BUSINESS_INFO.hours}\n\nSempre que precisar, é só aparecer! 😄`
  ],
  'hora': [
    `🕐 Claro! Nossos horários de atendimento são:\n${BUSINESS_INFO.hours}\n\nEstamos sempre prontos para te ajudar! 😊`,
    `Ah, sobre horários... Funcionamos assim:\n${BUSINESS_INFO.hours}\n\nQualquer dia desses, pode aparecer! 😉`,
    `📅 Perfeito! Atendemos nos seguintes horários:\n${BUSINESS_INFO.hours}\n\nEstamos à sua disposição!`
  ],
  'funciona': [
    `🕐 Nossos horários de atendimento:\n${BUSINESS_INFO.hours}\n\nEstamos sempre prontos para ajudar!`,
    `Funcionamos nos seguintes horários:\n${BUSINESS_INFO.hours}\n\nComo podemos ajudar você hoje?`
  ],

  // ENDEREÇO E LOCALIZAÇÃO - MAIS CONVERSACIONAL
  'endereco': [
    `📍 Claro! Nosso endereço é:\n${BUSINESS_INFO.address}\n\nEstamos localizados no coração da cidade, fácil de chegar! 😊`,
    `🏢 Ah, quer nos visitar? Estamos aqui:\n${BUSINESS_INFO.address}\n\nÉ bem fácil de encontrar, estamos no centro! 😉`,
    `📌 Perfeito! Você nos encontra em:\n${BUSINESS_INFO.address}\n\nEstamos no centro de São Paulo, com estacionamento próximo!`,
    `Sobre nossa localização: ${BUSINESS_INFO.address}\n\nVenha nos visitar! Estamos sempre prontos para um bom atendimento! 😄`
  ],
  'onde': [
    `📍 Claro! Nosso endereço é:\n${BUSINESS_INFO.address}\n\nEstamos localizados no coração da cidade, fácil de chegar! 😊`,
    `🏢 Ah, quer nos visitar? Estamos aqui:\n${BUSINESS_INFO.address}\n\nÉ bem fácil de encontrar, estamos no centro! 😉`,
    `📌 Perfeito! Você nos encontra em:\n${BUSINESS_INFO.address}\n\nEstamos no centro de São Paulo, com estacionamento próximo!`
  ],
  'local': [
    `📍 Claro! Nosso endereço é:\n${BUSINESS_INFO.address}\n\nEstamos localizados no coração da cidade, fácil de chegar! 😊`,
    `🏢 Ah, quer nos visitar? Estamos aqui:\n${BUSINESS_INFO.address}\n\nÉ bem fácil de encontrar, estamos no centro! 😉`,
    `📌 Perfeito! Você nos encontra em:\n${BUSINESS_INFO.address}\n\nEstamos no centro de São Paulo, com estacionamento próximo!`
  ],

  // CONTATO - MAIS CONVERSACIONAL
  'telefone': [
    `📞 Claro! Aqui vão nossos contatos:\nTelefone: ${BUSINESS_INFO.phone}\nE-mail: ${BUSINESS_INFO.email}\n\nEstamos sempre disponíveis para ajudar! 😊`,
    `☎️ Quer falar conosco? Aqui estão nossos contatos:\nTelefone: ${BUSINESS_INFO.phone}\nE-mail: ${BUSINESS_INFO.email}\n\nSerá um prazer te atender! 😉`,
    `📱 Perfeito! Você pode nos contatar assim:\nTelefone: ${BUSINESS_INFO.phone}\nE-mail: ${BUSINESS_INFO.email}\n\nEstamos sempre por aqui!`,
    `Sobre contato: ${BUSINESS_INFO.phone} ou ${BUSINESS_INFO.email}\n\nPode ligar ou escrever a qualquer momento! 😄`
  ],
  'contato': [
    `📞 Claro! Aqui vão nossos contatos:\nTelefone: ${BUSINESS_INFO.phone}\nE-mail: ${BUSINESS_INFO.email}\n\nEstamos sempre disponíveis para ajudar! 😊`,
    `☎️ Quer falar conosco? Aqui estão nossos contatos:\nTelefone: ${BUSINESS_INFO.phone}\nE-mail: ${BUSINESS_INFO.email}\n\nSerá um prazer te atender! 😉`,
    `📱 Perfeito! Você pode nos contatar assim:\nTelefone: ${BUSINESS_INFO.phone}\nE-mail: ${BUSINESS_INFO.email}\n\nEstamos sempre por aqui!`
  ],
  'email': [
    `📧 Claro! Nosso e-mail é: ${BUSINESS_INFO.email}\n\nEnvie sua mensagem e responderemos o mais breve possível! 😊`,
    `✉️ Quer nos escrever? Nosso e-mail é: ${BUSINESS_INFO.email}\n\nEstamos sempre disponíveis! 😉`,
    `Sobre e-mail: ${BUSINESS_INFO.email}\n\nPode escrever quando quiser, respondemos rapidinho! 😄`
  ],

  // SERVIÇOS - MAIS CONVERSACIONAL
  'servico': [
    `🛠️ Claro! Somos especializados em:\n${BUSINESS_INFO.services.map(s => `• ${s}`).join('\n')}\n\nQual serviço você está interessado? 😊`,
    `💼 Ah, quer conhecer nossos serviços? Oferecemos:\n${BUSINESS_INFO.services.map(s => `• ${s}`).join('\n')}\n\nConte-me mais sobre seu projeto! 😉`,
    `🚀 Perfeito! Somos especializados em:\n${BUSINESS_INFO.services.map(s => `• ${s}`).join('\n')}\n\nEm qual área você precisa de ajuda?`,
    `Sobre nossos serviços: ${BUSINESS_INFO.services.join(', ')}\n\nQual deles te interessa mais? 😄`
  ],
  'desenvolvimento': [
    `💻 Desenvolvimento de Software:\nCriamos soluções personalizadas para seu negócio!\n\n• Websites\n• Aplicativos\n• Sistemas web\n• APIs\n\nQuer saber mais sobre algum projeto específico?`,
    `🚀 Desenvolvimento de Software:\nTransformamos suas ideias em realidade digital!\n\n• Websites responsivos\n• Apps móveis\n• Sistemas empresariais\n• Integrações\n\nVamos conversar sobre seu projeto?`
  ],
  'consultoria': [
    `🎯 Consultoria em TI:\nOrientação especializada para otimizar seus processos!\n\n• Análise de sistemas\n• Planejamento estratégico\n• Migração para nuvem\n• Segurança da informação\n\nPrecisa de uma consultoria?`,
    `📊 Consultoria em TI:\nAjudamos sua empresa a crescer com tecnologia!\n\n• Diagnóstico de TI\n• Estratégia digital\n• Otimização de processos\n• Governança de TI\n\nVamos avaliar seus sistemas?`
  ],

  // PREÇOS - MAIS CONVERSACIONAL
  'preco': [
    `💰 Claro! Cada projeto é único, então nossos preços variam conforme a complexidade.\n\nPara dar um orçamento preciso, preciso saber:\n• Tipo de projeto\n• Funcionalidades desejadas\n• Prazo disponível\n\nVamos conversar sobre seu projeto? 😊`,
    `📋 Ah, sobre preços... Trabalhamos com orçamentos personalizados!\n\nPara isso, preciso entender melhor:\n• Suas necessidades específicas\n• Escopo do projeto\n• Tecnologias preferidas\n\nQuer compartilhar mais detalhes? 😉`,
    `🧮 Perfeito! Fazemos orçamentos personalizados para cada cliente.\n\nPara isso, preciso saber:\n• Objetivos do projeto\n• Público-alvo\n• Funcionalidades essenciais\n\nVamos detalhar seu projeto?`,
    `Sobre preços: cada projeto tem seu valor específico!\n\nPara um orçamento preciso, me conte:\n• O que você precisa desenvolver\n• Qual é o objetivo\n• Há alguma preferência tecnológica\n\nVamos conversar sobre isso? 😄`
  ],
  'orcamento': [
    `📝 Claro! Para fazer um orçamento preciso, preciso entender melhor seu projeto.\n\nPode me contar:\n• Qual tipo de solução você precisa?\n• Qual é o objetivo principal?\n• Há alguma preferência tecnológica?\n\nVamos conversar sobre os detalhes! 😊`,
    `💼 Ah, quer um orçamento? Perfeito!\n\nPara isso, preciso saber:\n• Escopo completo do projeto\n• Tecnologias envolvidas\n• Prazo desejado\n\nQuer compartilhar mais sobre seu projeto? 😉`,
    `Sobre orçamento: fazemos personalizado para cada cliente!\n\nPara isso, me ajude com:\n• Tipo de projeto\n• Funcionalidades necessárias\n• Prazo disponível\n\nVamos detalhar? 😄`
  ],

  // SOBRE A EMPRESA - MAIS CONVERSACIONAL
  'empresa': [
    `🏢 Ah, quer conhecer mais sobre nós? Somos a ${BUSINESS_INFO.name}!\n\nSomos uma empresa especializada em soluções tecnológicas para negócios.\n\n• Equipe especializada e experiente\n• Soluções personalizadas\n• Suporte contínuo\n• Compromisso com qualidade\n\nSerá um prazer trabalhar com você! 😊`,
    `🌟 Sobre a ${BUSINESS_INFO.name}: somos referência em soluções tecnológicas!\n\n• Foco em resultados\n• Tecnologia de ponta\n• Atendimento personalizado\n• Compromisso com qualidade\n\nComo podemos ajudar seu negócio? 😉`,
    `🏢 Claro! Somos a ${BUSINESS_INFO.name}, especializada em soluções tecnológicas.\n\nTemos uma equipe incrível e apaixonada por tecnologia, sempre pronta para criar as melhores soluções para seu negócio! 🚀`
  ],
  'sobre': [
    `🏢 Ah, quer conhecer mais sobre nós? Somos a ${BUSINESS_INFO.name}!\n\nSomos uma empresa especializada em soluções tecnológicas para negócios.\n\n• Equipe especializada e experiente\n• Soluções personalizadas\n• Suporte contínuo\n• Compromisso com qualidade\n\nSerá um prazer trabalhar com você! 😊`,
    `🌟 Sobre a ${BUSINESS_INFO.name}: somos referência em soluções tecnológicas!\n\n• Foco em resultados\n• Tecnologia de ponta\n• Atendimento personalizado\n• Compromisso com qualidade\n\nComo podemos ajudar seu negócio? 😉`,
    `🏢 Claro! Somos a ${BUSINESS_INFO.name}, especializada em soluções tecnológicas.\n\nTemos uma equipe incrível e apaixonada por tecnologia, sempre pronta para criar as melhores soluções para seu negócio! 🚀`
  ],

  // RESPOSTAS PADRÃO PARA OUTRAS MENSAGENS - MAIS NATURAIS
  'default': [
    `Hmm, não entendi muito bem o que você quis dizer. 🤔 Poderia explicar melhor? Estou aqui para ajudar!`,
    `Desculpe, mas não consegui entender sua mensagem. 😅 Você poderia reformular ou me dar mais detalhes?`,
    `Ops! Parece que não compreendi direito. 🙏 Você pode repetir de outro jeito? Quero te ajudar da melhor forma possível!`,
    `Ah, essa mensagem ficou um pouco confusa para mim. 🤷‍♀️ Pode me explicar melhor o que você precisa?`,
    `Não consegui captar exatamente o que você quis dizer. 💭 Que tal tentar de novo com outras palavras?`,
    `Desculpe, mas essa mensagem me deixou um pouco perdida. 😅 Você pode esclarecer melhor? Estou aqui para ajudar!`,
    `Hmm... não tenho certeza se entendi direito. 🤔 Pode me explicar melhor o que você está procurando?`,
    `Essa mensagem ficou um pouco vaga para mim. 🙏 Você poderia ser mais específico? Quero te dar a melhor resposta possível!`,
    `Ops! Não consegui entender direito. 😊 Pode tentar explicar de outro jeito? Estou ansiosa para te ajudar!`,
    `Desculpe, mas essa mensagem me confundiu um pouco. 🤷‍♀️ Que tal reformular? Quero entender melhor para te ajudar melhor!`
  ]
};

// 🎯 FUNÇÃO PARA PROCESSAR MENSAGENS - MAIS INTELIGENTE
function processMessage(message) {
  const msg = message.toLowerCase().trim();
  console.log('Processando mensagem:', msg);

  // Primeiro, procurar por palavras-chave exatas
  for (const [key, replies] of Object.entries(responses)) {
    if (key !== 'default' && msg.includes(key)) {
      console.log('Encontrou palavra-chave exata:', key);
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return randomReply;
    }
  }

  // Se não encontrou palavra-chave exata, tentar detectar intenção
  const detectedIntent = detectIntent(msg);
  if (detectedIntent) {
    console.log('Detectou intenção:', detectedIntent);
    const replies = responses[detectedIntent];
    if (replies) {
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return randomReply;
    }
  }

  console.log('Nenhuma intenção detectada, usando resposta padrão');
  // Resposta padrão se não encontrou nenhuma palavra-chave ou intenção
  const defaultReplies = responses.default;
  const randomReply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  return randomReply;
}

// 🎯 FUNÇÃO PARA DETECTAR INTENÇÃO - MAIS INTELIGENTE
function detectIntent(message) {
  const msg = message.toLowerCase();

  // DETECTAR SAUDAÇÕES
  const greetings = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'ei', 'opa', 'eae', 'salve', 'oi tudo bem', 'ola tudo bem'];
  for (const greeting of greetings) {
    if (msg.includes(greeting)) {
      // Determinar o período do dia para saudação contextual
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) return 'bom dia';
      if (hour >= 12 && hour < 18) return 'boa tarde';
      if (hour >= 18 || hour < 6) return 'boa noite';
      return 'ola'; // fallback
    }
  }

  // DETECTAR PERGUNTAS SOBRE HORÁRIO
  const timeKeywords = ['horario', 'hora', 'funciona', 'aberto', 'atendimento', 'quando', 'que horas', 'abre', 'fecha', 'horário'];
  for (const keyword of timeKeywords) {
    if (msg.includes(keyword)) {
      return 'horario';
    }
  }

  // DETECTAR PERGUNTAS SOBRE ENDEREÇO/LOCALIZAÇÃO
  const locationKeywords = ['endereco', 'onde', 'local', 'fica', 'endereço', 'localização', 'como chegar', 'onde fica'];
  for (const keyword of locationKeywords) {
    if (msg.includes(keyword)) {
      return 'endereco';
    }
  }

  // DETECTAR PERGUNTAS SOBRE CONTATO
  const contactKeywords = ['telefone', 'contato', 'email', 'ligar', 'chamar', 'falar', 'contatar', 'whatsapp'];
  for (const keyword of contactKeywords) {
    if (msg.includes(keyword)) {
      return 'telefone';
    }
  }

  // DETECTAR PERGUNTAS SOBRE SERVIÇOS
  const serviceKeywords = ['servico', 'serviços', 'faz', 'oferece', 'trabalha', 'especializa', 'serviço', 'o que faz'];
  for (const keyword of serviceKeywords) {
    if (msg.includes(keyword)) {
      return 'servico';
    }
  }

  // DETECTAR PERGUNTAS SOBRE PREÇOS/ORÇAMENTO
  const priceKeywords = ['preco', 'preço', 'custa', 'valor', 'orçamento', 'orcamento', 'quanto', 'custo'];
  for (const keyword of priceKeywords) {
    if (msg.includes(keyword)) {
      return 'preco';
    }
  }

  // DETECTAR PERGUNTAS SOBRE EMPRESA
  const companyKeywords = ['empresa', 'sobre', 'quem', 'voces', 'vocês', 'empresa', 'historia', 'história'];
  for (const keyword of companyKeywords) {
    if (msg.includes(keyword)) {
      return 'empresa';
    }
  }

  // DETECTAR DESPEDIDAS
  const goodbyeKeywords = ['tchau', 'até', 'adeus', 'obrigado', 'obrigada', 'valeu', 'thanks', 'thank you'];
  for (const keyword of goodbyeKeywords) {
    if (msg.includes(keyword)) {
      return 'tchau';
    }
  }

  return null; // Nenhuma intenção detectada
}

// 🚀 CONFIGURAÇÃO DO SERVIDOR HTTP
const server = http.createServer((req, res) => {
  // Configuração CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Rota principal
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('🤖 Chatbot Tech Solutions Pro - Servidor HTTP Rodando!');
    return;
  }

  // Endpoint da API do chat
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { message } = JSON.parse(body);

        if (!message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Mensagem não fornecida.' }));
          return;
        }

        // Processar a mensagem com o prompt personalizado
        const reply = processMessage(message);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ reply }));

      } catch (error) {
        console.error('Erro ao processar requisição:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno do servidor.' }));
      }
    });

    return;
  }

  // Rota não encontrada
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Rota não encontrada.' }));
});

// 🚀 INICIAR SERVIDOR
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Servidor HTTP do Chatbot rodando na porta ${PORT}`);
  console.log(`🌐 Teste em: http://localhost:${PORT}`);
  console.log(`🤖 Chatbot Tech Solutions Pro - Pronto para receber mensagens!`);
  console.log(`💡 Respostas inteligentes baseadas em palavras-chave configuradas`);
});
