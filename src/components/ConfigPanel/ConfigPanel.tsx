import { MutableRefObject, ReactNode, RefObject, useState } from "react";
import { Mesh } from "three";

import { useSettings } from "../../context/SettingsContext";
import { exportMeshesToObj } from "../../utils/exportMeshesToObj";
import { GENERATION_TYPES } from "../../constants";

type Props = { binRefs: MutableRefObject<RefObject<Mesh>[]> };

type Slider = {
    label: string;
    key: keyof Settings;
    min: number;
    max: number;
    step?: number;
    mm?: boolean;
};

const boxSliders: Slider[] = [
    { label: "Width", key: "width", min: 60, max: 1200, mm: true },
    { label: "Height", key: "height", min: 35, max: 450, mm: true },
    { label: "Depth", key: "depth", min: 100, max: 850, mm: true },
];

const divisionSliders: Slider[] = [
    { label: "Width Division", key: "divideWidth", min: 0.1, max: 0.9, step: 0.01 },
    { label: "Depth Division", key: "divideDepth", min: 0.1, max: 0.9, step: 0.01 },
];

const gapSliders: Slider[] = [
    { label: "Outer Gap", key: "outerGap", min: 0, max: 20, step: 0.1, mm: true },
    { label: "Inner Gap", key: "innerGap", min: 0, max: 20, step: 0.1, mm: true },
];

const generationSliders: Record<GenerationType, Slider[]> = {
    Recursive: [{ label: "Iterations", key: "iterations", min: 0, max: 3 }],
    Grid: [
        { label: "Rows", key: "rows", min: 1, max: 10 },
        { label: "Columns", key: "cols", min: 1, max: 10 },
    ],
};

const checkboxes: { label: string; key: keyof Settings }[] = [
    { label: "Show measurements", key: "areMeasurementsEnabled" },
    { label: "Show index numbers", key: "areIndexNumbersEnabled" },
    { label: "Export as 'Vase Mode' object", key: "isVaseMode" },
];

export const ConfigPanel = ({ binRefs }: Props) => {
    const settings = useSettings();
    const { type, bedSizeX, bedSizeY, update } = settings;
    const [isExporting, setIsExporting] = useState(false);

    const exportBins = async () => {
        setIsExporting(true);

        try {
            await exportMeshesToObj(binRefs.current.map((ref) => ref.current!));
        } catch (err) {
            console.log("Error exporting bins");
            console.log(err);
        } finally {
            setIsExporting(false);
        }
    };

    const binSliders: Slider[] = [
        { label: "Radius", key: "radius", min: 5, max: 150, mm: true },
        { label: "Thickness", key: "thickness", min: 2, max: 20, mm: true },
        ...(type === "Recursive" ? divisionSliders : []),
        ...gapSliders,
    ];

    const sliderComponent = ({ label, key, min, max, step = 1, mm }: Slider) => {
        const value = settings[key] as number;
        const percent = ((value - min) / (max - min)) * 100;

        return (
            <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between font-mono text-xs uppercase tracking-wide text-neutral-500">
                    <span>{label}</span>
                    <span>
                        <input
                            key={value}
                            className="w-12 text-right text-white bg-transparent outline-none focus-visible:underline"
                            type="text"
                            aria-label={`${label} value`}
                            defaultValue={value}
                            onKeyDown={(e) => {
                                const typed = Number(e.currentTarget.value);
                                if (e.key !== "Enter" || isNaN(typed)) return;

                                const clamped = Math.min(max, Math.max(min, typed));
                                e.currentTarget.value = String(clamped);
                                update({ [key]: clamped });
                            }}
                        />
                        {mm && "mm"}
                    </span>
                </div>
                <div className="relative h-6 bg-tile-2 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-white">
                    <div
                        className="absolute inset-y-0 left-0 bg-invert"
                        style={{ width: `${percent}%` }}
                    />
                    <input
                        type="range"
                        aria-label={label}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                        step={step}
                        min={min}
                        max={max}
                        value={value}
                        onChange={(e) => update({ [key]: Number(e.target.value) })}
                    />
                </div>
            </div>
        );
    };

    const section = (title: string, children: ReactNode, open = false) => (
        <details open={open} className="group border-b border-neutral-900">
            <summary className="flex justify-between py-3 cursor-pointer list-none font-mono text-xs uppercase tracking-wide text-neutral-500 hover:text-white focus-visible:text-white outline-none group-open:text-white">
                {title}
                <span aria-hidden className="group-open:hidden">+</span>
                <span aria-hidden className="hidden group-open:inline">-</span>
            </summary>
            <div className="flex flex-col gap-4 pb-5">{children}</div>
        </details>
    );

    const monoLabel = "font-mono text-xs uppercase tracking-wide text-neutral-500";
    const field =
        "h-9 px-2 bg-tile-2 border border-neutral-800 text-white font-mono text-sm outline-none focus-visible:border-white";

    return (
        <div className="max-h-64 md:max-h-full overflow-auto flex flex-col pb-4 px-5 border-l border-t sm:border-t-0 border-neutral-800">
            {section(
                "Box Settings",
                boxSliders.map(sliderComponent),
                true
            )}
            {section(
                "Bin Settings",
                binSliders.map(sliderComponent),
                true
            )}
            {section(
                "Generation Settings",
                <>
                    <label className="flex flex-col gap-1">
                        <span className={monoLabel}>Generation Type</span>
                        <select
                            className={`${field} uppercase`}
                            value={type}
                            onChange={(event) =>
                                update({
                                    type: event.target.value as GenerationType,
                                })
                            }
                        >
                            {GENERATION_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>
                    {generationSliders[type].map(sliderComponent)}
                </>,
                true
            )}
            {section(
                "Printer Settings",
                <div className="flex flex-col gap-1">
                    <span className={monoLabel}>Printer Bed Size (X, Y) / mm</span>
                    <div className="flex gap-3 items-center">
                        <input
                            type="number"
                            aria-label="Bed size X"
                            className={`${field} w-full`}
                            value={bedSizeX.toString()}
                            onChange={(e) =>
                                update({ bedSizeX: +e.target.value })
                            }
                        />
                        <span className={monoLabel}>X</span>
                        <input
                            type="number"
                            aria-label="Bed size Y"
                            className={`${field} w-full`}
                            value={bedSizeY.toString()}
                            onChange={(e) =>
                                update({ bedSizeY: +e.target.value })
                            }
                        />
                    </div>
                </div>
            )}
            {section(
                "Page Settings",
                checkboxes.map((checkbox) => (
                    <label key={checkbox.key} className="flex gap-3 items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="appearance-none size-4 border border-neutral-600 checked:bg-invert checked:border-invert outline-none focus-visible:border-white cursor-pointer"
                            checked={settings[checkbox.key] as boolean}
                            onChange={(e) =>
                                update({ [checkbox.key]: e.target.checked })
                            }
                        />
                        {checkbox.label}
                    </label>
                ))
            )}

            <div className="flex flex-col grow justify-end pt-5">
                <button
                    className="h-12 w-full bg-tile-2 border border-neutral-800 font-mono text-sm uppercase tracking-wide text-white hover:bg-invert hover:text-black focus-visible:bg-invert focus-visible:text-black outline-none disabled:opacity-55"
                    disabled={isExporting}
                    onClick={exportBins}
                >
                    {isExporting ? "Exporting..." : "Export Bins"}
                </button>
            </div>
        </div>
    );
};
