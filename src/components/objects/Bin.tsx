import { Subtraction, Geometry, Base } from "@react-three/csg";
import { BoxGeometry } from "three";
import { RoundedBoxGeometry } from "three-stdlib";

type PositionProps = {
    x: number;
    y: number;
    z: number;
};

type BinProps = {
    radius: number;
};

const Bin = ({
    width,
    height,
    depth,
    x,
    y,
    z,
    radius,
}: ConfigValuesProps & PositionProps & BinProps) => {
    const roundedBoxGeometry = new RoundedBoxGeometry(
        width,
        height + radius * 2,
        depth,
        5,
        radius
    );
    const roundedBoxGeometryInner = new RoundedBoxGeometry(
        width - 2,
        height,
        depth - 2,
        5,
        radius
    );

    const boxGeometry = new BoxGeometry(width, height, depth);
    const boxGeometryInner = new BoxGeometry(width - 2, height - 1, depth - 2);

    const binBase = (
        <mesh position={[x, y, z]}>
            <meshStandardMaterial color="teal" />
            <Geometry>
                {/* Create box */}
                <Base geometry={radius === 0 ? boxGeometry : roundedBoxGeometry} />
                {/* Subtract inside, conditionally use boxGeometry vs roundedBoxGeometry as it was causing visual issues */}
                <Subtraction
                    geometry={radius === 0 ? boxGeometryInner : roundedBoxGeometryInner}
                    position={[0, radius > 0 ? (1.5 - radius) + radius : 1, 0]}
                />
                {/* Remove top */}
                <Subtraction position={[0, height, 0]}>
                    <boxGeometry args={[width, height, depth]} />
                </Subtraction>
            </Geometry>
        </mesh>
    );

    return binBase;
};

export default Bin;
