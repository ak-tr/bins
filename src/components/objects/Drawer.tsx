import { Subtraction, Geometry, Base } from "@react-three/csg";
import { Box } from "@react-three/drei";

const Drawer = ({ width, height, depth }: ConfigValuesProps) => {
    const drawerBase = (
        <mesh>
            <meshStandardMaterial color="lightgrey" />
            <Geometry>
                <Base>
                    <boxGeometry args={[width + 20, height + 10, depth + 20]} />
                </Base>
                <Subtraction position={[0, 5, 0]}>
                    <boxGeometry args={[width, height, depth]} />
                </Subtraction>
            </Geometry>
        </mesh>
    );

    const drawerEnd = (
        <Box args={[width + 50, height + 30, 20]} position={[0, 5, depth / 2 + 10]}>
            <meshStandardMaterial color="lightgrey" />
        </Box>
    );

    const drawer = [drawerBase, drawerEnd];

    return drawer
}

export default Drawer;
