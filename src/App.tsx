import "./App.css";

// Components
import { ThreeApp } from "@components/ThreeApp";
import { ConfigPanel } from "@components/ConfigPanel";

// React imports
import { useRef, useState } from "react";

// Three or related imports
import { Mesh } from "three";
import { saveAs } from "file-saver";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";

// Other
import JSZip from "jszip";
import { DrawerSettingsContextProvider } from "context/DrawerSettingsContext";
import { BinSettingsContextProvider } from "context/BinSettingsContext";
import { PrinterSettingsContextProvider } from "context/PrinterSettingsContext";
import { PageSettingsContextProvider } from "context/PageSettingsContext";

import { NextUIProvider } from "@nextui-org/react";

function App() {
    const [isExporting, setIsExporting] = useState(false);
    const binMeshArray = useRef<Mesh[]>([]);

    const props = { isExporting };

    const updateBinMeshArray = (refs: any[]) => {
        binMeshArray.current = refs.map((ref) => ref.current);
    };

    const exportBins = async () => {
        setIsExporting(true);

        const timestamp = new Date().getTime();
        const zip = new JSZip();

        binMeshArray.current.forEach((binMesh, index) => {
            const exporter = new OBJExporter();

            const newMesh = new Mesh(binMesh.geometry);
            newMesh.rotateX(Math.PI / 2);
            newMesh.updateMatrixWorld();

            const file = exporter.parse(newMesh);

            zip.file(
                `Bin_${index + 1}_${timestamp}.obj`,
                new Blob([file], { type: "text/plain" })
            );
        });

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `bins_${timestamp}.zip`);

        setIsExporting(false);
    };

    return (
        <div className="bg-neutral-900 text-white grid grid-cols-[minmax(800px,_1fr)_400px] h-lvh">
                <DrawerSettingsContextProvider>
                    <BinSettingsContextProvider>
                        <PrinterSettingsContextProvider>
                            <PageSettingsContextProvider>
                                <ThreeApp
                                    updateBinMeshArray={updateBinMeshArray}
                                />
                                <NextUIProvider>
                                    <ConfigPanel
                                        {...props}
                                        exportBins={exportBins}
                                    />
                                </NextUIProvider>
                            </PageSettingsContextProvider>
                        </PrinterSettingsContextProvider>
                    </BinSettingsContextProvider>
                </DrawerSettingsContextProvider>
        </div>
    );
}

export default App;
