import { FontLoader, TextGeometry } from "three-stdlib";
import { Euler, Object3DNode, Vector3, extend } from "@react-three/fiber";
import { FontData } from "@react-three/drei";
import spaceMonoFont from "@fonts/SpaceMono.json";

// Must add this in order to add fonts to textGeometry without causing compiler errors
declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}
extend({ TextGeometry });

const Measurements = ({ width, height, depth }: DrawerSettings) => {
    const font = new FontLoader().parse(spaceMonoFont as unknown as FontData);

    new FontLoader();

    const measurements = [
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
    ].map((measurement) => {
        return (
            <mesh
                position={measurement.position as Vector3}
                rotation={measurement.rotation as Euler}
            >
                <textGeometry
                    args={[
                        measurement.value,
                        { font: font, size: 14, height: 0.05 },
                    ]}
                />
            </mesh>
        );
    });

    return measurements;
};

export default Measurements;
