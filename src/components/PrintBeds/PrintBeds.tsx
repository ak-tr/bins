import { useSettings } from "../../context/SettingsContext";
import { generateBins } from "../../utils/generators/generateBins";
import { packBins } from "../../utils/packBins";

const pad = (n: number) => n.toString().padStart(2, "0");

// Plate edge around the printable area and the lift tab below it, in mm
const MARGIN = 8;
const TAB = 6;

export const PrintBeds = () => {
    const settings = useSettings();
    const { bedSizeX, bedSizeY } = settings;
    const { beds, unprintable } = packBins(generateBins(settings), bedSizeX, bedSizeY);
    const plateX = bedSizeX + MARGIN * 2;
    const plateY = bedSizeY + MARGIN * 2;

    return (
        <section
            aria-label="Print beds"
            className="flex flex-col shrink-0 min-h-0 xl:w-72 border-b xl:border-b-0 xl:border-r border-neutral-800 font-mono text-xs uppercase tracking-wide text-neutral-500"
        >
            <h2 className="flex justify-between gap-4 px-4 py-3 text-white">
                Print beds / {pad(beds.length)}
                <span className="text-neutral-500">
                    {bedSizeX} x {bedSizeY}mm
                </span>
            </h2>
            <div className="flex xl:flex-col gap-0.5 overflow-auto">
                {beds.map((bed, i) => (
                    <figure
                        key={i}
                        className="flex flex-col gap-2 p-3 shrink-0 w-40 xl:w-auto bg-tile even:bg-tile-2"
                    >
                        <figcaption className="flex justify-between">
                            <span>Bed {pad(i + 1)}</span>
                            <span>{bed.length} bins</span>
                        </figcaption>
                        <svg
                            viewBox={`${-MARGIN} ${-MARGIN} ${plateX} ${plateY + TAB}`}
                            className="w-full"
                            role="img"
                            aria-label={`Bins ${bed.map((p) => p.index + 1).join(", ")}`}
                        >
                            <defs>
                                <pattern id={`grid-${i}`} width={10} height={10} patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 H 0 V 10" fill="none" strokeWidth={0.4} className="stroke-neutral-700" />
                                </pattern>
                                <mask id={`plate-${i}`}>
                                    <rect x={-MARGIN} y={-MARGIN} width={plateX} height={plateY} rx={6} fill="white" />
                                    {/* Lift tab at the front */}
                                    <rect x={bedSizeX / 2 - 15} y={bedSizeY} width={30} height={MARGIN + TAB} rx={3} fill="white" />
                                    {/* Alignment notches at the back */}
                                    <circle cx={20} cy={-MARGIN} r={4} fill="black" />
                                    <circle cx={bedSizeX - 20} cy={-MARGIN} r={4} fill="black" />
                                </mask>
                            </defs>
                            <rect
                                x={-MARGIN}
                                y={-MARGIN}
                                width={plateX}
                                height={plateY + TAB}
                                mask={`url(#plate-${i})`}
                                className="fill-neutral-800"
                            />
                            <rect
                                width={bedSizeX}
                                height={bedSizeY}
                                fill={`url(#grid-${i})`}
                                strokeWidth={0.6}
                                className="stroke-neutral-600"
                            />
                            {bed.map((p) => (
                                <g key={p.index}>
                                    <rect
                                        x={p.x}
                                        y={p.y}
                                        width={p.width}
                                        height={p.depth}
                                        rx={Math.min(p.radius, p.width / 2, p.depth / 2)}
                                        className="fill-black stroke-neutral-400"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    <text
                                        x={p.x + p.width / 2}
                                        y={p.y + p.depth / 2}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        fontSize={Math.min(p.width, p.depth) / 4}
                                        className="fill-white"
                                    >
                                        {p.index + 1}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </figure>
                ))}
                {unprintable.length > 0 && (
                    <p className="m-3 p-3 shrink-0 w-40 xl:w-auto border border-dashed border-neutral-700">
                        Too big for the bed: {unprintable.map((i) => i + 1).join(", ")}
                    </p>
                )}
            </div>
        </section>
    );
};
