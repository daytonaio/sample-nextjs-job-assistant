import React, { useState } from "react";
import { Link } from "react-router-dom";
import Groq from "groq-sdk";
import { ArrowLeft, FileText, Briefcase, Home, Shield, BookOpen } from "lucide-react";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ apiKey: apiKey, dangerouslyAllowBrowser: true });

const SuggestionCard = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
  >
    {icon}
    <p className="mt-2 text-sm text-gray-600 text-center">{text}</p>
  </button>
);

const LegalSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const categories = [
    { id: 1, name: "Employment Rights", icon: <Briefcase className="h-8 w-8 text-blue-500" /> },
    { id: 2, name: "Housing", icon: <Home className="h-8 w-8 text-green-500" /> },
    { id: 3, name: "Probation", icon: <Shield className="h-8 w-8 text-red-500" /> },
    { id: 4, name: "Record Expungement", icon: <FileText className="h-8 w-8 text-yellow-500" /> },
    { id: 5, name: "Legal Education", icon: <BookOpen className="h-8 w-8 text-purple-500" /> },
  ];

  const questionsPerCategory = {
    1: ["What are my rights after a conviction?", "Can I be fired due to my record?"],
    2: ["Am I eligible for public housing?", "How do I apply for housing with a criminal record?"],
    3: ["What is probation?", "What happens if I violate probation?"],
    4: ["Can I get my record expunged?", "What are the steps for expungement?"],
    5: ["What resources can help me understand my legal rights?"],
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setQuestions(questionsPerCategory[categoryId] || []);
  };

  const handleQuestionSelect = async (question) => {
    setLoading(true);
    setResponse("");

    try {
      const result = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a helpful AI designed to provide legal guidance and support for ex-cons on topics like employment rights, housing, probation, and more. Give clear, concise answers to legal questions. (within 100 words)`
          },
          {
            role: "user",
            content: question,
          }
        ],
        model: "llama3-8b-8192",
      });

      const aiResponse = result.choices[0]?.message?.content || "I apologize, I couldn't find a response. Please try again.";
      setResponse(aiResponse);
    } catch (error) {
      setResponse("An error occurred while fetching the response. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Legal Support</h2>

      {!selectedCategory ? (
        <div className="grid grid-cols-2 gap-4 mb-12">
          {categories.map((category) => (
            <SuggestionCard
              key={category.id}
              icon={category.icon}
              text={category.name}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Select a question in "{categories.find(cat => cat.id === selectedCategory)?.name}"</h3>

          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 p-2 bg-orange-400 rounded-lg hover:bg-orange-600 transition-colors my-6"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600">Back</span>
          </button>


          <div className="grid grid-cols-1 gap-4">
            {questions.map((question, index) => (
              <button
                key={index}
                className="p-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
                onClick={() => handleQuestionSelect(question)}
              >
                {question}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="mt-6 flex justify-center text-gray-500">
              <div className="loader">Loading...</div>
            </div>
          ) : (
            response && (
              <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                <p>{response}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default LegalSupport;
