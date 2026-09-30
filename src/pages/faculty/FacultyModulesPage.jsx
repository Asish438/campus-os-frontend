import React, { useState } from 'react';
import { facultyApi } from '../../services/facultyApi';
import {
  Upload,
  Sparkles,
  CheckCircle2,
  FileText,
  HelpCircle,
  BrainCircuit,
  FileCheck,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export const FacultyModulesPage = () => {
  const [moduleTitle, setModuleTitle] = useState('Computer Networks - Module 3: ARP, RARP & Subnetting');
  const [fileName, setFileName] = useState('lecture_03_arp_subnets.pdf');
  const [uploadState, setUploadState] = useState('IDLE'); // 'IDLE' | 'UPLOADING' | 'PROCESSING' | 'AI_PROCESSING' | 'COMPLETED'
  const [aiResult, setAiResult] = useState(null);

  const handleStartUpload = async () => {
    setUploadState('UPLOADING');
    await new Promise(r => setTimeout(r, 700));

    setUploadState('PROCESSING');
    await new Promise(r => setTimeout(r, 700));

    setUploadState('AI_PROCESSING');
    const result = await facultyApi.simulateModuleUpload(fileName, moduleTitle);
    await new Promise(r => setTimeout(r, 900));

    setAiResult(result);
    setUploadState('COMPLETED');
  };

  const handleReset = () => {
    setUploadState('IDLE');
    setAiResult(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          AI Lecture Module Ingestion Engine
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 font-mono">
            RAG Pipeline
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Upload lecture slides, research notes, or PDFs to auto-generate university revision notes, exam question banks, and quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Zone (5 spans) */}
        <div className="lg:col-span-5 campus-card space-y-4">
          <div className="campus-card-header">
            <h3 className="campus-card-title flex items-center gap-2">
              <Upload className="w-4 h-4 text-indigo-600" />
              Upload Course Material
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="form-label">Module / Topic Heading</label>
              <input
                type="text"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                disabled={uploadState !== 'IDLE' && uploadState !== 'COMPLETED'}
                className="form-input"
              />
            </div>

            {/* Drag and Drop Zone */}
            <div
              onClick={() => uploadState === 'IDLE' && handleStartUpload()}
              className={`p-6 border-2 border-dashed rounded-2xl text-center transition-all ${
                uploadState === 'COMPLETED'
                  ? 'border-emerald-400 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-indigo-500 bg-slate-50/50 dark:bg-slate-800/20 cursor-pointer'
              }`}
            >
              <Upload className="w-8 h-8 mx-auto text-indigo-500 mb-2" />
              <p className="font-bold text-slate-800 dark:text-slate-200">
                {uploadState === 'COMPLETED' ? fileName : 'Drag & drop PPTX / PDF slides'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Supports syllabus PDFs, lecture slides, scanned notes up to 50MB
              </p>
            </div>

            {/* Ingestion Steps Progress */}
            {uploadState !== 'IDLE' && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Pipeline Status:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono uppercase">
                    {uploadState.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className={`flex items-center gap-2 ${['UPLOADING', 'PROCESSING', 'AI_PROCESSING', 'COMPLETED'].includes(uploadState) ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> 1. Uploading Document
                  </div>
                  <div className={`flex items-center gap-2 ${['PROCESSING', 'AI_PROCESSING', 'COMPLETED'].includes(uploadState) ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2. Processing & OCR Extraction
                  </div>
                  <div className={`flex items-center gap-2 ${['AI_PROCESSING', 'COMPLETED'].includes(uploadState) ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> 3. AI Semantic Indexing & RAG
                  </div>
                  <div className={`flex items-center gap-2 ${uploadState === 'COMPLETED' ? 'text-emerald-600 font-semibold' : 'text-slate-400'}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> 4. Study Materials Completed
                  </div>
                </div>
              </div>
            )}

            {uploadState === 'IDLE' ? (
              <button
                type="button"
                onClick={handleStartUpload}
                className="w-full btn btn-primary py-2.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                Upload & Synthesize with AI
              </button>
            ) : uploadState === 'COMPLETED' ? (
              <button
                type="button"
                onClick={handleReset}
                className="w-full btn btn-secondary py-2.5 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Upload Another Lecture
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="w-full btn btn-primary py-2.5 opacity-50"
              >
                Processing Material...
              </button>
            )}
          </div>
        </div>

        {/* AI Output Generation Results (7 spans) */}
        <div className="lg:col-span-7 campus-card space-y-4">
          <div className="campus-card-header">
            <div>
              <h3 className="campus-card-title flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                AI Generated Course Deliverables
              </h3>
              <p className="campus-card-subtitle">
                Instantly published to the Student Portal for enrolled B.Tech students
              </p>
            </div>
            {uploadState === 'COMPLETED' && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-300">
                Ready for Students
              </span>
            )}
          </div>

          {aiResult ? (
            <div className="space-y-4 text-xs animate-fade-in">
              {/* Generated Notes */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Auto-Generated Revision Notes
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {aiResult.generatedNotes}
                </p>
                <div className="pt-2 text-[11px] text-slate-400">
                  Includes: ARP request/reply packet frame structure, MAC broadcast FF:FF:FF:FF:FF:FF logic, and cache timeout tables.
                </div>
              </div>

              {/* Generated Important Questions */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  University High-Yield Examination Questions
                </h4>
                <ul className="space-y-1.5 pl-4 list-decimal text-slate-600 dark:text-slate-300">
                  {aiResult.generatedQuestions.map((q, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {q}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Generated Practice Quiz */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  Continuous Evaluation Quiz (Sample MCQs)
                </h4>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  {aiResult.generatedQuiz.map((qz, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        Q{idx + 1}: {qz.q}
                      </p>
                      <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mt-1 font-bold">
                        Answer: {qz.ans}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400">
              <BrainCircuit className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Awaiting Document Upload
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Upload a course PDF to activate automatic LLM extraction and question generation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyModulesPage;
