import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for dark mode
const DarkModeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
}>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook to use dark mode context
export const useDarkMode = () => useContext(DarkModeContext);

// DarkModeProvider to wrap the app
export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Check for user's preferred color scheme
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);

    // Optional: Load dark mode preference from localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  // Function to toggle dark mode and save preference
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem('darkMode', String(!prevMode)); // Save preference
      return !prevMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};