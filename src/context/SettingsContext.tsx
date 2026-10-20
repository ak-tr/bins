import { ReactNode, createContext, useContext, useState } from "react";
import { DEFAULT_SETTINGS } from "../constants";

type SettingsContext = Settings & {
    update: (newValues: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContext | null>(null);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const update = (newValues: Partial<Settings>) =>
        setSettings((prev) => ({ ...prev, ...newValues }));

    return (
        <SettingsContext.Provider value={{ ...settings, update }}>
            {children}
        </SettingsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
