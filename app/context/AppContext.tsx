'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Movie, ChatMessage } from '@/types';

interface AppContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentSection, setCurrentSection] = useState('home');

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  };

  return (
    <AppContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        chatMessages,
        addChatMessage,
        currentSection,
        setCurrentSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};