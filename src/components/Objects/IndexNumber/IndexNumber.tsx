import { FontLoader, TextGeometry } from "three-stdlib";
import { Object3DNode, Vector3, extend } from "@react-three/fiber";
import { FontData } from "@react-three/drei";
import spaceMonoFont from "@fonts/SpaceMono.json";

// Must add this in order to add fonts to textGeometry without causing compiler errors
declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}
extend({ TextGeometry });

type Props = { position: Vector3, value: string }

export const IndexNumber = ({ position, value }: Props) => {
    const font = new FontLoader().parse(spaceMonoFont as unknown as FontData);

    return (
        <mesh
            position={position as Vector3}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <textGeometry
                args={[
                    value,
                    { font: font, size: 14, height: 0.2 },
                ]}
            />
        </mesh>
    );
}
