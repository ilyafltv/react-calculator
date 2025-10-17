import { useCallback } from 'react';

const STORAGE_KEYS = {
  ALLOW_OPERATOR: 'allowOperator',
  ALLOW_NUMBER: 'allowNumber',
  CALC_HISTORY: 'calcHistory',
  CURRENT_EXPRESSION: 'currentExpression'
};

export const useLocalStorage = () => {
  // Boolean values
  const getAllowOperator = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ALLOW_OPERATOR);
    return saved ? JSON.parse(saved) : false;
  }, []);

  const getAllowNumber = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ALLOW_NUMBER);
    return saved ? JSON.parse(saved) : true;
  }, []);

  const setAllowOperator = useCallback((value) => {
    localStorage.setItem(STORAGE_KEYS.ALLOW_OPERATOR, JSON.stringify(value));
  }, []);

  const setAllowNumber = useCallback((value) => {
    localStorage.setItem(STORAGE_KEYS.ALLOW_NUMBER, JSON.stringify(value));
  }, []);

  // History
  const getHistory = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CALC_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error parsing history:', error);
      return [];
    }
  }, []);

  const setHistory = useCallback((history) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CALC_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  }, []);

  // Expression
  const getCurrentExpression = useCallback(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_EXPRESSION) || '';
  }, []);

  const setCurrentExpression = useCallback((exp) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_EXPRESSION, exp);
  }, []);

  return {
    getAllowOperator,
    setAllowOperator,
    getAllowNumber,
    setAllowNumber,
    getHistory,
    setHistory,
    getCurrentExpression,
    setCurrentExpression,
  };
};