import { Slider, SliderValue, Link, Button, Input } from "@nextui-org/react";

type Props = ConfigValuesProps & ExtraProps & {
    onConfigValueChange: (property: string, value: number) => void;
    setDefault: () => void;
    exportBins: () => void;
};

const ConfigPanel = ({
    width,
    height,
    depth,
    radius,
    thickness,
    divideWidth,
    divideDepth,
    outerGap,
    innerGap,
    iterations,
    bedSizeX,
    bedSizeY,
    isExporting,
    onConfigValueChange,
    setDefault,
    exportBins,
}: Props) => {
    const size = "lg";

    const sliders = [
        {
            label: "Width",
            value: width,
            maxValue: 1200,
            minValue: 150,
            showCm: true,
            rawValue: false,
        },
        {
            label: "Height",
            value: height,
            maxValue: 450,
            minValue: 75,
            showCm: true,
            rawValue: false,
        },
        {
            label: "Depth",
            value: depth,
            maxValue: 850,
            minValue: 150,
            showCm: true,
            rawValue: false,
        },
        {
            label: "Radius",
            value: radius,
            maxValue: 150,
            minValue: 5,
            showCm: false,
            rawValue: false,
        },
        {
            label: "Thickness",
            value: thickness,
            maxValue: 20,
            minValue: 2,
            showCm: false,
            rawValue: false,
        },
        {
            label: "Width Division",
            variableName: "divideWidth",
            value: divideWidth,
            maxValue: 0.9,
            minValue: 0.1,
            rawValue: true,
            step: 0.01,
        },
        {
            label: "Depth Division",
            variableName: "divideDepth",
            value: divideDepth,
            maxValue: 0.9,
            minValue: 0.1,
            rawValue: true,
            step: 0.01,
        },
        {
            label: "Outer Gap",
            variableName: "outerGap",
            value: outerGap,
            maxValue: 20,
            minValue: 0,
            step: 0.1,
        },
        {
            label: "Inner Gap",
            variableName: "innerGap",
            value: innerGap,
            maxValue: 20,
            minValue: 0,
            step: 0.1,
        },
        {
            label: "Iterations",
            value: iterations,
            maxValue: 3,
            minValue: 0,
            rawValue: true,
            step: 1,
        },
    ];

    return (
        <div className="flex flex-col py-2 px-5 border-l-1 border-neutral-800 antialiased bg-neutral-950 gap-2">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Configuration</h1>
                <i
                    className="gg-redo cursor-pointer"
                    onClick={setDefault}
                ></i>
            </div>
            <div className="flex flex-col gap-2">
                {sliders.map((slider) => {
                    return (
                        <Slider
                            key={slider.label}
                            label={slider.label}
                            size={size}
                            step={slider.step || 1}
                            maxValue={slider.maxValue}
                            minValue={slider.minValue}
                            aria-label={slider.label}
                            value={slider.value}
                            className="max-w-md"
                            classNames={{
                                filler: "bg-white",
                                track: "rounded bg-black cursor-ew-resize",
                                labelWrapper:
                                    "relative top-5 h-0 px-2 z-50 mix-blend-difference pointer-events-none",
                                value: "text-md",
                                label: "text-md",
                            }}
                            hideThumb={true}
                            onChange={(value: SliderValue) =>
                                onConfigValueChange(
                                    slider?.variableName ||
                                        slider.label.toLowerCase(),
                                    value as number
                                )
                            }
                            getValue={(value: SliderValue) =>
                                slider.rawValue
                                    ? value.toString()
                                    : `${(value as number)}mm`
                            }
                        />
                    );
                })}
            </div>
            <div className="w-full flex flex-col gap-2 mt-2">
                <span>Printer Bed Size (X, Y)</span>
                <div className="flex gap-3 items-center">
                <Input 
                    type="number"
                    radius="sm"
                    endContent={
                        <span className="font-bold text-black">mm</span>
                    }
                    classNames={{
                        inputWrapper: "h-10",
                        input: "font-bold"
                    }}
                    value={bedSizeX.toString()}
                    onValueChange={(value) => onConfigValueChange("bedSizeX", +value)}
                />
                <span>X</span>
                <Input 
                    type="number"
                    radius="sm"
                    endContent={
                        <span className="font-bold text-black">mm</span>
                    }
                    classNames={{
                        inputWrapper: "h-10",
                        input: "font-bold"
                    }}
                    value={bedSizeY.toString()}
                    onValueChange={(value) => onConfigValueChange("bedSizeY", +value)}
                />
                </div>

            </div>
            <div className="flex flex-col grow justify-end gap-4">
                <Button
                    radius="sm"
                    size="lg"
                    className="bg-white font-black w-full"
                    isLoading={isExporting}
                    onPress={exportBins}
                >
                    <span className="font-bold">Export Bins</span>
                </Button>
                <div className="text-neutral-500 font-bold flex flex-col">
                    <span>
                        Made by
                        <Link isBlock href="https://git.akif.kr">
                            Akif
                        </Link>
                    </span>
                    <span>
                        Inspired by
                        <Link
                            isBlock
                            href="https://nodedojo.gumroad.com/l/dojobin?layout=profile"
                        >
                            Node Dojo
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConfigPanel;
