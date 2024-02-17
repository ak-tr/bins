import { Slider, SliderValue } from "@nextui-org/react";

type Props = ConfigValuesProps & {
    onConfigValueChange: (property: string, value: number) => void;
    setDefault: () => void;
};

const ConfigPanel = ({
    width,
    height,
    depth,
    radius,
    onConfigValueChange,
    setDefault,
}: Props) => {
    const size = "md";

    const sliders = [
        {
            label: "Width",
            value: width,
            maxValue: 120,
            minValue: 15,
        },
        {
            label: "Height",
            value: height,
            maxValue: 45,
            minValue: 3,
        },
        {
            label: "Depth",
            value: depth,
            maxValue: 85,
            minValue: 15,
        },
        {
            label: "Radius",
            value: radius,
            maxValue: 1.5,
            minValue: 0,
        }
    ];

    return (
        <div className="py-2 px-5 border-l-1 antialiased bg-neutral-950">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold pb-4">Box Settings</h1>
                <i
                    className="gg-redo mb-3 cursor-pointer"
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
                            step={0.1}
                            maxValue={slider.maxValue}
                            minValue={slider.minValue}
                            aria-label={slider.label}
                            defaultValue={slider.value}
                            value={slider.value}
                            className="max-w-md"
                            classNames={{
                                filler: "bg-white",
                            }}
                            hideThumb={true}
                            onChange={(value: SliderValue) =>
                                onConfigValueChange(
                                    slider.label.toLowerCase(),
                                    value as number
                                )
                            }
                            getValue={(value: SliderValue) =>
                                `${value}cm / ${(value as number) * 10}mm`
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ConfigPanel;
