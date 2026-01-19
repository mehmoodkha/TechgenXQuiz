import React, { useState, useEffect } from 'react';
import { Question, Difficulty, Topic } from '../types';
import { ChevronLeft, ChevronRight, Eye, BrainCircuit, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getAIExplanation } from '../services/geminiService';

interface QuizViewProps {
  topic: Topic;
  level: Difficulty;
  questions: Question[];
  onComplete: (questionId: string) => void;
  onExit: () => void;
  initialProgress: string[];
}

const QuizView: React.FC<QuizViewProps> = ({ topic, level, questions, onComplete, onExit, initialProgress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [sessionCompletedIds, setSessionCompletedIds] = useState<string[]>(initialProgress);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCompleted = sessionCompletedIds.includes(currentQuestion?.id);

  // Calculate progress percentage for the bar
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
      setAiExplanation(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowAnswer(false);
      setAiExplanation(null);
    }
  };

  const handleMarkComplete = () => {
    onComplete(currentQuestion.id);
    setSessionCompletedIds(prev => [...prev, currentQuestion.id]);
  };

  const handleAIExplain = async () => {
    setIsAiLoading(true);
    const explanation = await getAIExplanation(topic.name, currentQuestion.question, currentQuestion.answer);
    setAiExplanation(explanation);
    setIsAiLoading(false);
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-slate-400 mb-4">No questions available for this level yet.</p>
        <button onClick={onExit} className="px-6 py-2 bg-slate-800 rounded-lg hover:bg-slate-700">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ChevronLeft size={20} />
          <span>Exit Session</span>
        </button>
        <div className="text-right">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1">{topic.name} • {level}</div>
          <div className="text-slate-500 text-sm font-medium">Question {currentIndex + 1} of {questions.length}</div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-6 shadow-xl relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="min-h-[120px] relative z-10">
          <h2 className="text-2xl font-bold leading-tight mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.codeSnippet && (
            <div className="mb-6 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-sm overflow-x-auto text-emerald-400">
              <pre><code>{currentQuestion.codeSnippet}</code></pre>
            </div>
          )}
        </div>

        <div className="space-y-4 relative z-10">
          {!showAnswer ? (
            <button 
              onClick={() => setShowAnswer(true)}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
            >
              <Eye size={20} />
              Show Expert Answer
            </button>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Suggested Answer</h4>
                <p className="text-slate-200 leading-relaxed mb-6">
                  {currentQuestion.answer}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={handleAIExplain}
                    disabled={isAiLoading}
                    className="flex-1 min-w-[140px] px-4 py-2.5 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/20 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    {isAiLoading ? <RefreshCw size={18} className="animate-spin" /> : <BrainCircuit size={18} />}
                    Explain with AI
                  </button>
                  <button 
                    onClick={handleMarkComplete}
                    disabled={isCompleted}
                    className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      isCompleted 
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500' 
                      : 'bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/20'
                    }`}
                  >
                    <CheckCircle2 size={18} />
                    {isCompleted ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {aiExplanation && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-800/20 border border-slate-700/30 rounded-2xl p-6 text-sm text-slate-300 leading-relaxed prose prose-invert overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: aiExplanation.replace(/\n/g, '<br/>') }} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 hover:bg-slate-800 transition-colors disabled:opacity-30 flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        <button 
          onClick={handleNext}
          disabled={isLastQuestion}
          className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 hover:bg-slate-800 transition-colors disabled:opacity-30 flex items-center gap-2"
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuizView;