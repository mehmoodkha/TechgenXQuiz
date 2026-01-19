
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import TopicCard from './components/TopicCard';
import QuizView from './components/QuizView';
import { TOPICS, INITIAL_QUESTIONS } from './constants';
import { useProgress } from './hooks/useProgress';
import { Difficulty, Topic, Question } from './types';
import { Search, Trophy, BookOpen, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'profile'>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Difficulty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { progress, markCompleted, getTopicProgress, getLevelProgress } = useProgress();

  const filteredQuestions = useMemo(() => {
    if (!selectedTopic || !selectedLevel) return [];
    return INITIAL_QUESTIONS.filter(
      q => q.topicId === selectedTopic.id && q.difficulty === selectedLevel
    );
  }, [selectedTopic, selectedLevel]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return INITIAL_QUESTIONS.filter(
      q => q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query)
    ).map(q => ({
      question: q,
      topicName: TOPICS.find(t => t.id === q.topicId)?.name || 'General'
    }));
  }, [searchQuery]);

  const renderDashboard = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-[100px] -mr-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-emerald-500 font-bold text-sm uppercase tracking-widest mb-4">
            <Trophy size={18} />
            <span>DevOps Mastery Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">DevOps Lifecycle</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mb-8">
            The ultimate preparation guide for SRE, Platform, and DevOps roles. 
            Over 500 questions across the industry's most in-demand technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
              <BookOpen size={16} className="text-emerald-500" />
              <span className="text-sm font-medium">9 Tech Stacks</span>
            </div>
            <div className="bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
              <Clock size={16} className="text-sky-500" />
              <span className="text-sm font-medium">Updated Weekly</span>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Select Tech Stack</h2>
          <span className="text-sm text-slate-500">{TOPICS.length} categories available</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map(topic => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              progress={getTopicProgress(topic.id, INITIAL_QUESTIONS.filter(q => q.topicId === topic.id).length)}
              onClick={() => setSelectedTopic(topic)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderTopicDetail = () => {
    if (!selectedTopic) return null;
    const levels = [Difficulty.BASIC, Difficulty.INTERMEDIATE, Difficulty.ADVANCED];
    
    return (
      <div className="animate-in slide-in-from-right-4 duration-500">
        <button 
          onClick={() => setSelectedTopic(null)}
          className="text-slate-400 hover:text-white mb-8 transition-colors flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h1 className="text-5xl font-black mb-4 tracking-tight">{selectedTopic.name}</h1>
            <p className="text-xl text-slate-400 max-w-xl mb-12">{selectedTopic.description}</p>
            
            <div className="space-y-4">
              {levels.map(level => {
                const total = INITIAL_QUESTIONS.filter(q => q.topicId === selectedTopic.id && q.difficulty === level).length;
                const { completed, percentage } = getLevelProgress(selectedTopic.id, level, total);
                
                return (
                  <button 
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className="w-full group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all text-left flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-1">{level}</h3>
                      <p className="text-slate-500 text-sm">{completed} of {total} questions mastered</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-500">{percentage}%</div>
                        <div className="text-[10px] text-slate-600 uppercase font-black">Level Progress</div>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-slate-800 flex items-center justify-center group-hover:border-emerald-500/30 transition-all">
                        <div className="w-full h-full rounded-full border-t-4 border-emerald-500 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="w-full md:w-80 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h4 className="font-bold mb-4">Topic Mastery</h4>
              <div className="flex items-center justify-center py-8">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                      strokeDasharray={364} 
                      strokeDashoffset={364 - (364 * getTopicProgress(selectedTopic.id, INITIAL_QUESTIONS.filter(q => q.topicId === selectedTopic.id).length) / 100)} 
                      className="text-emerald-500" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-black">{getTopicProgress(selectedTopic.id, INITIAL_QUESTIONS.filter(q => q.topicId === selectedTopic.id).length)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSearch = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
        <input 
          type="text"
          placeholder="Search for concepts (e.g. 'Kubernetes networking', 'DNS', 'Ansible playbooks')..."
          className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-5 pl-14 pr-6 text-lg focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      <div className="space-y-4">
        {searchQuery ? (
          searchResults.length > 0 ? (
            searchResults.map(({ question, topicName }, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 mb-2 uppercase tracking-widest">
                  {topicName} • {question.difficulty}
                </div>
                <h3 className="text-lg font-bold mb-3">{question.question}</h3>
                <p className="text-slate-400 text-sm line-clamp-2">{question.answer}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500">No results found for "{searchQuery}"</p>
            </div>
          )
        ) : (
          <div className="text-center py-20 text-slate-500 space-y-4">
            <Search size={48} className="mx-auto opacity-20" />
            <p>Start typing to search across 500+ DevOps interview questions.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {!selectedTopic ? (
        activeTab === 'dashboard' ? renderDashboard() : 
        activeTab === 'search' ? renderSearch() : 
        <div className="text-center py-20">Profile view coming soon.</div>
      ) : (
        !selectedLevel ? renderTopicDetail() : (
          <QuizView 
            topic={selectedTopic}
            level={selectedLevel}
            questions={filteredQuestions}
            onComplete={(id) => markCompleted(selectedTopic.id, selectedLevel, id)}
            onExit={() => setSelectedLevel(null)}
            initialProgress={progress[selectedTopic.id]?.[selectedLevel]?.completedQuestionIds || []}
          />
        )
      )}
    </Layout>
  );
};

export default App;
