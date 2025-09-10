import React, { useState, useRef, useEffect } from 'react';

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot'; timestamp: Date }[]>([]);
  const [input, setInput] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!consentGiven) {
      alert('Por favor, dê consentimento para continuar.');
      return;
    }

    const userMessage = {
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      const botMessage = {
        text: data.reply,
        sender: 'bot' as const,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const errorMessage = {
        text: 'Desculpe, houve um erro na conexão. Tente novamente.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
        }}
        onClick={() => setIsMinimized(false)}
      >
        <span style={{ color: 'white', fontSize: '24px' }}>💬</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '350px',
        height: '500px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        border: '1px solid #e1e5e9',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '16px',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
            Atendente Virtual
          </h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>
            Online • Resposta rápida
          </p>
        </div>
        <button
          onClick={() => setIsMinimized(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          −
        </button>
      </div>

      {/* Messages Area */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
        }}
      >
        {!consentGiven ? (
          <div
            style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', color: '#856404' }}>
              🔒 Política de Privacidade
            </h4>
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#856404' }}>
              Para usar o chatbot, você concorda com nossa política de privacidade (LGPD).
              Seus dados são protegidos e usados apenas para atendimento.
            </p>
            <button
              onClick={() => setConsentGiven(true)}
              style={{
                backgroundColor: '#ffc107',
                color: '#212529',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              ✅ Concordo
            </button>
          </div>
        ) : (
          <>
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div
                style={{
                  backgroundColor: '#e3f2fd',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '16px',
                  border: '1px solid #bbdefb',
                }}
              >
                <p style={{ margin: 0, color: '#1976d2', fontSize: '14px' }}>
                  👋 Olá! Sou seu atendente virtual. Como posso ajudar você hoje?
                </p>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    backgroundColor: msg.sender === 'user' ? '#007bff' : 'white',
                    color: msg.sender === 'user' ? 'white' : '#333',
                    border: msg.sender === 'bot' ? '1px solid #e1e5e9' : 'none',
                    boxShadow: msg.sender === 'bot' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                    {msg.text}
                  </p>
                  <span
                    style={{
                      fontSize: '11px',
                      opacity: 0.7,
                      marginTop: '4px',
                      display: 'block',
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e1e5e9',
                    borderRadius: '18px 18px 18px 4px',
                    padding: '12px 16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#007bff',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite',
                      }}
                    />
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#007bff',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite 0.2s',
                      }}
                    />
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#007bff',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite 0.4s',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      {consentGiven && (
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid #e1e5e9',
            backgroundColor: 'white',
            borderRadius: '0 0 12px 12px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '1px solid #ced4da',
                borderRadius: '24px',
                outline: 'none',
                fontSize: '14px',
              }}
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              style={{
                padding: '12px 20px',
                backgroundColor: isTyping || !input.trim() ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: isTyping || !input.trim() ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'background-color 0.2s',
              }}
            >
              {isTyping ? '⏳' : '📤'}
            </button>
          </div>
        </div>
      )}

      {/* CSS for typing animation */}
      <style>
        {`
          @keyframes typing {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChatWidget;
