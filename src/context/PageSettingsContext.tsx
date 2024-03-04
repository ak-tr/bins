import { createContext, useContext, useState } from "react";
import { DEFAULT_PAGE_SETTINGS } from "constants";

const PageSettingsContext = createContext<PageContext | null>(null);

export const PageSettingsContextProvider = ({ children }: ContextProviderProps) => {
    const { areMeasurementsEnabled, areIndexNumbersEnabled, isVaseMode } = DEFAULT_PAGE_SETTINGS;
const defaultValue = { areMeasurementsEnabled, areIndexNumbersEnabled, isVaseMode };
    const [pageSettings, setPageSettings] = useState(defaultValue);

    const updatePageSettings = (newValues: Partial<PageSettings>) => {
        setPageSettings({
            ...pageSettings,
            ...newValues,
        });
    };

    return (
        <PageSettingsContext.Provider value={{...pageSettings, updatePageSettings }}>
            {children}
        </PageSettingsContext.Provider>
    );
};

export const usePageContext = () => {
    const context = useContext(PageSettingsContext);
    if (!context) {
        throw new Error("usePageContext must be used within a PageSettingsContextProvider");
    }
    return context;
};
