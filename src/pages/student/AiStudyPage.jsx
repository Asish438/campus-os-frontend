import React, { useState, useRef, useEffect } from 'react';
import { aiApi } from '../../services/aiApi';
import { AI_STUDY_COURSES } from '../../data/demoData';
import {
  Sparkles,
  Send,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  FileText,
  HelpCircle,
  BrainCircuit,
  Lightbulb,
  FileCheck,
  ChevronRight,
  Bot,
  User,
  GraduationCap
} from 'lucide-react';

export const AiStudyPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(AI_STUDY_COURSES[0]);
  const [selectedModule, setSelectedModule] = useState(AI_STUDY_COURSES[0].modules[2]); // ARP module default!
  
  const [inputMessage, setInputMessage] = useState('Explain ARP in simple language.');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello Sai! I am your **Campus OS AI Study Assistant**, tuned to your Semester 5 Computer Science curriculum.\n\nYou are currently reviewing **${selectedCourse.name}**.\n\nAsk any question, or click the quick action buttons below to generate exam notes, question banks, or concept explanations!`,
      sourceMaterial: 'BPUT University Syllabus • 5th Semester CSE'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await aiApi.askQuestion(query, selectedCourse);
      const assistantMsg = {
        role: 'assistant',
        content: response.answer,
        confidence: response.confidence,
        sourceMaterial: response.sourceMaterial,
        suggestedFollowUps: response.suggestedFollowUps
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an issue analyzing this request. Please try again.',
          sourceMaterial: 'System'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleQuickPrompt = (promptText) => {
    setInputMessage(promptText);
    handleSendMessage(promptText);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 border border-blue-700/50 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              AI Study Assistant
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                GPT-4o Campus Tuned
              </span>
            </h2>
            <p className="text-xs text-blue-200">
              Directly grounded in university curriculum, lecture slides, and past 5-year question papers
            </p>
          </div>
        </div>

        {/* Quick Action Prompt Shortcuts */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => handleQuickPrompt('Explain ARP in simple language.')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            Explain ARP
          </button>
          <button
            onClick={() => handleQuickPrompt('Generate high yield revision notes for Computer Networks.')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            Generate Notes
          </button>
          <button
            onClick={() => handleQuickPrompt('Give me top 5 important examination questions.')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Important Questions
          </button>
          <button
            onClick={() => handleQuickPrompt('Generate 5 practice quiz questions on Operating Systems.')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5" />
            Quiz
          </button>
        </div>
      </div>

      {/* 3-Column Studio Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
        {/* Left Column (3 spans): Courses & Modules Navigator */}
        <div className="hidden lg:flex lg:col-span-3 flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Curriculum Units
            </h3>
          </div>

          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Active Course:
            </label>
            <select
              value={selectedCourse.id}
              onChange={(e) => {
                const c = AI_STUDY_COURSES.find(crs => crs.id === e.target.value);
                setSelectedCourse(c);
                setSelectedModule(c.modules[0]);
              }}
              className="w-full text-xs font-bold p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-800 dark:text-slate-200 outline-none"
            >
              {AI_STUDY_COURSES.map(crs => (
                <option key={crs.id} value={crs.id}>
                  {crs.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Modules & Topics
            </p>
            {selectedCourse.modules.map((mod, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedModule(mod)}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all ${
                  selectedModule === mod
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900/60'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{mod}</span>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Column (6 spans): AI Interactive Chat Stream */}
        <div className="lg:col-span-6 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          {/* Chat Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-line prose-xs">
                    {msg.content}
                  </div>

                  {msg.sourceMaterial && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 font-mono">
                        <BookOpen className="w-3 h-3 text-blue-500" />
                        {msg.sourceMaterial}
                      </span>
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="hover:text-slate-200 flex items-center gap-1 font-medium"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {msg.suggestedFollowUps && (
                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1">
                      <p className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase">
                        Recommended Deep Dive:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((fu, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => handleQuickPrompt(fu)}
                            className="text-[10px] px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 hover:underline text-left"
                          >
                            {fu}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  Synthesizing university knowledge base & generating explanation...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about ARP, Semaphores, Normalization, or exam questions..."
                className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 outline-none text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading || !inputMessage.trim()}
                className="btn btn-primary px-4 py-2.5 rounded-xl disabled:opacity-50 shadow-md shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (3 spans): Study Context & Quick Prompts */}
        <div className="hidden lg:flex lg:col-span-3 flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm p-4 space-y-4">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Context
            </h4>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
              {selectedCourse.name}
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
              Focus: {selectedModule}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              One-Click Learning Actions
            </label>
            <button
              onClick={() => handleQuickPrompt('Explain ARP in simple language.')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 border border-slate-200 dark:border-slate-800 text-xs transition-colors"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Explain Simply
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Breakdown with real-world analogies
              </p>
            </button>

            <button
              onClick={() => handleQuickPrompt('Summarize key exam formulas and protocol states.')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 border border-slate-200 dark:border-slate-800 text-xs transition-colors"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Generate Notes
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Concise bullet points for last minute revision
              </p>
            </button>

            <button
              onClick={() => handleQuickPrompt('Generate a 5-question multiple choice practice quiz.')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 border border-slate-200 dark:border-slate-800 text-xs transition-colors"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Practice Quiz
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Multiple choice with answer explanations
              </p>
            </button>

            <button
              onClick={() => handleQuickPrompt('List top 5 university mid-term questions for this module.')}
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 border border-slate-200 dark:border-slate-800 text-xs transition-colors"
            >
              <div className="font-bold text-slate-800 dark:text-slate-200">
                Important Questions
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Past university repeated topics
              </p>
            </button>
          </div>

          <div className="mt-auto p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-xs">
            <span className="font-bold text-blue-700 dark:text-blue-300">
              💡 Tip for Mid-Terms:
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-1">
              Ask for ARP packet frame layout or step-by-step 3-way handshake diagrams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiStudyPage;
