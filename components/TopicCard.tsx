
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
  return (
    <div 
      onClick={onClick}
      className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-pointer hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors bg-slate-800 text-slate-300 group-hover:bg-${topic.color}/10 group-hover:text-${topic.color}`}>
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
          <span>Progress</span>
          <span className="text-slate-300">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-emerald-500 transition-all duration-500 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
