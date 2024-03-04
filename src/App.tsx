import "./App.css";

// Components
import { ThreeApp } from "@components/ThreeApp";
import { ConfigPanel } from "@components/ConfigPanel";

// React imports
import { useMemo, useRef, useState } from "react";

// Three or related imports
import { Mesh } from "three";

// Other
import { DrawerSettingsContextProvider } from "context/DrawerSettingsContext";
import { BinSettingsContextProvider } from "context/BinSettingsContext";
import { PrinterSettingsContextProvider } from "context/PrinterSettingsContext";
import { PageSettingsContextProvider } from "context/PageSettingsContext";

import { NextUIProvider } from "@nextui-org/react";
import { exportMeshesToObj } from "@utils/exportMeshesToObj";

function App() {
    const [isExporting, setIsExporting] = useState(false);
    const binMeshArray = useRef<Mesh[]>([]);

    const props = { isExporting };

    const updateBinMeshArray = (refs: any[]) => {
        binMeshArray.current = refs.map((ref) => ref.current);
    };

    const exportBins = async () => {
        setIsExporting(true);

        try {
            await exportMeshesToObj(binMeshArray);
        } catch (err) {
            console.log("Error exporting bins");
            console.log(err);
        } finally {
            setIsExporting(false);
        }
    };

    const AllSettingsProviders = useMemo(() => {
        return ({ children }: ContextProviderProps) => (
            <DrawerSettingsContextProvider>
                <BinSettingsContextProvider>
                    <PrinterSettingsContextProvider>
                        <PageSettingsContextProvider>
                            {children}
                        </PageSettingsContextProvider>
                    </PrinterSettingsContextProvider>
                </BinSettingsContextProvider>
            </DrawerSettingsContextProvider>
        )
    }, [])

    return (
        <div className="bg-neutral-900 text-white grid md:grid-cols-[minmax(800px,_1fr)_400px] h-lvh">
            <AllSettingsProviders>
                <ThreeApp updateBinMeshArray={updateBinMeshArray} />
                <NextUIProvider>
                    <ConfigPanel {...props} exportBins={exportBins} />
                </NextUIProvider>
            </AllSettingsProviders>
        </div>
    );
}

export default App;
