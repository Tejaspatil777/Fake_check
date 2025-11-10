import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Shield, AlertTriangle, Info, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI security assistant. I can help you identify threats, explain security concepts, and provide real-time analysis. How can I help you stay safe today?',
      timestamp: new Date(),
      suggestions: ['How do I spot phishing?', 'Check a suspicious link', 'What are common scams?']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();

    // Phishing detection
    if (lowerMessage.includes('phishing') || lowerMessage.includes('phish')) {
      return {
        content: '🎣 Phishing attacks try to steal your information by pretending to be legitimate. Key signs:\n\n• Urgent language ("Act now!")\n• Requests for passwords or sensitive data\n• Suspicious sender addresses\n• Links to unfamiliar websites\n• Poor grammar or spelling\n\nAlways verify the sender through official channels before clicking links or sharing information.',
        suggestions: ['How to verify a sender?', 'Check a suspicious email', 'Report phishing']
      };
    }

    // Scam detection
    if (lowerMessage.includes('scam') || lowerMessage.includes('fraud')) {
      return {
        content: '🚨 Common scam warning signs:\n\n• Too good to be true offers\n• Pressure to act immediately\n• Requests for gift cards or wire transfers\n• Impersonation of government agencies\n• Unsolicited prize or refund claims\n\nLegitimate organizations won\'t pressure you or ask for unusual payment methods. When in doubt, contact them directly using official contact information.',
        suggestions: ['Types of scams', 'What if I was scammed?', 'How to report scams']
      };
    }

    // URL/Link checking
    if (lowerMessage.includes('link') || lowerMessage.includes('url') || lowerMessage.includes('website')) {
      return {
        content: '🔗 To check if a link is safe:\n\n1. Hover over the link (don\'t click!) to see the actual URL\n2. Check for HTTPS and the padlock icon\n3. Verify the domain name is correct\n4. Look for misspellings or extra characters\n5. Use FakeCheck to scan the URL\n\nShortened URLs (bit.ly, tinyurl) can hide the real destination. Be extra careful with these!',
        suggestions: ['Check a link now', 'What is HTTPS?', 'URL shortener safety']
      };
    }

    // Phone number checking
    if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('number')) {
      return {
        content: '📞 Phone scam protection tips:\n\n• Don\'t answer calls from unknown numbers\n• Legitimate companies won\'t ask for passwords by phone\n• Government agencies don\'t call demanding immediate payment\n• Use caller ID and reverse lookup tools\n• Block suspicious numbers\n\nIf you receive a suspicious call, hang up and contact the organization directly using their official number.',
        suggestions: ['Check a phone number', 'Block spam calls', 'Caller ID spoofing']
      };
    }

    // Password/security
    if (lowerMessage.includes('password') || lowerMessage.includes('secure')) {
      return {
        content: '🔐 Password security best practices:\n\n• Use unique passwords for each account\n• Make passwords long (12+ characters)\n• Use a password manager\n• Enable two-factor authentication\n• Never share passwords via email or text\n\nA strong password should be unpredictable and memorable only to you!',
        suggestions: ['Two-factor authentication', 'Password manager tips', 'Password strength']
      };
    }

    // Two-factor authentication
    if (lowerMessage.includes('2fa') || lowerMessage.includes('two-factor') || lowerMessage.includes('authentication')) {
      return {
        content: '🛡️ Two-Factor Authentication (2FA) adds an extra security layer:\n\n• Something you know (password)\n• Something you have (phone, security key)\n\nEnable 2FA on:\n• Email accounts\n• Banking apps\n• Social media\n• Shopping sites\n\nUse authenticator apps over SMS when possible for better security!',
        suggestions: ['Setup 2FA guide', 'Best authenticator apps', 'SMS vs app 2FA']
      };
    }

    // Social engineering
    if (lowerMessage.includes('social engineering') || lowerMessage.includes('manipulation')) {
      return {
        content: '🎭 Social engineering attacks manipulate people into revealing information:\n\n• Pretexting (creating false scenarios)\n• Baiting (offering something tempting)\n• Tailgating (following into secure areas)\n• Impersonation (posing as authority)\n\nDefense: Always verify identities, don\'t be pressured by urgency, and trust your instincts!',
        suggestions: ['Real-world examples', 'How to verify identity', 'Report social engineering']
      };
    }

    // Email security
    if (lowerMessage.includes('email')) {
      return {
        content: '📧 Email security essentials:\n\n• Check sender addresses carefully\n• Don\'t click suspicious attachments\n• Verify links before clicking\n• Use spam filters\n• Report phishing attempts\n\nRemember: Your email provider will never ask for your password via email!',
        suggestions: ['Spot fake emails', 'Email encryption', 'Spam vs phishing']
      };
    }

    // Data breach
    if (lowerMessage.includes('breach') || lowerMessage.includes('leaked') || lowerMessage.includes('hacked')) {
      return {
        content: '💔 If your data was breached:\n\n1. Change your password immediately\n2. Enable 2FA on the affected account\n3. Monitor for suspicious activity\n4. Check if other accounts use the same password\n5. Consider credit monitoring\n\nUse haveibeenpwned.com to check if your email was in a known breach.',
        suggestions: ['Check my email', 'Password change guide', 'Credit monitoring']
      };
    }

    // Check/scan something
    if (lowerMessage.includes('check') || lowerMessage.includes('scan') || lowerMessage.includes('analyze')) {
      return {
        content: '🔍 I can help you check threats! Use the main form above to:\n\n• Scan phone numbers for spam/scam indicators\n• Analyze URLs for phishing and malware\n• Check messages for suspicious content\n\nThe AI will provide real-time analysis and security recommendations based on advanced pattern matching.',
        suggestions: ['Start scanning', 'How accurate is it?', 'What do you check for?']
      };
    }

    // Help or general inquiry
    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
      return {
        content: '🤝 I can help you with:\n\n• Identifying phishing and scams\n• Checking suspicious links and numbers\n• Understanding security concepts\n• Learning protection strategies\n• Real-time threat analysis\n\nJust ask me anything about online security, or use the suggestions below!',
        suggestions: ['Security basics', 'Common threats', 'Protection tips']
      };
    }

    // Default response
    return {
      content: '🤖 I understand you\'re asking about security. Here are some key things I can help with:\n\n• Threat detection and analysis\n• Security best practices\n• Scam identification\n• Safe browsing tips\n• Privacy protection\n\nCould you be more specific about what you\'d like to know?',
      suggestions: ['Phishing detection', 'Scam types', 'Security tips', 'Check a threat']
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 800));

    const aiResponse = generateAIResponse(input);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse.content,
      timestamp: new Date(),
      suggestions: aiResponse.suggestions
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSend();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 relative"
            >
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-purple-500 items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </span>
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-2 border-purple-200 dark:border-purple-800 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white">AI Security Assistant</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-purple-100">Online</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Powered by Advanced AI
                </Badge>
              </div>

              {/* Messages */}
              <ScrollArea className="h-96 p-4 bg-slate-50 dark:bg-slate-950">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl p-3 ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        {/* Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full justify-start text-xs h-auto py-2 bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-950/20"
                              >
                                <Sparkles className="w-3 h-3 mr-1.5 text-purple-600 dark:text-purple-400" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about security threats..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    size="icon"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                  AI assistant for security education • Not for emergencies
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
