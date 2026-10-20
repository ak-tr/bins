import { ForwardedRef, forwardRef, useMemo } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { FontData, Text3D } from "@react-three/drei";
import { RoundedEdgedRectGeometry } from "../../../utils/geometry/RoundedEdgedRectGeometry";
import spaceMonoFont from "../../../fonts/SpaceMono.json";

// Unfortunately cannot use @react-three/csg here as when exporting meshes
// that were evaluated by the @react-three/csg library, the subtractions were
// not being taken into effect. Using three-bvh-csg which is what @react-three/csg
// is based on seemed to do the trick for some odd reason.
import { SUBTRACTION, Brush, Evaluator } from "three-bvh-csg";
import { useSettings } from "../../../context/SettingsContext";
import { fitsOnBed } from "../../../utils/packBins";

export const Bin = forwardRef(
    (
        {
            width,
            depth,
            height,
            radius,
            thickness,
            index,
        }: Omit<Bin, "x" | "y" | "z"> & { index: number },
        ref: ForwardedRef<Mesh>
    ) => {
        const bottomLayerThickness = 1;
        const { bedSizeX, bedSizeY, isVaseMode, areIndexNumbersEnabled } =
            useSettings();

        const color = fitsOnBed(width, depth, bedSizeX, bedSizeY)
            ? "lightblue"
            : "salmon";

        const material = useMemo(
            () => new MeshStandardMaterial({ color }),
            [color]
        );

        // CSG is slow, so only redo it when the bin's shape changes
        const { roundedEdgedRect, result } = useMemo(() => {
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

            return { roundedEdgedRect, result };
        }, [width, height, depth, radius, thickness]);

        return (
            <group position={[width / 2, 10, depth / 2]}>
                {areIndexNumbersEnabled && (
                    <Text3D
                        font={spaceMonoFont as unknown as FontData}
                        size={14}
                        position={[index + 1 > 9 ? -11 : -6, height / 2 + 2, 7]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        {index + 1}
                    </Text3D>
                )}
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
