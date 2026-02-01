import React, { useState, useEffect, useRef } from "react";
import { Send, Sparkles, Info } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import LeadForm from "./LeadForm";
import { chatAPI, leadAPI } from "../services/api";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [error, setError] = useState(null);
  const [hasUserMessages, setHasUserMessages] = useState(false);

  const inputRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Initialize chat ONCE
  useEffect(() => {
    initializeChat();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    // Handle page refresh/close
    const handleBeforeUnload = () => {
      if (sessionId && hasUserMessages) {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000/api";
        // Use sendBeacon for reliable cleanup during page unload
        navigator.sendBeacon(`${API_URL}/chat/delete/${sessionId}`);
      }
    };

    // Add listener for page refresh/close
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function (runs on component unmount)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      // Also try cleanup on unmount (for SPA navigation)
      if (sessionId && hasUserMessages) {
        const API_URL =
          process.env.REACT_APP_API_URL || "http://localhost:5000/api";
        navigator.sendBeacon(`${API_URL}/chat/delete/${sessionId}`);
      }
    };
  }, [sessionId, hasUserMessages]);


  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);


  useEffect(() => {
    if (isInitialized && !isTyping && !showLeadForm) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInitialized, isTyping, showLeadForm]);

  const initializeChat = async () => {
    try {
      const response = await chatAPI.initChat();
      setSessionId(response.data.sessionId);
      setMessages([{ role: "assistant", content: response.data.message }]);
      setIsInitialized(true);
    } catch (err) {
      console.error("Failed to initialize chat:", err);
      setError("Failed to start chat. Please refresh the page.");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !sessionId || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setHasUserMessages(true);
    setIsTyping(true);

    try {
      const response = await chatAPI.sendMessage(sessionId, userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.message },
      ]);

      if (
        messages.length >= 6 &&
        !localStorage.getItem(`lead_submitted_${sessionId}`)
      ) {
        setTimeout(() => setShowLeadForm(true), 2000);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLeadSubmit = async (leadData) => {
    try {
      await leadAPI.createLead(leadData);
      localStorage.setItem(`lead_submitted_${sessionId}`, "true");
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Thank you, ${leadData.name}! 🎉 Your info has been submitted.`,
        },
      ]);
    } catch (err) {
      console.error("Failed to submit lead:", err);
      throw err;
    }
  };

  const handleQuickReply = (message) => {
    setInputValue(message);
    // Focus immediately on quick reply
    inputRef.current?.focus();
  };

  if (error)
    return (
      <div className="w-full max-w-4xl h-screen mx-auto flex flex-col bg-white shadow-2xl items-center justify-center p-10 text-center">
        <Info size={48} className="text-gray-400 mb-4" />
        <h3 className="text-2xl font-bold">{error}</h3>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-3 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );

  if (!isInitialized)
    return (
      <div className="w-full max-w-4xl h-screen mx-auto flex flex-col bg-white shadow-2xl items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Initializing chat...</p>
      </div>
    );

  return (
    <div className="w-full max-w-3xl h-screen mx-auto flex flex-col bg-black shadow-lg shadow-gray-600 overflow-hidden relative rounded-2xl border-none">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-red-800 text-white px-6 py-5 flex justify-between items-center shadow-md z-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-700 backdrop-blur-md rounded-xl flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="font-display text-[24px] font-bold leading-tight">
              Iron Lady Advisor
            </h1>
            <p className="text-sm opacity-70">Leadership Program Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-full text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>{" "}
          Online
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 bg-gradient-to-b from-black to-gray-600 flex flex-col gap-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.content}
            isUser={message.role === "user"}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-6 py-3 flex gap-2 overflow-x-auto bg-gray-800 shrink-0 scrollbar-hide justify-between">
          <button
            onClick={() => handleQuickReply("I want to improve my salary")}
            className="flex-shrink-0 px-4 py-2 bg-white border-none rounded-full text-sm hover:bg-primary-light hover:text-white transition-colors"
          >
            💰 Salary Negotiation
          </button>
          <button
            onClick={() => handleQuickReply("I want to switch my career path")}
            className="flex-shrink-0 px-4 py-2 bg-white border-none rounded-full text-sm hover:bg-primary-light hover:text-white transition-colors"
          >
            🚀 Career Transition
          </button>
          <button
            onClick={() =>
              handleQuickReply("Tell me about the Leadership Masterclass")
            }
            className="flex-shrink-0 px-4 py-2 bg-white border-none rounded-full text-sm hover:bg-primary-light hover:text-white transition-colors"
          >
            🎓 Leadership Masterclass
          </button>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="px-6 py-4 bg-white border-t flex gap-3 items-center shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          autoComplete="off"
          className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-3xl text-[16px] focus:outline-none focus:border-primary transition-all"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-transform active:scale-95"
        >
          <Send size={20} />
        </button>
      </form>

      {showLeadForm && (
        <LeadForm
          sessionId={sessionId}
          onSubmit={handleLeadSubmit}
          onClose={() => setShowLeadForm(false)}
        />
      )}

      {/* Footer */}
      <div className="px-6 py-2 text-center bg-gray-50 border-t shrink-0">
        <p className="text-[12px] text-gray-400 uppercase tracking-widest font-semibold">
          Iron Lady AI Advisor
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
