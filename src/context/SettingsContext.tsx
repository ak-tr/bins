import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_SETTINGS } from "../constants";

type SettingsContext = Settings & {
    update: (newValues: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContext | null>(null);

const STORAGE_KEY = "bins-settings";

// Saved settings over the defaults. Only known keys with the right type are kept,
// so stale or hand edited values can't break the app
const loadSettings = (): Settings => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
        const valid = Object.entries(saved).filter(
            ([key, value]) => typeof value === typeof DEFAULT_SETTINGS[key as keyof Settings]
        );
        return { ...DEFAULT_SETTINGS, ...Object.fromEntries(valid) };
    } catch {
        return DEFAULT_SETTINGS;
    }
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState(loadSettings);
    const update = (newValues: Partial<Settings>) =>
        setSettings((prev) => ({ ...prev, ...newValues }));

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch {
            // Storage is blocked or full, settings just won't be remembered
        }
    }, [settings]);

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
