import React, { createContext, useContext, useEffect, useState } from 'react';
import { ListModel } from '../models/List';
import { ListItemModel } from '../models/ListItem';
import { FileStorageService } from '../services/FileStorageService';
import { uuid } from '../utils/uuid';

type ListsContextType = {
  lists: ListModel[];
  activeListId: string | null;
  createList: (name: string) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  renameList: (id: string, newName: string) => Promise<void>;
  setActiveList: (id: string) => void;
  addItem: (listId: string, text: string) => Promise<void>;
  toggleItem: (listId: string, itemId: string) => Promise<void>;
  deleteItem: (listId: string, itemId: string) => Promise<void>;
  reorderItems: (listId: string, from: number, to: number) => Promise<void>;
};

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<ListModel[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);

  // Load all lists on app start
  useEffect(() => {
    (async () => {
      const loaded = await FileStorageService.loadAllLists();
      setLists(loaded);
      if (loaded.length > 0) {
        setActiveListId(loaded[0].id);
      }
    })();
  }, []);

  // Helper: persist all lists to disk
  const persist = async (nextLists: ListModel[]) => {
    setLists(nextLists);
    for (const list of nextLists) {
      await FileStorageService.saveList(list);
    }
  };

  // Create a new list
  const createList = async (name: string) => {
    const newList: ListModel = { id: uuid(), name, items: [] };
    const next = [...lists, newList];
    await persist(next);
    setActiveListId(newList.id);
  };

  // Delete a list
  const deleteList = async (id: string) => {
    const next = lists.filter(l => l.id !== id);
    await FileStorageService.deleteListFile(id);
    setLists(next);

    if (activeListId === id) {
      setActiveListId(next.length > 0 ? next[0].id : null);
    }
  };


  // Rename a list
  const renameList = async (id: string, newName: string) => {
    const nextLists = lists.map(list =>
      list.id === id ? { ...list, name: newName } : list
    );
    await persist(nextLists);
  };

  // Switch active list
  const setActiveList = (id: string) => {
    setActiveListId(id);
  };

  // Add an item to a list
  const addItem = async (listId: string, text: string) => {
    const nextLists = lists.map(list => {
      if (list.id !== listId) return list;
      const newItem: ListItemModel = { id: uuid(), text, done: false };
      return { ...list, items: [newItem, ...list.items] };
    });

    await persist(nextLists);
  };

  // Toggle item done state
  const toggleItem = async (listId: string, itemId: string) => {
    const nextLists = lists.map(list => {
      if (list.id !== listId) return list;

      const updatedItems = list.items.map(item =>
        item.id === itemId ? { ...item, done: !item.done } : item
      );

      const undone = updatedItems.filter(i => !i.done);
      const done = updatedItems.filter(i => i.done);

      return { ...list, items: [...undone, ...done] };
    });

    await persist(nextLists);
  };


  // Delete an item from a list
  const deleteItem = async (listId: string, itemId: string) => {
    const nextLists = lists.map(list => {
      if (list.id !== listId) return list;
      return { ...list, items: list.items.filter(item => item.id !== itemId) };
    });

    await persist(nextLists);
  };

  // Reorder items inside a list
  const reorderItems = async (listId: string, from: number, to: number) => {
    const nextLists = lists.map(list => {
      if (list.id !== listId) return list;

      const items = [...list.items];
      const [moved] = items.splice(from, 1);
      items.splice(to, 0, moved);

      return { ...list, items };
    });

    await persist(nextLists);
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        activeListId,
        createList,
        deleteList,
        renameList,
        setActiveList,
        addItem,
        toggleItem,
        deleteItem,
        reorderItems
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => {
  const ctx = useContext(ListsContext);
  if (!ctx) {
    throw new Error('useLists must be used within ListsProvider');
  }
  return ctx;
};
