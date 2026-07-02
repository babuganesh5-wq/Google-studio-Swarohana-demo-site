import React, { useState, useEffect, useRef } from "react";
import { ChatMessage } from "../types";
import { Send, Sparkles, User, ShieldAlert, Bot, HelpCircle, RotateCcw } from "lucide-react";

export default function AITutor({
  prefilledPrompt,
  onClearPrefill,
}: {
  prefilledPrompt: string | null;
  onClearPrefill: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize with welcoming message
  useEffect(() => {
    const savedMessages = localStorage.getItem("swarohana_chat_history");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: `Pranam! 🙏 I am **Guru Swarohana**, your virtual Carnatic Music teacher. 

Whether you want to understand the rhythm (Laya), learn a Raga's structure, or review the Swarohana Level 1-3 curriculum, I am here to guide your musical journey.

How can I help you sing or play today?
- *Try selecting one of the preset topics below!*`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  // Save chat to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("swarohana_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Handle external prefilled prompts (from Syllabus Explorer)
  useEffect(() => {
    if (prefilledPrompt) {
      handleSendMessage(prefilledPrompt);
      onClearPrefill(); // Clear it so it doesn't trigger again on re-renders
    }
  }, [prefilledPrompt]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    setErrorMsg(null);
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    };

    // Update messages with user's input
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Gather history for context
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: text,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      
      const modelMessage: ChatMessage = {
        id: `model_${Date.now()}`,
        role: "model",
        content: data.text,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error("Failed to connect to AI tutor:", err);
      setErrorMsg(
        err.message || "An unexpected network error occurred. Please make sure the backend is active."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your conversation history?")) {
      localStorage.removeItem("swarohana_chat_history");
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: `Pranam! 🙏 I am **Guru Swarohana**, your virtual Carnatic Music teacher.

Whether you want to understand the rhythm (Laya), learn a Raga's structure, or review the Swarohana Level 1-3 curriculum, I am here to guide your musical journey.`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const presetTopics = [
    { label: "What is Melakarta?", prompt: "Could you explain the Melakarta raga system in simple terms?" },
    { label: "Sarali Varisai notation", prompt: "Explain the notation for Sarali Varisai 1 in Mayamalavagowla raga." },
    { label: "Vocal health tips", prompt: "What are some voice culture exercises I can do daily to improve voice depth?" },
    { label: "How is Adi Thalam kept?", prompt: "Describe the finger movements and claps for the 8 beats of Adi Thalam." },
  ];

  // Helper to render customized text styling (regex parser)
  const renderMessageContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // 1. Detect code notation block (starts/ends with backticks, or is entirely swaras)
      const isNotationLine = /^[S R G M P D N S'\s|,|-]+$/i.test(line.trim()) && line.trim().length > 3;
      if (isNotationLine) {
        return (
          <div
            key={idx}
            className="my-1.5 font-mono text-xs text-brand-yellow-400 bg-brand-brown-950 px-3 py-1.5 rounded-lg border border-brand-brown-800 tracking-widest inline-block whitespace-pre select-all shadow-inner"
          >
            {line}
          </div>
        );
      }

      // 2. Bold tags (**text**)
      let formattedLine = line;
      const boldRegex = /\*\*(.*?)\*\*/g;
      const elements: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        const textBefore = line.substring(lastIndex, match.index);
        const boldText = match[1];
        
        if (textBefore) {
          elements.push(textBefore);
        }
        elements.push(<strong key={match.index} className="font-extrabold text-brand-brown-900">{boldText}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        elements.push(line.substring(lastIndex));
      }

      const finalContent = elements.length > 0 ? elements : line;

      // 3. Bullet points (starts with - or *)
      if (line.trim().startsWith("-") || line.trim().startsWith("*")) {
        // Strip the bullet character
        const contentStr = line.replace(/^[\s-*]+/, "");
        return (
          <li key={idx} className="ml-4 list-disc pl-1 text-sm leading-relaxed mb-1">
            {contentStr}
          </li>
        );
      }

      // Default paragraph
      return (
        <p key={idx} className="text-sm leading-relaxed mb-2 break-words">
          {finalContent}
        </p>
      );
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-brand-brown-100 flex flex-col h-[650px] overflow-hidden">
      {/* CHAT HEADER */}
      <div className="px-6 py-4 bg-brand-brown-50 border-b border-brand-brown-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-yellow-500 flex items-center justify-center text-white shadow-sm relative">
            <Bot className="w-5 h-5" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-brand-brown-900">Guru Swarohana AI</h3>
              <span className="bg-brand-yellow-100 text-brand-yellow-800 text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-md">
                Tutor
              </span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">Swarohana Classical Music Academy Mentor</p>
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClearHistory}
          title="Reset conversation"
          className="p-2 rounded-xl text-gray-400 hover:text-brand-brown-900 hover:bg-brand-brown-100 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* MESSAGES VIEW */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-brown-50/20">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
              {/* Bot Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-brand-yellow-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-xs ${
                  isUser
                    ? "bg-brand-brown-900 text-white rounded-tr-none"
                    : "bg-white text-brand-brown-800 border border-brand-brown-100 rounded-tl-none"
                }`}
              >
                {isUser ? (
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{m.content}</p>
                ) : (
                  <div>{renderMessageContent(m.content)}</div>
                )}
                <span
                  className={`text-[9px] block text-right mt-1 opacity-50 font-mono ${
                    isUser ? "text-brand-yellow-200" : "text-gray-400"
                  }`}
                >
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-brand-yellow-500 text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* LOADING STATE */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-brand-brown-900 text-brand-yellow-500 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-brand-brown-100 flex items-center gap-2 shadow-xs">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-brand-brown-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-brand-brown-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-brand-brown-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="text-xs text-gray-400 italic">Guru is thinking...</span>
            </div>
          </div>
        )}

        {/* SYSTEM/API KEY CONFIGURE WARNING CARD */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 text-red-800">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm">Connection/Configuration Error</h4>
              <p className="text-xs opacity-90 leading-relaxed">
                {errorMsg.includes("GEMINI_API_KEY") ? (
                  <>
                    The **GEMINI_API_KEY** environment variable is missing. Please head over to the **Settings Panel** (API Keys) in AI Studio and add your API key, then restart the application to enable the AI Music Tutor.
                  </>
                ) : (
                  errorMsg
                )}
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK PRESETS & BOTTOM INPUT */}
      <div className="p-4 border-t border-brand-brown-100 bg-white space-y-3">
        {/* Presets - only show when no messages except welcome, or just minor helpers */}
        {messages.length <= 1 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-brand-brown-500 uppercase tracking-widest block flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Quick Practice Prompts
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetTopics.map((pt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(pt.prompt)}
                  className="bg-brand-brown-50 hover:bg-brand-yellow-100 hover:text-brand-brown-900 border border-brand-brown-100 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all"
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Guru Swarohana anything about Carnatic music..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-2xl focus:outline-none focus:border-brand-yellow-500 focus:ring-2 focus:ring-brand-yellow-50 transition-all text-brand-brown-900"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-11 h-11 bg-brand-yellow-500 hover:bg-brand-yellow-600 disabled:bg-gray-200 text-white disabled:text-gray-400 rounded-2xl flex items-center justify-center transition-all shadow-sm"
          >
            <Send className="w-4 h-4 fill-current" />
          </button>
        </form>
      </div>
    </div>
  );
}
