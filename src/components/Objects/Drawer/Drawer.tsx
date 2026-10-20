import { Box, Cylinder, RoundedBox } from "@react-three/drei";
import { BoxGeometry } from "three";
import { SUBTRACTION, Brush, Evaluator } from "three-bvh-csg";

export const Drawer = ({ width, height, depth }: DrawerSettings) => {
    const outer = new Brush(new BoxGeometry(width + 20, height + 20, depth + 20));
    outer.updateMatrixWorld();

    const inner = new Brush(new BoxGeometry(width, height + 20, depth));
    inner.position.y = 2;
    inner.updateMatrixWorld();

    const evaluator = new Evaluator();
    let base = evaluator.evaluate(outer, inner, SUBTRACTION);

    // Groove down each side wall for the runner to sit in
    for (const side of [-1, 1]) {
        const groove = new Brush(new BoxGeometry(4, 16, depth + 20));
        groove.position.x = side * (width / 2 + 8);
        groove.updateMatrixWorld();
        base = evaluator.evaluate(base, groove, SUBTRACTION);
    }

    const drawerBase = (
        <mesh geometry={base.geometry}>
            <meshStandardMaterial color="lightgrey" />
        </mesh>
    );

    // Front panel overhangs the box, with softened edges
    const frontHeight = height + 30;
    const frontZ = depth / 2 + 20;
    const drawerFront = (
        <RoundedBox
            args={[width + 50, frontHeight, 20]}
            radius={4}
            position={[0, 5, frontZ - 10]}
        >
            <meshStandardMaterial color="gainsboro" />
        </RoundedBox>
    );

    // Bar pull in the upper half of the front
    const handleLength = Math.min(width * 0.4, 160);
    const handleY = 5 + frontHeight / 5;
    const handle = (
        <group position={[0, handleY, frontZ]}>
            {[-1, 1].map((side) => (
                <Cylinder
                    key={side}
                    args={[4, 4, 30]}
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[(side * handleLength) / 2, 0, 15]}
                >
                    <meshStandardMaterial color="grey" metalness={0.6} roughness={0.3} />
                </Cylinder>
            ))}
            <Cylinder
                args={[5, 5, handleLength + 20]}
                rotation={[0, 0, Math.PI / 2]}
                position={[0, 0, 30]}
            >
                <meshStandardMaterial color="grey" metalness={0.6} roughness={0.3} />
            </Cylinder>
        </group>
    );

    // Silver runners recessed into the side walls, 1mm in from the surface
    const runners = [-1, 1].map((side) => (
        <Box
            key={side}
            args={[3, 12, depth]}
            position={[side * (width / 2 + 7.5), 0, 0]}
        >
            <meshStandardMaterial color="silver" metalness={0.3} roughness={0.25} />
        </Box>
    ));

    return [drawerBase, drawerFront, handle, ...runners];
};
