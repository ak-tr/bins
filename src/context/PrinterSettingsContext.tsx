import { createContext, useContext, useState } from "react";
import { DEFAULT_VALUES } from "constants";

const { bedSizeX, bedSizeY } = DEFAULT_VALUES;
const defaultValue = { bedSizeX, bedSizeY };

const PrinterSettingsContext = createContext<PrinterContext | undefined>(undefined);

export const PrinterSettingsContextProvider = ({ children }: ContextProviderProps) => {
    const [printerSettings, setPrinterSettings] = useState(defaultValue);

    const updatePrinterSettings = (newValues: Partial<PrinterSettings>) => {
        setPrinterSettings({
            ...printerSettings,
            ...newValues,
        });
    };

    return (
        <PrinterSettingsContext.Provider value={{...printerSettings, updatePrinterSettings }}>
            {children}
        </PrinterSettingsContext.Provider>
    );
};

export const usePrinterContext = () => {
    return useContext(PrinterSettingsContext);
};
