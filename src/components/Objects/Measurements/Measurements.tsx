import { Euler, Vector3 } from "@react-three/fiber";
import { FontData, Text3D } from "@react-three/drei";
import spaceMonoFont from "../../../fonts/SpaceMono.json";

export const Measurements = ({ width, height, depth }: DrawerSettings) =>
    [
        {
            value: `${depth}mm`,
            position: [-width / 2 - 45, -height / 2, -20],
            rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        },
        {
            value: `${width}mm`,
            position: [-20, -height / 2, depth / 2 + 55],
            rotation: [-Math.PI / 2, 0, 0],
        },
        {
            value: `${height}mm`,
            position: [width / 2 + 30, -height / 2 + 32, depth / 2 + 55],
            rotation: [-Math.PI / 2, -Math.PI / 2, 0],
        },
    ].map((measurement) => (
        <Text3D
            font={spaceMonoFont as unknown as FontData}
            size={14}
            height={0.05}
            position={measurement.position as Vector3}
            rotation={measurement.rotation as Euler}
        >
            {measurement.value}
        </Text3D>
    ));
