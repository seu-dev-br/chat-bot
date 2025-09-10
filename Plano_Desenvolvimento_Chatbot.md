# Plano Detalhado de Desenvolvimento do Chatbot Virtual

## Status Atual do Projeto: ✅ MVP FUNCIONAL IMPLEMENTADO

**Data:** 9 de setembro de 2025  
**Progresso:** ~30% concluído (Fases 1, 2 e MVP básico da Fase 3)  
**Status dos Servidores:** 
- Front-end: ✅ Rodando em http://localhost:4321
- Back-end: ✅ Rodando em http://localhost:3001

---

## 1. Pré-projeto e Estudo de Viabilidade ✅ CONCLUÍDO

## 1. Pré-projeto e Estudo de Viabilidade
- Levantamento dos objetivos do negócio (ex: aumentar satisfação, reduzir carga do suporte). ✅ **CONCLUÍDO** - Documentado na documentação inicial.
- Identificação dos stakeholders (dono da loja, TI, suporte, usuários-chave). ✅ **CONCLUÍDO** - Mencionados na documentação.
- Análise de viabilidade técnica: checar APIs (OpenAI, Twilio), requisitos de infraestrutura (Astro, Node.js, PostgreSQL). ✅ **CONCLUÍDO** - Stack definida e validada.
- Responsável: Gerente de Projeto
- Prazo sugerido: 1 semana

_________________________________________________________________


## 2. Estudo de Negócios e Requisitos
- Mapeamento dos fluxos de atendimento (site e WhatsApp). ✅ **CONCLUÍDO** - Documentado na documentação.
- Coleta de FAQs, procedimentos, políticas e catálogo do comércio. ✅ **CONCLUÍDO** - Base na documentação inicial.
- Definição da persona do bot (nome, tom de voz, histórico, exemplos de respostas). ✅ **CONCLUÍDO** - Detalhado na documentação.
- Especificação dos requisitos funcionais e não funcionais (segurança, LGPD, criptografia). ✅ **CONCLUÍDO** - Incluído na documentação.
- Responsável: Analista de Negócios
- Prazo sugerido: 1 semana

## 3. Iteração Funcional (MVP)
- Setup do repositório e ambiente (Astro + TypeScript, Node.js, PostgreSQL). ✅ **CONCLUÍDO** - Projeto Astro inicializado, dependências instaladas.
- Implementação do front-end básico (widget de chat no site). ✅ **CONCLUÍDO** - Widget React criado com interface de chat.
- Criação do back-end com endpoint /api/chat. ✅ **CONCLUÍDO** - Servidor Express rodando na porta 3001.
- Integração inicial com LLM (OpenAI) e ingestão de base de conhecimento (RAG). ⏳ **PENDENTE** - Por enquanto ecoando mensagens.
- Implementação do fluxo de consentimento LGPD. ✅ **CONCLUÍDO** - Consentimento obrigatório no widget.
- Testes de conversação e validação do fluxo principal. ✅ **CONCLUÍDO** - Fluxo básico testável em localhost:4321 e localhost:3001.
- Responsáveis: Dev Front-end, Dev Back-end
- Prazo sugerido: 2 semanas

## 4. Iteração de Design/Construção (Incrementos)
- Integração com WhatsApp via Twilio (webhook, envio/recebimento de mensagens).
- Aprimoramento do RAG: vetorização de novos documentos, ajuste de prompts.
- Personalização para múltiplos comércios (configuração de persona, base, políticas).
- Implementação de painel administrativo seguro (gestão de FAQs, logs, RBAC).
- Criptografia de dados em trânsito e repouso, variáveis de ambiente (.env).
- Testes automatizados de fluxo e respostas do LLM.
- Responsáveis: Dev Fullstack, DevOps
- Prazo sugerido: 3 semanas

## 5. Implementação e Go-Live
- Deploy do site com widget de chat.
- Configuração do número WhatsApp e webhooks no Twilio.
- Treinamento dos usuários-chave e entrega de documentação.
- Monitoramento inicial, coleta de feedback e ajustes rápidos.
- Responsáveis: DevOps, Suporte, Treinamento
- Prazo sugerido: 1 semana

## 6. Pós-projeto e Manutenção
- Auditorias de segurança e testes de penetração.
- Atualização contínua da base de conhecimento e FAQs.
- Rotina de rotação de chaves e revisão de acessos.
- Relatórios periódicos de uso, satisfação e melhorias.
- Responsáveis: Segurança, Analista de Dados
- Prazo: Contínuo

---

## Próximos Passos Imediatos

