import { createContext, useContext, useState, ReactNode } from 'react';

interface BottomSheetContextProps {
  openSheets: Record<string, boolean>;
  setSheetOpen: (id: string, isOpen: boolean) => void;
  isSheetOpen: (id: string) => boolean;
  anySheetOpen: boolean;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
  const [openSheets, setOpenSheets] = useState<Record<string, boolean>>({});

  const setSheetOpen = (id: string, isOpen: boolean) => {
    setOpenSheets((prev) => ({ ...prev, [id]: isOpen }));
  };

  const isSheetOpen = (id: string) => !!openSheets[id];
  const anySheetOpen = Object.values(openSheets).some(Boolean); // 👈 true if any sheet open

  return (
    <BottomSheetContext.Provider value={{ openSheets, setSheetOpen, isSheetOpen, anySheetOpen }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
