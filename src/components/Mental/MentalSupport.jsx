import React, { useState, useEffect, useRef } from "react";
import Groq from "groq-sdk";
import { Send, Loader2, AlertTriangle, PenTool, Eye, FileText, Lightbulb } from "lucide-react";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });

const CustomAlert = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
    <div className="flex items-center">
      <AlertTriangle className="h-5 w-5 mr-2" />
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

const SuggestionCard = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
  >
    {icon}
    <p className="mt-2 text-sm text-gray-600 text-center">{text}</p>
  </button>
);

const MentalSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content = input) => {
    if (!content.trim()) return;

    const userMessage = { role: "user", content: content.trim() };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await getGroqChatCompletion(userMessage.content);
      const botMessage = {
        role: "assistant",
        content: response.choices[0]?.message?.content || "I apologize, but I didn't understand that. Could you please rephrase?",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setError("An error occurred while fetching the response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getGroqChatCompletion = async (userInput) => {
    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an empathetic and supportive AI assistant designed to help former inmates reintegrate into society by offering real-time emotional support. 
          Your primary goal is to engage in conversational therapy, listen attentively, and provide constructive guidance that addresses the emotional and mental challenges faced by ex-cons during their reintegration process. 
          Offer motivational guidance, coping mechanisms, and resources tailored to their unique experiences. (use less than 150 words and make it short and sweet)`
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      model: "mixtral-8x7b-32768",
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow-xl rounded-xl">
      <div className="flex justify-center mb-8">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 0C11.193 0 0 11.193 0 25C0 38.807 11.193 50 25 50C38.807 50 50 38.807 50 25C50 11.193 38.807 0 25 0ZM25 45C13.954 45 5 36.046 5 25C5 13.954 13.954 5 25 5C36.046 5 45 13.954 45 25C45 36.046 36.046 45 25 45Z" fill="#4A5568"/>
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Reintegration Support Chat</h2>

      {messages.length === 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-12">
          <SuggestionCard 
            icon={<PenTool className="h-8 w-8 text-blue-500" />} 
            text="Share your feelings about reintegration"
            onClick={() => handleSend("I'm feeling anxious about reintegrating into society. Can you help?")}
          />
          <SuggestionCard 
            icon={<Eye className="h-8 w-8 text-green-500" />} 
            text="Discuss coping with societal judgment"
            onClick={() => handleSend("How can I deal with people judging me for my past?")}
          />
          <SuggestionCard 
            icon={<FileText className="h-8 w-8 text-yellow-500" />} 
            text="Get advice on job searching"
            onClick={() => handleSend("I'm struggling to find employment. Any advice?")}
          />
          <SuggestionCard 
            icon={<Lightbulb className="h-8 w-8 text-purple-500" />} 
            text="Learn about support resources"
            onClick={() => handleSend("What resources are available to help me reintegrate?")}
          />
        </div>
      ) : (
        <div ref={chatContainerRef} className="h-96 bg-gray-100 p-4 mb-6 rounded-lg overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800 shadow"
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center justify-center text-gray-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </div>
          )}
        </div>
      )}

      {error && <CustomAlert message={error} />}

      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center mt-20 mb-12">
        <input
          type="text"
          className="flex-1 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="How are you feeling today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={loading || !input.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500 text-center">
        Remember, this is a supportive space. If you need immediate assistance, please contact your support worker or local emergency services.
      </p>
    </div>
  );
};

export default MentalSupport;