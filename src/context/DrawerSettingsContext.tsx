import { createContext, useContext, useState } from "react";
import { DEFAULT_VALUES } from "constants";

const DrawerSettingsContext = createContext<DrawerContext | null>(null);

export const DrawerSettingsContextProvider = ({ children }: ContextProviderProps) => {
    const { width, depth, height } = DEFAULT_VALUES;
    const defaultValue = { width, depth, height };
    const [boxSettings, setBoxSettings] = useState(defaultValue);

    const updateBoxSettings = (newValues: Partial<DrawerSettings>) => {
        setBoxSettings({
            ...boxSettings,
            ...newValues,
        });
    };

    return (
        <DrawerSettingsContext.Provider value={{...boxSettings, updateBoxSettings}}>
            {children}
        </DrawerSettingsContext.Provider>
    );
};

export const useDrawerContext = () => {
    const context = useContext(DrawerSettingsContext);
    if (!context) {
        throw new Error("useDrawerContext must be used within a DrawerSettingsContextProvider");
    }
    return context;
};
