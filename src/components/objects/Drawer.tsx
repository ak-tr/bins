import { Subtraction, Geometry, Base } from "@react-three/csg";
import { Box } from "@react-three/drei";

const Drawer = ({ width, height, depth }: ConfigValuesProps) => {
    const drawerBase = (
        <mesh>
            <meshStandardMaterial color="lightgrey" />
            <Geometry>
                <Base>
                    <boxGeometry args={[width + 2, height + 1, depth + 2]} />
                </Base>
                <Subtraction position={[0, 1, 0]}>
                    <boxGeometry args={[width, height, depth]} />
                </Subtraction>
            </Geometry>
        </mesh>
    );

    const drawerEnd = (
        <Box args={[width + 5, height + 3, 2]} position={[0, 0.5, depth / 2 + 1]}>
            <meshStandardMaterial color="lightgrey" />
        </Box>
    );

    const drawer = [drawerBase, drawerEnd];

    return drawer
}

export default Drawer;
