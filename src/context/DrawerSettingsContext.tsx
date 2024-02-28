import { createContext, useContext, useState } from "react";
import { DEFAULT_VALUES } from "consts";

const { width, depth, height } = DEFAULT_VALUES;
const defaultValue = { width, depth, height };

const DrawerSettingsContext = createContext<DrawerContext | undefined>(undefined);

export const DrawerSettingsContextProvider = ({ children }: any) => {
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
    return useContext(DrawerSettingsContext);
};
