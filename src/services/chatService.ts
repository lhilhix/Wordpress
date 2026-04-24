import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  Timestamp, 
  doc, 
  setDoc,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GoogleGenAI } from "@google/genai";
import { getSiteSettings, getProducts } from './productService';

export interface ChatMessage {
  id?: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: any;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const CHAT_SESSIONS_COLLECTION = 'chatSessions';

export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('pb_chat_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('pb_chat_session_id', sessionId);
  }
  return sessionId;
};

export const subscribeToMessages = (sessionId: string, callback: (messages: ChatMessage[]) => void) => {
  const q = query(
    collection(db, CHAT_SESSIONS_COLLECTION, sessionId, 'messages'), 
    orderBy('timestamp', 'asc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ChatMessage));
    callback(messages);
  });
};

export const sendMessage = async (sessionId: string, content: string) => {
  // 1. Save user message to Firestore
  const messageData = {
    role: 'user',
    content,
    timestamp: Timestamp.now()
  };
  
  const sessionRef = doc(db, CHAT_SESSIONS_COLLECTION, sessionId);
  await setDoc(sessionRef, {
    updatedAt: Timestamp.now(),
    lastMessage: content
  }, { merge: true });
  
  await addDoc(collection(db, CHAT_SESSIONS_COLLECTION, sessionId, 'messages'), messageData);
  
  // 2. Get AI response
  try {
    const settings = await getSiteSettings();
    const products = await getProducts();
    
    const productInfo = products.map(p => `
- Produto: ${p.name}
  Categoria: ${p.category} | Indústria: ${p.industry}
  Descrição: ${p.description}
  Detalhes: ${p.detailedDescription || 'N/A'}
  Especificações: ${p.specifications ? p.specifications.replace(/\n/g, ', ') : 'N/A'}
`).join('\n');
    
    const systemInstruction = `
      Você é o Assistente Virtual da Plásticos Bueso, uma empresa líder em moldagem por injeção de precisão em Braga, Portugal.
      Sua missão é ajudar os clientes com dúvidas técnicas, informações sobre produtos e orçamentos.
      
      Informações da Empresa:
      - Localização: Braga, Portugal.
      - História: Mais de 35 anos de experiência.
      - Foco: Componentes de alto desempenho para as indústrias automóvel, médica e eletrónica.
      - Qualidade: Certificação ISO 9001, filosofia de defeito zero.
      - Contato: ${settings?.contactEmail || 'contacto@plasticosbueso.pt'}, ${settings?.contactPhone || '+351 253 000 000'}.
      
      Sobre: ${settings?.aboutText || 'Empresa de precisão.'}
      
      Produtos em Catálogo:
      ${productInfo}
      
      Diretrizes de resposta:
      - Seja profissional, técnico e prestativo.
      - Responda em Português de Portugal (PT-PT).
      - Se perguntarem sobre orçamentos, sugira usar o botão "Solicitar Orçamento" ou forneça os contatos.
      - Se não souber algo técnico específico, sugira falar com um engenheiro.
    `;

    // Fetch existing messages for context
    const messagesSnapshot = await getDocs(query(
      collection(db, CHAT_SESSIONS_COLLECTION, sessionId, 'messages'),
      orderBy('timestamp', 'desc')
    ));
    
    let aiContent = "";
    const provider = settings?.chatProvider || "google";
    const apiKey = settings?.chatApiKey || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : "") || "";
    
    if (provider === "openai") {
      const endpoint = settings?.chatEndpoint || "https://api.openai.com/v1/chat/completions";
      const model = settings?.chatModel || "gpt-4o-mini";
      
      const payloadMessages = [
        { role: "system", content: systemInstruction },
        ...messagesSnapshot.docs.reverse().map(doc => ({
          role: doc.data().role === 'user' ? 'user' : 'assistant',
          content: doc.data().content
        }))
      ];
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: payloadMessages
        })
      });
      
      if (!res.ok) {
        const errText = await res.text();
        console.error("OpenAI Endpoint error:", errText);
        throw new Error(`OpenAI API error: ${res.statusText}`);
      }
      
      const data = await res.json();
      aiContent = data.choices?.[0]?.message?.content || "Desculpe, não consegui obter uma resposta.";
      
    } else {
      // Default to Google Gemini (GenAI SDK)
      const customAi = new GoogleGenAI({ apiKey });
      const model = settings?.chatModel || "gemini-3-flash-preview";

      const history = messagesSnapshot.docs.reverse().map(doc => ({
        role: doc.data().role === 'user' ? 'user' : 'model',
        parts: [{ text: doc.data().content }]
      }));
      
      const response = await customAi.models.generateContent({
        model: model,
        contents: history,
        config: {
          systemInstruction
        }
      });
      
      aiContent = response.text || "Desculpe, ocorreu um erro ao processar sua resposta.";
    }

    // 3. Save AI response to Firestore
    await addDoc(collection(db, CHAT_SESSIONS_COLLECTION, sessionId, 'messages'), {
      role: 'model',
      content: aiContent,
      timestamp: Timestamp.now()
    });

  } catch (error) {
    console.error("AI Chat Error:", error);
    await addDoc(collection(db, CHAT_SESSIONS_COLLECTION, sessionId, 'messages'), {
      role: 'model',
      content: "Pedimos desculpa, mas estamos com dificuldades técnicas no momento. Por favor, tente contactar-nos via email ou telefone.",
      timestamp: Timestamp.now()
    });
  }
};
