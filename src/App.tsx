import "./App.css";
import ThreeRoot from "./components/ThreeRoot";
import ConfigPanel from "./components/ConfigPanel";
import { useCallback, useRef, useState } from "react";
import { Mesh } from "three";
import throttle from "lodash.throttle";
import { saveAs } from "file-saver";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";

function App() {
    const defaults = {
        width: 320,
        height: 130,
        depth: 560,
        radius: 25,
        thickness: 5,
        divideWidth: 0.55,
        divideDepth: 0.45,
        outerGap: 5,
        innerGap: 5,
        bedSizeX: 220,
        bedSizeY: 220,
        iterations: 1,
    };

    const [configValues, setConfigValues] = useState({
        ...defaults,
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
        setConfigValues(() => ({ ...defaults }));
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

    console.log(binMeshArray);

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
