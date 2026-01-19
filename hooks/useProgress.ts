
import { useState, useEffect, useCallback } from 'react';
import { UserProgress, Difficulty, ProgressData } from '../types';

const STORAGE_KEY = 'devops_mastery_progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markCompleted = useCallback((topicId: string, level: Difficulty, questionId: string) => {
    setProgress(prev => {
      const topicData = prev[topicId] || {
        [Difficulty.BASIC]: { completedQuestionIds: [] },
        [Difficulty.INTERMEDIATE]: { completedQuestionIds: [] },
        [Difficulty.ADVANCED]: { completedQuestionIds: [] },
      };

      const levelData = topicData[level];
      if (levelData.completedQuestionIds.includes(questionId)) return prev;

      return {
        ...prev,
        [topicId]: {
          ...topicData,
          [level]: {
            ...levelData,
            completedQuestionIds: [...levelData.completedQuestionIds, questionId]
          }
        }
      };
    });
  }, []);

  const resetLevel = useCallback((topicId: string, level: Difficulty) => {
    setProgress(prev => {
      if (!prev[topicId]) return prev;
      return {
        ...prev,
        [topicId]: {
          ...prev[topicId],
          [level]: { completedQuestionIds: [] }
        }
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    setProgress({});
  }, []);

  const getTopicProgress = (topicId: string, totalCount: number) => {
    const topicData = progress[topicId];
    if (!topicData) return 0;
    
    // Explicitly cast Object.values results to ProgressData[] to resolve TS 'unknown' errors.
    const totalCompleted = (Object.values(topicData) as ProgressData[]).reduce(
      (sum, level) => sum + level.completedQuestionIds.length, 
      0
    );
    
    return totalCount > 0 ? Math.round((totalCompleted / totalCount) * 100) : 0;
  };

  const getLevelProgress = (topicId: string, level: Difficulty, totalCount: number) => {
    const completed = progress[topicId]?.[level]?.completedQuestionIds?.length || 0;
    return {
      completed,
      percentage: totalCount > 0 ? Math.round((completed / totalCount) * 100) : 0
    };
  };

  return { 
    progress, 
    markCompleted, 
    resetLevel, 
    resetAll, 
    getTopicProgress,
    getLevelProgress 
  };
};
