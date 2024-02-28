import "./App.css";

// Components
import { ThreeApp } from "@components/ThreeApp";
import { ConfigPanel } from "@components/ConfigPanel";

// React imports
import { useCallback, useRef, useState } from "react";

// Three or related imports
import { Mesh } from "three";
import { saveAs } from "file-saver";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";

// Other
import { DEFAULT_VALUES } from "./consts";
import throttle from "lodash.throttle";
import JSZip from "jszip";

function App() {
    const [configValues, setConfigValues] = useState({
        ...DEFAULT_VALUES,
    });
    const [isExporting, setIsExporting] = useState(false);
    const binMeshArray = useRef<Mesh[]>([]);

    const props = { ...configValues, isExporting };

    const onConfigValueChange = (property: string, value: number) => {
        setConfigValues((prev) => {
            return { ...prev, [property]: value };
        });
    };
    const throttledOnConfigValueChange = useCallback(
        throttle(onConfigValueChange, 50, { trailing: false }),
        []
    );

    const setDefault = () => {
        setConfigValues(() => ({ ...DEFAULT_VALUES }));
    };
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

            zip.file(`Bin_${index + 1}_${timestamp}.obj`, new Blob([file], { type: "text/plain" }))
        });

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `bins_${timestamp}.zip`)

        setIsExporting(false);
    };

    return (
        <div className="bg-neutral-900 text-white grid grid-cols-[minmax(800px,_1fr)_400px] h-lvh">
            {/* Canvas for Three.js */}
            <ThreeApp
                {...configValues}
                updateBinMeshArray={updateBinMeshArray}
            />
            {/* Settings sliders */}
            <ConfigPanel
                {...props}
                onConfigValueChange={throttledOnConfigValueChange}
                setDefault={setDefault}
                exportBins={exportBins}
            />
        </div>
    );
}

export default App;
