import { useCallback, useEffect, useState } from 'react';
import type { ClassificationResult, TopPrediction } from '../models/classification';
import type { HistoryItem } from '../models/history-item';

const HISTORY_STORAGE_KEY = 'plant-disease-history';
const MAX_HISTORY_ITEMS = 10;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(function () {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch (error) {
        console.error('Failed to parse history from localStorage:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(
    function () {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    },
    [history]
  );

  const addHistoryItem = useCallback(function (
    imageDataUrl: string,
    result: ClassificationResult,
    topPredictions: TopPrediction[]
  ): HistoryItem {
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      imageDataUrl,
      result,
      topPredictions,
    };

    setHistory(function (prev) {
      const updated = [newItem, ...prev];
      return updated.slice(0, MAX_HISTORY_ITEMS);
    });

    return newItem;
  },
  []);

  const clearHistory = useCallback(function () {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  }, []);

  const removeHistoryItem = useCallback(function (id: string) {
    setHistory(function (prev) {
      return prev.filter(function (item) {
        return item.id !== id;
      });
    });
  }, []);

  return {
    history,
    addHistoryItem,
    clearHistory,
    removeHistoryItem,
  };
}