### Para Continuar a Fase 3 (MVP):
1. **Integração com LLM**: Substituir eco por OpenAI/Ollama
2. **Base de Conhecimento**: Implementar RAG com LlamaIndex
3. **Banco de Dados**: Conectar PostgreSQL para armazenar conversas
4. **Testes**: Validar fluxo completo com usuários reais

### Para Avançar para Fase 4:
1. **WhatsApp Integration**: Configurar Twilio/Evolution API
2. **Painel Admin**: Interface para gerenciar FAQs e logs
3. **Segurança**: Implementar criptografia e RBAC

### Recomendações:
- Teste o MVP atual com usuários para feedback
- Preencha as variáveis no `.env` com credenciais reais
- Considere usar Ollama para testes gratuitos antes do OpenAI

**Arquivos Atualizados:** Plano_Desenvolvimento_Chatbot.md e Fase 3_ Iteração Funcional (MVP) - Desenvolvimento.md

---

## 🎯 PRÓXIMOS PASSOS PRIORITÁRIOS

### 🔥 **PRIORIDADE 1: Integração com IA Inteligente**
**Objetivo:** Transformar o chatbot de "eco" para assistente inteligente
- ✅ Instalar OpenAI SDK ou Ollama (gratuito)
- ✅ Configurar API key no .env
- ✅ Implementar função de processamento de mensagens
- ✅ Criar sistema de prompts personalizados
- ✅ Integrar com base de conhecimento (RAG)
- **Tempo estimado:** 2-3 dias
- **Impacto:** Alto - Core do negócio

### 🗄️ **PRIORIDADE 2: Banco de Dados PostgreSQL**
**Objetivo:** Persistir dados e habilitar analytics
- ✅ Instalar e configurar PostgreSQL
- ✅ Criar tabelas: users, conversations, messages, faqs
- ✅ Implementar pgvector para busca vetorial
- ✅ Conectar aplicação ao banco
- ✅ Migrar dados existentes
- **Tempo estimado:** 3-4 dias
- **Impacto:** Alto - Dados e relatórios

### 📱 **PRIORIDADE 3: WhatsApp Integration**
**Objetivo:** Atendimento multi-canal
- ✅ Escolher Twilio ou Evolution API (gratuito)
- ✅ Configurar webhook para receber mensagens
- ✅ Implementar envio de respostas
- ✅ Sincronizar conversas entre canais
- ✅ Testar integração completa
- **Tempo estimado:** 4-5 dias
- **Impacto:** Médio-Alto - Expansão de canais

### 🔐 **PRIORIDADE 4: Autenticação e Segurança**
**Objetivo:** Proteger painel administrativo
- ✅ Implementar sistema de login
- ✅ JWT para sessões seguras
- ✅ Roles e permissões (admin, editor, viewer)
- ✅ Proteção de rotas
- ✅ Logs de acesso
- **Tempo estimado:** 3-4 dias
- **Impacto:** Médio - Segurança

### 📊 **PRIORIDADE 5: Analytics e Dashboard**
**Objetivo:** Métricas e insights
- ✅ Dashboard com gráficos em tempo real
- ✅ Métricas: conversas/dia, satisfação, tempo resposta
- ✅ Relatórios exportáveis (PDF/CSV)
- ✅ Análise de sentimento
- ✅ Alertas automáticos
- **Tempo estimado:** 4-5 dias
- **Impacto:** Médio - Business Intelligence

---

## 📈 Roadmap de 30 Dias

### Semana 1-2: Core Intelligence
- Dia 1-3: Integração OpenAI/Ollama
- Dia 4-5: Sistema RAG básico
- Dia 6-7: Prompts e persona
- Dia 8-10: Testes e refinamentos

### Semana 3-4: Infraestrutura e Canais
- Dia 11-14: PostgreSQL + pgvector
- Dia 15-18: WhatsApp integration
- Dia 19-21: Autenticação
- Dia 22-25: Analytics básicos
- Dia 26-30: Testes integrados e deploy

---

## 🎯 Recomendação: Comece pela PRIORIDADE 1

**Por que começar pela IA?**
1. **Valor imediato** - Usuários verão diferença instantânea
2. **Core do produto** - É o que diferencia o chatbot
3. **Fácil implementação** - API direta, sem complexidade
4. **Base para tudo** - Outras features dependem disso

**Sugestão:** Vamos implementar a integração com OpenAI primeiro?

---

### Observações
- Preencha os responsáveis e prazos conforme a equipe e cronograma real.
- Use este arquivo para anotar decisões, pendências e progresso de cada etapa.
