// Three imports
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";

// Utilities
import { generateBinsRecursive } from "@utils/generators/generateBinsRecursive";
import { generateBinsGrid } from "@utils/generators/generateBinsGrid";

// Components
import { Drawer } from "@components/Objects/Drawer";
import { Measurements } from "@components/Objects/Measurements";
import { Bin } from "@components/Objects/Bin";

// React imports
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useDrawerContext } from "context/DrawerSettingsContext";
import { useBinContext } from "context/BinSettingsContext";
import { usePrinterContext } from "context/PrinterSettingsContext";
import { usePageContext } from "context/PageSettingsContext";
import { useGenerationContext } from "context/GenerationSettingsContext";

type Props = {
    updateBinMeshArray: (refs: any[]) => void;
};

export const ThreeApp = ({ updateBinMeshArray }: Props) => {
    const { width, height, depth } = useDrawerContext();
    const { radius, thickness, divideWidth, divideDepth, outerGap, innerGap } =
        useBinContext();
    const { type, iterations, rows, cols } = useGenerationContext();
    const { bedSizeX, bedSizeY } = usePrinterContext();
    const { areMeasurementsEnabled, isVaseMode } = usePageContext();

    const binRefs = useRef([]);

    const groupedBins = useMemo(() => {
        let props: BaseBinValues = {
            width: width - outerGap * 2,
            depth: depth - outerGap * 2,
            height,
            divideWidth,
            divideDepth,
            radius,
            thickness,
            innerGap,
        };

        if (type === "Recursive") {
            props.iterations = iterations;
        } else {
            props.rows = rows;
            props.cols = cols;
        }

        const bins =
            type === "Recursive"
                ? generateBinsRecursive(props)
                : generateBinsGrid(props);

        binRefs.current = bins.map(
            (_, index) => binRefs.current[index] ?? createRef()
        );

        const binObjects = bins.map((bin, index) => {
            // Position in group to avoid position via the centre of the bin
            return (
                <group key={index} position={[bin.x, bin.y, bin.z]}>
                    <Bin
                        ref={binRefs.current[index]}
                        width={bin.width}
                        height={bin.height}
                        depth={bin.depth}
                        radius={bin.radius}
                        thickness={bin.thickness}
                        bedSizeX={bedSizeX}
                        bedSizeY={bedSizeY}
                        isVaseMode={isVaseMode}
                        index={index}
                    />
                </group>
            );
        });

        return binObjects;
    }, [
        width,
        height,
        depth,
        radius,
        thickness,
        divideWidth,
        divideDepth,
        outerGap,
        innerGap,
        iterations,
        bedSizeX,
        bedSizeY,
        type,
        rows,
        cols,
    ]);

    const allBins = (
        <group position={[-width / 2 + outerGap, 0, -depth / 2 + outerGap]}>
            {...groupedBins}
        </group>
    );

    const objectVolume = width * height * depth;

    updateBinMeshArray(binRefs.current);

    const [distance, setDistance] = useState(1000);

    useEffect(() => {
        // Dynamically change distance depending on how large the box is
        const normalise = (val: number, max: number, min: number) =>
            (val - min) / (max - min);
        setDistance(1000 + 1000 * normalise(objectVolume, 459000000, 687500));
    }, [objectVolume]);

    const drawer = useMemo(
        () => Drawer({ width, height, depth }),
        [width, height, depth]
    );
    const measurements = useMemo(
        () => Measurements({ width, height, depth }),
        [width, height, depth]
    );

    const objects = [...drawer, allBins];

    if (areMeasurementsEnabled) objects.push(...measurements);

    return (
        <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, -30, distance]} />
            <ambientLight intensity={1} />
            <spotLight position={[0, 400, 100]} intensity={50000} />
            <rectAreaLight
                intensity={10000}
                position={[5, 200, distance]}
                color="white"
            />
            <PresentationControls
                enabled={true} // the controls can be disabled by setting this to false
                global={false} // Spin globally or by dragging the model
                cursor={true} // Whether to toggle cursor style on drag
                snap={false} // Snap-back to center (can also be a spring config)
                speed={0.9} // Speed factor
                zoom={0.75} // Zoom factor when half the polar-max is reached
                rotation={[0.8, 0.3, 0]} // Default rotation
                polar={[-0.4, Math.PI / 2]} // Vertical limits
                azimuth={[-Infinity, Infinity]} // Horizontal limits
                config={{ mass: 0.5, tension: 120, friction: 10 }} // Spring config
            >
                {...objects}
            </PresentationControls>
        </Canvas>
    );
};
