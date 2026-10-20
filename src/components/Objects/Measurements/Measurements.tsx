import { FontData, Line, Text3D } from "@react-three/drei";
import spaceMonoFont from "../../../fonts/SpaceMono.json";

type Point = [number, number, number];

type Measurement = {
    value: string;
    rotation: Point;
    from: Point;
    to: Point;
};

const SIZE = 14;
// Space Mono is monospaced, every glyph advances this far
const CHAR_WIDTH = (spaceMonoFont.glyphs["0"].ha / spaceMonoFont.resolution) * SIZE;
// Space between the text and the line either side of it
const PAD = 6;

const lerp = (a: Point, b: Point, t: number) =>
    a.map((v, i) => v + (b[i] - v) * t) as Point;

export const Measurements = ({ width, height, depth }: DrawerSettings) => {
    const measurements: Measurement[] = [
        {
            value: `${depth}mm`,
            rotation: [-Math.PI / 2, 0, -Math.PI / 2],
            from: [-width / 2 - 40, -height / 2, -depth / 2],
            to: [-width / 2 - 40, -height / 2, depth / 2],
        },
        {
            value: `${width}mm`,
            rotation: [-Math.PI / 2, 0, 0],
            from: [-width / 2, -height / 2, depth / 2 + 40],
            to: [width / 2, -height / 2, depth / 2 + 40],
        },
        {
            value: `${height}mm`,
            rotation: [-Math.PI / 2, -Math.PI / 2, 0],
            from: [width / 2 + 30, -height / 2, depth / 2 + 40],
            to: [width / 2 + 30, height / 2, depth / 2 + 40],
        },
    ];

    return measurements.flatMap(({ value, rotation, from, to }) => {
        const textWidth = value.length * CHAR_WIDTH;
        const length = Math.hypot(...to.map((v, i) => v - from[i]));
        // Fraction of the line either side of the middle left clear for the text
        const gap = Math.min((textWidth / 2 + PAD) / length, 0.5);

        return [
            // Text centred on the line
            <group position={lerp(from, to, 0.5)} rotation={rotation}>
                <Text3D
                    font={spaceMonoFont as unknown as FontData}
                    size={SIZE}
                    height={0.05}
                    position={[-textWidth / 2, -SIZE / 2, 0]}
                >
                    {value}
                </Text3D>
            </group>,
            // Edge to edge line, broken around the text
            <Line
                segments
                color="grey"
                lineWidth={1}
                points={[from, lerp(from, to, 0.5 - gap), lerp(from, to, 0.5 + gap), to]}
            />,
        ];
    });
};
