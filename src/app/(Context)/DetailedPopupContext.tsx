'use client'
import React, { createContext, useContext, useState,    ReactNode  } from 'react';

interface PopupContextType {
  detailId: number | null;
  popupOpen: boolean;
  setDetailId: React.Dispatch<React.SetStateAction<number | null>>;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopupContext = createContext<PopupContextType>({
  detailId: null,
  popupOpen: false,
  setDetailId: () => void {},
  setPopupOpen: () => void {},
});

interface PopupProviderProps {
    children: ReactNode; 
  }
export const usePopup = () => useContext(PopupContext);

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [detailId, setDetailId] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <PopupContext.Provider value={{ detailId, popupOpen, setDetailId, setPopupOpen }}>
      {children}
    </PopupContext.Provider>
  );
};
