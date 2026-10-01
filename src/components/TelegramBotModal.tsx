import React, { useState } from 'react';
import { Send, Smartphone, CheckCheck, Bot, User, Bell, ArrowRight, CornerDownLeft } from 'lucide-react';

interface TelegramBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  isAlert?: boolean;
}

export const TelegramBotModal: React.FC<TelegramBotModalProps> = ({ isOpen, onClose }) => {
  const [activeBot, setActiveBot] = useState<'parent' | 'teacher' | 'dean'>('parent');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [parentMessages, setParentMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "👋 Assalomu alaykum, Bahrom aka! Farzandingiz Dilshod Rasulov soat 08:30 da 104-auditoriyaga (Biznes inkubator) kirdi (Face ID orqali tasdiqlandi). Fan: Tadbirkorlik asoslari.",
      time: '08:31'
    },
    {
      id: 'm2',
      sender: 'bot',
      text: "⚠️ Ogohlantirish: Farzandingiz oxirgi 15 daqiqa davomida smartfondan ko'p foydalangani videokuzatuv orqali qayd etildi.",
      time: '08:48',
      isAlert: true
    }
  ]);

  const [teacherMessages, setTeacherMessages] = useState<ChatMessage[]>([
    {
      id: 't1',
      sender: 'bot',
      text: "Assalomu alaykum, Dots. Farhod Boboyev! 104-auditoriyadagi ma'ruzangiz bo'yicha oraliq tahlil: 34/36 talaba qatnashmoqda, diqqat indeksi 88%.",
      time: '09:15'
    }
  ]);

  const [deanMessages, setDeanMessages] = useState<ChatMessage[]>([
    {
      id: 'd1',
      sender: 'bot',
      text: "DTPI Dekanat xabari: 1-smenadagi 20 ta auditoriyaning barchasida darslar o'z vaqtida boshlandi. 305-auditoriyada 2 nafar talaba kelmagani aniqlandi.",
      time: '09:30'
    }
  ]);

  if (!isOpen) return null;

  const currentMessages = activeBot === 'parent' ? parentMessages : activeBot === 'teacher' ? teacherMessages : deanMessages;

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toTimeString().slice(0, 5)
    };

    if (activeBot === 'parent') {
      setParentMessages(prev => [...prev, userMsg]);
    } else if (activeBot === 'teacher') {
      setTeacherMessages(prev => [...prev, userMsg]);
    } else {
      setDeanMessages(prev => [...prev, userMsg]);
    }

    setInputText('');
    setIsTyping(true);

    // Simulated Bot Reply
    setTimeout(() => {
      let botReply = "Buyrug'ingiz qabul qilindi. EduVision bazasi tekshirilmoqda...";
      const lower = text.toLowerCase();

      if (lower.includes('/davomat') || lower.includes('davomat')) {
        botReply = "📊 Bugungi davomat: Farzandingiz Dilshod darsda. Haftalik davomati 67% (70% dan past - nazorat talab qilinadi).";
      } else if (lower.includes('/diqqat') || lower.includes('diqqat')) {
        botReply = "🎯 Diqqat tahlili: 104-auditoriyada so'nggi 30 daqiqada talaba diqqati 62% ni tashkil qildi. Smartfondan foydalanish qayd etildi.";
      } else if (lower.includes('/jadval') || lower.includes('dars')) {
        botReply = "📅 Bugungi DTPI jadvali: 1-juftlik: Tadbirkorlik asoslari (104-aud), 2-juftlik: Boshlang'ich ta'lim metodikasi (212-aud).";
      } else if (lower.includes('/kpi') || lower.includes('reyting')) {
        botReply = "🌟 O'qituvchi KPI balingiz: 95.6 ball (DTPI reytingida Top-1). Dars sifati 94%, talabalar fikr-mulohazasi: 4.90/5.0.";
      } else {
        botReply = `Xabaringiz qabul qilindi: "${text}". EduVision DTPI sun'iy intellekt tizimi dekanat va mas'ullarga ma'lumot uzatdi.`;
      }

      const replyMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        time: new Date().toTimeString().slice(0, 5)
      };

      if (activeBot === 'parent') {
        setParentMessages(prev => [...prev, replyMsg]);
      } else if (activeBot === 'teacher') {
        setTeacherMessages(prev => [...prev, replyMsg]);
      } else {
        setDeanMessages(prev => [...prev, replyMsg]);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">EduVision Telegram Bot Ekotizimi</h3>
              <p className="text-xs text-slate-400">Har bir bo'lim uchun ixtisoslashgan botlar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-2 py-1 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Bot selector segmented tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveBot('parent')}
            className={`flex-1 py-1.5 rounded-lg transition-colors font-medium ${
              activeBot === 'parent' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ota-onalar boti
          </button>
          <button
            onClick={() => setActiveBot('teacher')}
            className={`flex-1 py-1.5 rounded-lg transition-colors font-medium ${
              activeBot === 'teacher' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            O'qituvchilar boti
          </button>
          <button
            onClick={() => setActiveBot('dean')}
            className={`flex-1 py-1.5 rounded-lg transition-colors font-medium ${
              activeBot === 'dean' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dekanat boti
          </button>
        </div>

        {/* Quick Commands Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <span className="text-slate-500 whitespace-nowrap">Buyruqlar:</span>
          {activeBot === 'parent' ? (
            <>
              <button onClick={() => handleSendMessage('/davomat')} className="px-2 py-0.5 rounded bg-slate-800 text-blue-300 hover:bg-slate-700 whitespace-nowrap cursor-pointer">/davomat</button>
              <button onClick={() => handleSendMessage('/diqqat')} className="px-2 py-0.5 rounded bg-slate-800 text-blue-300 hover:bg-slate-700 whitespace-nowrap cursor-pointer">/diqqat</button>
              <button onClick={() => handleSendMessage('/jadval')} className="px-2 py-0.5 rounded bg-slate-800 text-blue-300 hover:bg-slate-700 whitespace-nowrap cursor-pointer">/jadval</button>
            </>
          ) : (
            <>
              <button onClick={() => handleSendMessage('/kpi')} className="px-2 py-0.5 rounded bg-slate-800 text-blue-300 hover:bg-slate-700 whitespace-nowrap cursor-pointer">/kpi</button>
              <button onClick={() => handleSendMessage('/davomat')} className="px-2 py-0.5 rounded bg-slate-800 text-blue-300 hover:bg-slate-700 whitespace-nowrap cursor-pointer">/davomat</button>
            </>
          )}
        </div>

        {/* Telegram Chat Simulation Screen */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 font-sans flex-1 overflow-y-auto min-h-[220px]">
          {currentMessages.map(msg => (
            <div 
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 text-xs font-bold ${
                msg.sender === 'user' ? 'bg-cyan-600' : msg.isAlert ? 'bg-rose-600' : 'bg-blue-600'
              }`}>
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : msg.isAlert ? '⚠️' : 'EV'}
              </div>

              <div className={`p-3 text-xs rounded-2xl space-y-1 ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : msg.isAlert 
                  ? 'bg-rose-950/40 border border-rose-800/60 text-rose-200 rounded-tl-none' 
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <p>{msg.text}</p>
                <div className={`text-right text-[9px] flex items-center justify-end gap-1 ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                }`}>
                  <span>{msg.time}</span>
                  <CheckCheck className="w-3 h-3 text-blue-300" />
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic pl-9">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-ping"></span>
              <span>EduVision Bot yozmoqda...</span>
            </div>
          )}
        </div>

        {/* Interactive Chat Input */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-1"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Xabar yoki buyruq yozing (/davomat, /diqqat)..."
            className="flex-1 px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
            title="Yuborish"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
