// Three imports
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import { Mesh } from "three";

// Utilities
import { generateBins } from "../../utils/generators/generateBins";

// Components
import { Drawer } from "../Objects/Drawer/Drawer";
import { Measurements } from "../Objects/Measurements/Measurements";
import { Bin } from "../Objects/Bin/Bin";

// React imports
import { MutableRefObject, RefObject, createRef, useMemo } from "react";
import { useSettings } from "../../context/SettingsContext";

type Props = { binRefs: MutableRefObject<RefObject<Mesh>[]> };

export const ThreeApp = ({ binRefs }: Props) => {
    const settings = useSettings();
    const { width, height, depth, outerGap, areMeasurementsEnabled } = settings;

    const bins = generateBins(settings);
    binRefs.current = bins.map(
        (_, index) => binRefs.current[index] ?? createRef()
    );

    const groupedBins = bins.map((bin, index) => (
        // Position in group to avoid position via the centre of the bin
        <group key={index} position={[bin.x, bin.y, bin.z]}>
            <Bin
                ref={binRefs.current[index]}
                width={bin.width}
                height={bin.height}
                depth={bin.depth}
                radius={bin.radius}
                thickness={bin.thickness}
                index={index}
            />
        </group>
    ));

    const allBins = (
        <group position={[-width / 2 + outerGap, 0, -depth / 2 + outerGap]}>
            {...groupedBins}
        </group>
    );

    // Dynamically change distance depending on how large the box is
    const objectVolume = width * height * depth;
    const distance = 1000 + (1000 * (objectVolume - 687500)) / (459000000 - 687500);

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
                speed={0.9}
                zoom={0.75} // Zoom factor when half the polar-max is reached
                rotation={[0.8, 0.3, 0]} // Default rotation
                polar={[-0.4, Math.PI / 2]} // Vertical limits
                config={{ mass: 0.5, tension: 120, friction: 10 }} // Spring config
            >
                {...objects}
            </PresentationControls>
        </Canvas>
    );
};
