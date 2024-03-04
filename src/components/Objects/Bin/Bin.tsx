import { ForwardedRef, forwardRef, useMemo } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { RoundedEdgedRectGeometry } from "@utils/roundedEdgedRect";

// Unfortunately cannot use @react-three/csg here as when exporting meshes
// that were evaluated by the @react-three/csg library, the subtractions were
// not being taken into effect. Using three-bvh-csg which is what @react-three/csg
// is based on seemed to do the trick for some odd reason.
import { SUBTRACTION, Brush, Evaluator } from "three-bvh-csg";
import { IndexNumber } from "@components/Objects/IndexNumber";
import { usePageContext } from "context/PageSettingsContext";

export const Bin = forwardRef(
    (
        {
            width,
            depth,
            height,
            radius,
            thickness,
            bedSizeX,
            bedSizeY,
            isVaseMode,
            index,
        }: BinValues & { isVaseMode: boolean, index: number },
        ref: ForwardedRef<Mesh>
    ) => {
        const bottomLayerThickness = 1;
        const { areIndexNumbersEnabled } = usePageContext();

        const roundedEdgedRect = RoundedEdgedRectGeometry(
            width,
            height,
            depth,
            radius
        );
        const roundedEdgedRectInner = RoundedEdgedRectGeometry(
            width - thickness * 2,
            height,
            depth - thickness * 2,
            radius
        );

        const canFitOnPrinterBed = width < bedSizeX && depth < bedSizeY;
        const color = canFitOnPrinterBed ? "lightblue" : "salmon";

        const material = useMemo(
            () => new MeshStandardMaterial({ color }),
            [color]
        );

        const roundedEdgedRectBrush = new Brush(roundedEdgedRect);
        roundedEdgedRectBrush.updateMatrixWorld();

        const roundedEdgedRectInnerBrush = new Brush(roundedEdgedRectInner);
        roundedEdgedRectInnerBrush.position.y = bottomLayerThickness;
        roundedEdgedRectInnerBrush.updateMatrixWorld();

        const evaluator = new Evaluator();
        const result = evaluator.evaluate(
            roundedEdgedRectBrush,
            roundedEdgedRectInnerBrush,
            SUBTRACTION
        );

        return (
            <group position={[width / 2, 10, depth / 2]}>
                {areIndexNumbersEnabled && <IndexNumber
                    position={[index + 1 > 9 ? -11 : -6, height / 2 + 2, 7]}
                    value={(index + 1).toString()}
                />}
                <mesh
                    ref={!isVaseMode ? ref : undefined}
                    geometry={result.geometry}
                    material={material}
                    receiveShadow
                />
                <mesh
                    ref={isVaseMode ? ref : undefined}
                    geometry={roundedEdgedRect}
                    visible={false}
                />
            </group>
        );
    }
);
