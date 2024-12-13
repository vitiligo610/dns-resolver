"use client";

import { createContext, useContext, useState } from 'react';

type SelectionContextType = {
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
};

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <SelectionContext.Provider value={{ selectedIds, setSelectedIds }}>
      {children}
    </SelectionContext.Provider>
  );
}

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) throw new Error('useSelection must be used within SelectionProvider');
  return context;
};