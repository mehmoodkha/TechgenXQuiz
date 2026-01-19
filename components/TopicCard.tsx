
import React from 'react';
import { Topic } from '../types';
import { TOPIC_ICONS } from '../constants';
import { ChevronRight } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  progress: number;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, progress, onClick }) => {
  // Map color names to actual hex/tailwind classes to avoid dynamic string issues
  const colorMap: Record<string, string> = {
    'emerald-500': 'group-hover:text-emerald-500 group-hover:bg-emerald-500/10',
    'sky-500': 'group-hover:text-sky-500 group-hover:bg-sky-500/10',
    'blue-500': 'group-hover:text-blue-500 group-hover:bg-blue-500/10',
    'red-500': 'group-hover:text-red-500 group-hover:bg-red-500/10',
    'purple-500': 'group-hover:text-purple-500 group-hover:bg-purple-500/10',
    'orange-500': 'group-hover:text-orange-500 group-hover:bg-orange-500/10',
    'indigo-500': 'group-hover:text-indigo-500 group-hover:bg-indigo-500/10',
    'cyan-500': 'group-hover:text-cyan-500 group-hover:bg-cyan-500/10',
    'yellow-500': 'group-hover:text-yellow-500 group-hover:bg-yellow-500/10',
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 bg-slate-800 text-slate-300 ${colorMap[topic.color] || ''}`}>
        {TOPIC_ICONS[topic.id]}
      </div>
      
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        {topic.name}
        <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </h3>
      
      <p className="text-slate-400 text-sm mb-6 line-clamp-2">
        {topic.description}
      </p>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <span>Mastery</span>
          <span className="text-slate-300">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
