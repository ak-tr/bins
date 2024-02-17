import { FontLoader, TextGeometry } from "three-stdlib";
import spaceMonoFont from "../../fonts/SpaceMono.json";
import { Euler, Object3DNode, Vector3, extend } from "@react-three/fiber";
import { FontData } from "@react-three/drei";

// Must add this in order to add fonts to textGeometry without causing compiler errors
declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}
extend({ TextGeometry });

const Measurements = ({ width, height, depth }: ConfigValuesProps) => {
    const font = new FontLoader().parse(spaceMonoFont as unknown as FontData);

    new FontLoader();

    const measurements = [
        {
            value: `${depth * 10}mm`,
            position: [-width / 2 - 6, -height / 2, 0],
            rotation: [-Math.PI / 2, 0, -Math.PI / 2],
        },
        {
            value: `${width * 10}mm`,
            position: [0, -height / 2, depth / 2 + 6],
            rotation: [-Math.PI / 2, 0, 0],
        },
        {
            value: `${height * 10}mm`,
            position: [width / 2 + 3, -height / 2 + 4, depth / 2 + 6],
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
                        { font: font, size: 1.5, height: 0.05 },
                    ]}
                />
            </mesh>
        );
    });

    return measurements;
}

export default Measurements;