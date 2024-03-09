import React, { createContext, useContext, useState } from "react";
import { DEFAULT_VALUES } from "constants";

// Create the context
const BinSettingsContext = createContext<BinContext | null>(null);

// Define the context provider
export const BinSettingsContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const { radius, thickness, divideWidth, divideDepth, outerGap, innerGap } = DEFAULT_VALUES;
    const defaultValue = { radius, thickness, divideWidth, divideDepth, outerGap, innerGap };

    const [binSettings, setBinSettings] = useState(defaultValue);

    const updateBinSettings = (newValues: Partial<BinSettings>) => {
        setBinSettings({
            ...binSettings,
            ...newValues,
        });
    };

    return (
        <BinSettingsContext.Provider value={{ ...binSettings, updateBinSettings }}>
            {children}
        </BinSettingsContext.Provider>
    );
};

// Custom hook to access the context
export const useBinContext = () => {
    const context = useContext(BinSettingsContext);
    if (!context) {
        throw new Error("useBinContext must be used within a BinSettingsContextProvider");
    }
    return context;
};
