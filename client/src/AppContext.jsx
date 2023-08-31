
import React, { createContext, useContext, useState } from "react";

// Create a new context
const AppStateContext = createContext();

// Create a custom hook to access the context
export const useAppState = () => useContext(AppStateContext);

// Create a context provider component
export const AppStateProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [refresh, setRefresh] = useState(0);
    return (
        <AppStateContext.Provider value={{ user, setUser, refresh, setRefresh }}>
            {children}
        </AppStateContext.Provider>
    );
};
