import "./App.css";
import ThreeRoot from "./components/ThreeRoot";
import ConfigPanel from "./components/ConfigPanel";
import throttle from "lodash.throttle";
import { useCallback, useRef, useState } from "react";
import { Mesh } from "three";
import { saveAs } from "file-saver";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { DEFAULT_VALUES } from "./consts";

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

    const exportBins = () => {
        setIsExporting(true);

        binMeshArray.current.forEach((binMesh, index) => {
            const exporter = new OBJExporter();

            const newMesh = new Mesh(binMesh.geometry);
            newMesh.rotateX(Math.PI / 2);
            newMesh.updateMatrixWorld();

            const file = exporter.parse(newMesh);

            saveAs(
                new Blob([file], { type: "text/plain" }),
                `Bin_${index + 1}_${new Date().getTime()}.obj`
            );
        });

        setIsExporting(false);
    };

    return (
        <div className="bg-neutral-900 text-white grid grid-cols-[minmax(800px,_1fr)_400px] h-lvh">
            {/* Canvas for Three.js */}
            <ThreeRoot
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
