import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Item = {
  id: string;
  title: string;
  type: 'Movies' | 'Series' | 'Animes';
  status: 'Plan to Watch' | 'Watching' | 'Completed';
  notes?: string;
  rating?: number;
};

type DataContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (updatedItem: Item) => void;
  deleteItem: (id: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('watchVault');
      if (stored) setItems(JSON.parse(stored));
    })();
  }, []);

  const saveItems = async (newItems: Item[]) => {
    setItems(newItems);
    await AsyncStorage.setItem('watchVault', JSON.stringify(newItems));
  };

  const addItem = (item: Item) => saveItems([...items, item]);
  const updateItem = (updatedItem: Item) =>
    saveItems(items.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
  const deleteItem = (id: string) => saveItems(items.filter((i) => i.id !== id));

  return (
    <DataContext.Provider value={{ items, addItem, updateItem, deleteItem }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used inside DataProvider');
  return context;
};
