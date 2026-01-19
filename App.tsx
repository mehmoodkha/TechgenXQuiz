
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import TopicCard from './components/TopicCard';
import QuizView from './components/QuizView';
import { TOPICS, INITIAL_QUESTIONS, TOPIC_ICONS } from './constants';
import { Topic, Difficulty, SearchResult } from './types';
import { useProgress } from './hooks/useProgress';
import { Search, Trophy, BarChart3, RotateCcw, Target } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'profile'>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<Difficulty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { progress, markCompleted, resetLevel, resetAll, getTopicProgress, getLevelProgress } = useProgress();

  const filteredQuestions = useMemo(() => {
    if (!selectedTopic || !selectedLevel) return [];
    return INITIAL_QUESTIONS.filter(q => q.topicId === selectedTopic.id && q.difficulty === selectedLevel);
  }, [selectedTopic, selectedLevel]);

  const searchResults: SearchResult[] = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return INITIAL_QUESTIONS
      .filter(q => q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query))
      .map(q => ({
        question: q,
        topicName: TOPICS.find(t => t.id === q.topicId)?.name || 'Unknown'
      }));
  }, [searchQuery]);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
    setSelectedLevel(null);
  };

  const handleLevelSelect = (level: Difficulty) => {
    setSelectedLevel(level);
  };

  const handleExitQuiz = () => {
    setSelectedLevel(null);
  };

  const totalQuestionsAvailable = useMemo(() => {
    const counts: Record<string, number> = {};
    INITIAL_QUESTIONS.forEach(q => {
      counts[q.topicId] = (counts[q.topicId] || 0) + 1;
    });
    return counts;
  }, []);

  const overallProgress = useMemo(() => {
    const total = INITIAL_QUESTIONS.length;
    let completed = 0;
    Object.values(progress).forEach(topicData => {
      Object.values(topicData).forEach(levelData => {
        completed += levelData.completedQuestionIds.length;
      });
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [progress]);

  const renderDashboard = () => {
    if (selectedTopic && !selectedLevel) {
      return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setSelectedTopic(null)}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw size={16} />
            Back to Overview
          </button>
          
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500 shadow-xl">
              <span className="scale-150">
                {/* Fixed invalid 'require' by using imported TOPIC_ICONS directly */}
                {TOPIC_ICONS[selectedTopic.id]}
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">{selectedTopic.name}</h1>
              <p className="text-slate-400 max-w-lg">{selectedTopic.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[Difficulty.BASIC, Difficulty.INTERMEDIATE, Difficulty.ADVANCED].map(level => {
              const levelQuestions = INITIAL_QUESTIONS.filter(q => q.topicId === selectedTopic.id && q.difficulty === level);
              const { completed, percentage } = getLevelProgress(selectedTopic.id, level, levelQuestions.length);
              
              return (
                <div key={level} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{level}</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{levelQuestions.length} Questions</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold">
                      {percentage}%
                    </div>
                  </div>

                  <div className="mt-auto pt-6 space-y-4">
                    <button 
                      onClick={() => handleLevelSelect(level)}
                      className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all"
                    >
                      {percentage === 100 ? 'Review Questions' : 'Start Preparation'}
                    </button>
                    <button 
                      onClick={() => resetLevel(selectedTopic.id, level)}
                      className="w-full text-slate-500 hover:text-slate-300 text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <RotateCcw size={12} />
                      Reset Progress
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (selectedTopic && selectedLevel) {
      return (
        <QuizView 
          topic={selectedTopic} 
          level={selectedLevel} 
          questions={filteredQuestions}
          onComplete={(id) => markCompleted(selectedTopic.id, selectedLevel, id)}
          onExit={handleExitQuiz}
          initialProgress={progress[selectedTopic.id]?.[selectedLevel]?.completedQuestionIds || []}
        />
      );
    }

    return (
      <div className="space-y-12 animate-in fade-in duration-700">
        <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-12">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Trophy size={200} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-6">
              <Target size={14} /> 
              Learning Journey
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-tight">Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">DevOps Lifecycle</span></h1>
            <p className="text-slate-400 text-lg mb-8">Systematic interview preparation across the most critical infrastructure and automation technologies.</p>
            
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <BarChart3 className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{overallProgress}%</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Overall Rank</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <Trophy className="text-amber-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{TOPICS.length}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Total Topics</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black tracking-tight">Tech Stack Topics</h2>
            <div className="text-slate-500 text-sm font-medium">9 specialized paths</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map(topic => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                progress={getTopicProgress(topic.id, totalQuestionsAvailable[topic.id] || 0)}
                onClick={() => handleTopicClick(topic)}
              />
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderSearch = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input 
          type="text"
          placeholder="Search for Docker, Terraform, SRE concepts..."
          className="w-full h-16 bg-slate-900 border border-slate-800 rounded-2xl pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xl"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery && (
        <div className="space-y-4">
          <h3 className="text-slate-400 font-bold uppercase text-xs tracking-widest">{searchResults.length} Results Found</h3>
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((res, idx) => (
                <div key={idx} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-800 rounded text-slate-400">{res.topicName}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-emerald-500/10 rounded text-emerald-500">{res.question.difficulty}</span>
                  </div>
                  <h4 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">{res.question.question}</h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-600">No matching questions found in the bank.</div>
          )}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 mx-auto mb-6 flex items-center justify-center text-emerald-500">
          <BarChart3 size={40} />
        </div>
        <h2 className="text-2xl font-black mb-2">Preparation Statistics</h2>
        <p className="text-slate-400 mb-8">Track your journey across all interview domains</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-3xl font-black text-emerald-400">{overallProgress}%</div>
            <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Completion</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-3xl font-black text-amber-400">{Object.keys(progress).length}</div>
            <div className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Topics Started</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6">Settings & Danger Zone</h3>
        <div className="space-y-4">
          <button 
            onClick={resetAll}
            className="w-full flex items-center justify-between p-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 transition-all font-bold"
          >
            <span>Reset All Progress</span>
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'search': return renderSearch();
      case 'profile': return renderProfile();
      default: return renderDashboard();
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
