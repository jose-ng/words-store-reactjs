'use client'
import { useState } from 'react'

function useLocalStorage<T,>(itemName: string, initialValue: T) {
    const localStorageItem: string | null = localStorage.getItem(itemName);
    const initialItem: T = localStorageItem ? (JSON.parse(localStorageItem) as T) : initialValue;

    const [item, setItem] = useState<T>(initialItem);

    const saveItem = (newItem: T) => {
        localStorage.setItem(itemName, JSON.stringify(newItem));
        setItem(newItem);
    };

    return [item, saveItem] as const;
};


export { useLocalStorage }