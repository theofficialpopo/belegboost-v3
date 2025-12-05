'use client';

import { useState, useCallback, useEffect } from 'react';
import { logError } from '@/lib/logger';

/**
 * Custom hook for syncing state with localStorage
 * Handles SSR hydration properly by reading localStorage in useEffect
 * @param key - localStorage key
 * @param initialValue - default value if key doesn't exist
 * @returns tuple of [storedValue, setValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Read from localStorage after hydration
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch (error) {
      logError(`Error reading localStorage key "${key}"`, error);
    }
  }, [key]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      setStoredValue(prev => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      });
    } catch (error) {
      logError(`Error writing localStorage key "${key}"`, error);
    }
  }, [key]);

  return [storedValue, setValue] as const;
}
