import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex gap-3 mb-5 animate-fade-in ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${
        isUser 
          ? 'bg-gradient-to-br from-gray-900 to-blue-500' 
          : 'bg-gradient-to-br from-primary to-primary-dark'
      }`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      {/* Message Content */}
      <div className={`max-w-[70%] flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Message Bubble */}
        <div className={`px-4 py-3 rounded-2xl shadow-sm leading-relaxed text-[15px] break-words whitespace-pre-wrap ${
          isUser
            ? 'bg-gradient-to-br from-yellow-400 to-violet-400 text-black rounded-br-sm'
            : 'bg-gradient-to-br from-cyan-900 to-purple-800 text-white rounded-bl-sm'
        }`}>
          {message}
        </div>

        {/* Timestamp */}
        <div className="text-[11px] text-gray-100 px-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
