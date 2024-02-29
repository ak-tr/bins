import { createContext, useContext, useState } from "react";
import { DEFAULT_VALUES } from "constants";

const { radius, thickness, divideWidth, divideDepth, outerGap, innerGap, iterations } = DEFAULT_VALUES;
const defaultValue = { radius, thickness, divideWidth, divideDepth, outerGap, innerGap, iterations };

const BinSettingsContext = createContext<BinContext | undefined>(undefined);

export const BinSettingsContextProvider = ({ children }: ContextProviderProps) => {
    const [binSettings, setBinSettings] = useState(defaultValue);

    const updateBinSettings = (newValues: Partial<BinSettings>) => {
        setBinSettings({
            ...binSettings,
            ...newValues,
        });
    };

    return (
        <BinSettingsContext.Provider value={{...binSettings, updateBinSettings}}>
            {children}
        </BinSettingsContext.Provider>
    );
};

export const useBinContext = () => {
    return useContext(BinSettingsContext);
};
