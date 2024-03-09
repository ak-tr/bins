import { createContext, useContext, useState } from "react";
import { DEFAULT_GENERATION_VALUES } from "constants";

const GenerationSettingsContext = createContext<GenerationContext | null>(null);

export const GenerationSettingsContextProvider = ({ children }: ContextProviderProps) => {
    const { type, iterations } = DEFAULT_GENERATION_VALUES;
    const defaultValue: GenerationSettings = { type, iterations, rows: 2, cols: 2 };
    const [generationSettings, setGenerationSettings] = useState(defaultValue as GenerationSettings);

    const updateGenerationSettings = (newValues: Partial<GenerationSettings>) => {
        setGenerationSettings({
            ...generationSettings,
            ...newValues,
        });
    };

    return (
        <GenerationSettingsContext.Provider value={{...generationSettings, updateGenerationSettings}}>
            {children}
        </GenerationSettingsContext.Provider>
    );
};

export const useGenerationContext = () => {
    const context = useContext(GenerationSettingsContext);
    if (!context) {
        throw new Error("useGenerationContext must be used within a GenerationSettingsContextProvider");
    }
    return context;
};
