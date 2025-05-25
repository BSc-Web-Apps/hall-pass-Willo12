import React, { createContext, useContext, useState } from 'react';
import Popup from '~/components/ui/Popup';

interface PopupContextType {
  showPopup: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [trigger, setTrigger] = useState(false);

  const showPopup = () => {
    setTrigger(true);
    // Reset trigger after a brief delay to allow for future triggers
    setTimeout(() => {
      setTrigger(false);
    }, 3100); // Slightly longer than the popup display time
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <Popup trigger={trigger} />
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
} 
