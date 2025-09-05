import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, User } from 'lucide-react';
import BotMessage from './components/BotMessage';
import { KoziAI } from './services/koziAI';

const __app_id = typeof window !== "undefined" ? window.__app_id : "default-app-id";

// This is the single-file React component for the chatbot.
// It's designed to be a self-contained application.

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botMessage = await KoziAI.sendMessage(input, messages);
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching from API:', error);
      setModalMessage('An error occurred. Please try again later.');
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] transition-all duration-300 transform scale-95 md:scale-100">

        {/* Header inspired by Kozi dashboard */}
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center space-x-2">
            <Bot size={24} />
            <span className="text-xl font-bold">Kozi AI Agent</span>
          </div>
          <button onClick={() => showModal("This is a placeholder for a close action.")} className="p-1 rounded-full hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 p-4">
              <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-xl max-w-xs animate-fadeIn">
                <p>Hello! I'm the Kozi AI Agent. Ask me anything about Kozi's services, the hiring process, or how to get started.</p>
              </div>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              {msg.sender === 'bot' ? (
                <BotMessage message={msg.text} />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-blue-500 text-white rounded-lg rounded-br-none max-w-xs md:max-w-md ml-auto">
                  <p>{msg.text}</p>
                  <User size={20} className="flex-shrink-0" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="p-4 flex justify-center items-center">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-4 h-4 border-2 border-t-2 border-gray-400 rounded-full animate-spin"></div>
              <span>Typing...</span>
            </div>
          </div>
        )}

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Send size={24} />
          </button>
        </form>

      </div>

      {/* Custom Modal for alerts */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm text-center">
            <p className="text-gray-900 dark:text-white text-lg font-semibold mb-4">{modalMessage}</p>
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
