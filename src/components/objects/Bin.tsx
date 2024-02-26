import { ForwardedRef, forwardRef } from "react";
import { RoundedEdgedRectGeometry } from "../../utils/roundedEdgedRect";
import { Mesh } from "three";

// Unfortunately cannot use @react-three/csg here as when exporting meshes
// that were evaluated by the @react-three/csg library, the subtractions were
// not being taken into effect. Using three-bvh-csg which is what @react-three/csg
// is based on seemed to do the trick for some odd reason.
import { SUBTRACTION, Brush, Evaluator } from "three-bvh-csg";

const Bin = forwardRef(
    (
        {
            width,
            depth,
            height,
            radius,
            thickness,
            bedSizeX,
            bedSizeY,
        }: BinValuesProps,
        ref: ForwardedRef<Mesh>
    ) => {
        const roundedEdgedRect = RoundedEdgedRectGeometry(
            width,
            height,
            depth,
            radius
        );
        const roundedEdgedRectInner = RoundedEdgedRectGeometry(
            width - thickness * 2,
            height - thickness * 2,
            depth - thickness * 2,
            radius
        );

        const canFitOnPrinterBed = width < bedSizeX && depth < bedSizeY;
        const color = canFitOnPrinterBed ? "lightblue" : "salmon";

        const roundedEdgedRectBrush = new Brush(roundedEdgedRect);
        roundedEdgedRectBrush.updateMatrixWorld();

        const roundedEdgedRectInnerBrush = new Brush(roundedEdgedRectInner);
        roundedEdgedRectInnerBrush.position.y = thickness * 2;
        roundedEdgedRectInnerBrush.updateMatrixWorld();

        const evaluator = new Evaluator();
        const result = evaluator.evaluate(
            roundedEdgedRectBrush,
            roundedEdgedRectInnerBrush,
            SUBTRACTION
        );

        return (
            <group position={[width / 2, 0, depth / 2]}>
                <mesh ref={ref} geometry={result.geometry}>
                    <meshStandardMaterial color={color} />
                </mesh>
            </group>
        );
    }
);

export default Bin;