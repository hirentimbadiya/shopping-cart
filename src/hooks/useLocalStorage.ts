import React, { useState , useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value , setValue] = useState<T>(() => {
    const jsonValue = window.localStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key , value])

  return [value , setValue] as [typeof value , typeof setValue];
  
}

export default useLocalStorage