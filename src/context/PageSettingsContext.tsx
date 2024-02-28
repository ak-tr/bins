import { createContext, useContext, useState } from "react";
import { DEFAULT_PAGE_SETTINGS } from "constants";

const { areMeasurementsEnabled, areIndexNumbersEnabled } = DEFAULT_PAGE_SETTINGS;
const defaultValue = { areMeasurementsEnabled, areIndexNumbersEnabled };

const PageSettingsContext = createContext<PageContext | undefined>(undefined);

export const PageSettingsContextProvider = ({ children }: any) => {
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
    return useContext(PageSettingsContext);
};
