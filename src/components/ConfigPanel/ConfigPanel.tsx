// UI Components
import {
    Slider,
    SliderValue,
    Link,
    Button,
    Input,
    Accordion,
    AccordionItem,
    Checkbox,
} from "@nextui-org/react";

// Contexts
import { useBinContext } from "context/BinSettingsContext";
import { useDrawerContext } from "context/DrawerSettingsContext";
import { usePageContext } from "context/PageSettingsContext";
import { usePrinterContext } from "context/PrinterSettingsContext";
import { MutableRefObject, useState } from "react";

import { exportMeshesToObj } from "@utils/exportMeshesToObj";
import { Mesh } from "three";

type Props = { binMeshArray: MutableRefObject<Mesh[]> }

export const ConfigPanel = ({ binMeshArray }: Props) => {
    const { width, height, depth, updateBoxSettings } =
        useDrawerContext();
    const {
        radius,
        thickness,
        divideWidth,
        divideDepth,
        outerGap,
        innerGap,
        iterations,
        updateBinSettings,
    } = useBinContext();
    const { bedSizeX, bedSizeY, updatePrinterSettings } =
        usePrinterContext();
    const {
        areMeasurementsEnabled,
        areIndexNumbersEnabled,
        isVaseMode,
        updatePageSettings,
    } = usePageContext();
    const [isExporting, setIsExporting] = useState(false);

    const exportBins = async () => {
        setIsExporting(true);

        try {
            await exportMeshesToObj(binMeshArray);
        } catch (err) {
            console.log("Error exporting bins");
            console.log(err);
        } finally {
            setIsExporting(false);
        }
    };

    const size = "lg";

    const boxSettingsSliders = [
        {
            label: "Width",
            value: width,
            maxValue: 1200,
            minValue: 60,
            rawValue: false,
            inputValue: useState(width),
            updateFunc: updateBoxSettings,
        },
        {
            label: "Height",
            value: height,
            maxValue: 450,
            minValue: 35,
            rawValue: false,
            inputValue: useState(height),
            updateFunc: updateBoxSettings,
        },
        {
            label: "Depth",
            value: depth,
            maxValue: 850,
            minValue: 100,
            rawValue: false,
            inputValue: useState(depth),
            updateFunc: updateBoxSettings,
        },
    ];

    const binSettingsSliders = [
        {
            label: "Radius",
            value: radius,
            maxValue: 150,
            minValue: 5,
            rawValue: false,
            inputValue: useState(radius),
            updateFunc: updateBinSettings,
        },
        {
            label: "Thickness",
            value: thickness,
            maxValue: 20,
            minValue: 2,
            rawValue: false,
            inputValue: useState(thickness),
            updateFunc: updateBinSettings,
        },
        {
            label: "Width Division",
            variableName: "divideWidth",
            value: divideWidth,
            maxValue: 0.9,
            minValue: 0.1,
            rawValue: true,
            step: 0.01,
            inputValue: useState(divideWidth),
            updateFunc: updateBinSettings,
        },
        {
            label: "Depth Division",
            variableName: "divideDepth",
            value: divideDepth,
            maxValue: 0.9,
            minValue: 0.1,
            rawValue: true,
            step: 0.01,
            inputValue: useState(divideDepth),
            updateFunc: updateBinSettings,
        },
        {
            label: "Outer Gap",
            variableName: "outerGap",
            value: outerGap,
            maxValue: 20,
            minValue: 0,
            step: 0.1,
            inputValue: useState(outerGap),
            updateFunc: updateBinSettings,
        },
        {
            label: "Inner Gap",
            variableName: "innerGap",
            value: innerGap,
            maxValue: 20,
            minValue: 0,
            step: 0.1,
            inputValue: useState(innerGap),
            updateFunc: updateBinSettings,
        },
        {
            label: "Iterations",
            value: iterations,
            maxValue: 3,
            minValue: 0,
            rawValue: true,
            step: 1,
            inputValue: useState(iterations),
            updateFunc: updateBinSettings,
        },
    ];

    const checkboxes = [
        {
            label: "Show measurements",
            variableName: "areMeasurementsEnabled",
            value: areMeasurementsEnabled,
            updateFunc: updatePageSettings,
        },
        {
            label: "Show index numbers",
            variableName: "areIndexNumbersEnabled",
            value: areIndexNumbersEnabled,
            updateFunc: updatePageSettings,
        },
        {
            label: "Export as 'Vase Mode' object",
            variableName: "isVaseMode",
            value: isVaseMode,
            updateFunc: updatePageSettings,
        },
    ];

    const sliderComponent = (sliderSettings: any) => {
        if (!sliderSettings.inputValue) return;

        const [inputValue, setInputVaue] = sliderSettings.inputValue;

        return (
            <Slider
                key={sliderSettings.label}
                label={sliderSettings.label}
                size={size}
                step={sliderSettings.step || 1}
                maxValue={sliderSettings.maxValue}
                minValue={sliderSettings.minValue}
                aria-label={sliderSettings.label}
                value={sliderSettings.value}
                className="max-w-md"
                classNames={{
                    filler: "bg-white",
                    track: "rounded bg-black cursor-ew-resize",
                    labelWrapper:
                        "relative top-5 h-0 px-2 z-50 mix-blend-difference",
                    value: "text-md",
                    label: "text-md pointer-events-none",
                }}
                hideThumb={true}
                onChange={(value: SliderValue) => {
                    setInputVaue(value);
                    sliderSettings.updateFunc({
                        [sliderSettings.variableName ||
                        sliderSettings.label.toLowerCase()]: value,
                    });
                }}
                getValue={(value: SliderValue) =>
                    sliderSettings.rawValue
                        ? value.toString()
                        : `${value as number}mm`
                }
                renderValue={({ children, ...props }) => (
                    <output {...props}>
                        <input
                            className="w-12 text-right text-md text-white font-medium bg-transparent outline-none transition-colors border-transparent"
                            type="text"
                            value={inputValue}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const v = e.target.value;
                                setInputVaue(v);
                            }}
                            onKeyDown={(
                                e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                                const isEnterKey = e.key === "Enter";
                                const isNumber = !isNaN(Number(inputValue));

                                if (isEnterKey && isNumber) {
                                    const finalValue = !inputValue
                                        ? sliderSettings.minValue
                                        : inputValue < sliderSettings.minValue
                                        ? sliderSettings.minValue
                                        : inputValue > sliderSettings.maxValue
                                        ? sliderSettings.maxValue
                                        : inputValue;
                                    setInputVaue(finalValue);
                                    sliderSettings.updateFunc({
                                        [sliderSettings.variableName ||
                                        sliderSettings.label.toLowerCase()]:
                                            Number(finalValue),
                                    });
                                }
                            }}
                        />
                        {!sliderSettings.rawValue && "mm"}
                    </output>
                )}
            />
        );
    };

    return (
        <div className="max-h-64 sm:h-full sm:max-h-full overflow-auto flex flex-col py-4 px-5 border-l-1 border-t-1 sm:border-t-0 border-neutral-800 antialiased bg-neutral-950 gap-2">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-wide">
                    Configuration
                </h1>
            </div>
            <Accordion
                selectionMode="multiple"
                defaultExpandedKeys={["1", "2"]}
                isCompact={true}
            >
                <AccordionItem
                    key="1"
                    title="Box Settings"
                    classNames={{ title: "!text-white font-bold" }}
                >
                    <div className="flex flex-col gap-2">
                        {boxSettingsSliders.map((slider) => {
                            return sliderComponent(slider);
                        })}
                    </div>
                </AccordionItem>
                <AccordionItem
                    key="2"
                    title="Bin Settings"
                    classNames={{ title: "!text-white font-bold" }}
                >
                    <div className="flex flex-col gap-2">
                        {binSettingsSliders.map((slider) => {
                            return sliderComponent(slider);
                        })}
                    </div>
                </AccordionItem>
                <AccordionItem
                    key="3"
                    title="Printer Settings"
                    classNames={{ title: "!text-white font-bold" }}
                >
                    <div className="w-full flex flex-col gap-2">
                        <span>Printer Bed Size (X, Y)</span>
                        <div className="flex gap-3 items-center">
                            <Input
                                type="number"
                                radius="sm"
                                endContent={
                                    <span className="font-bold text-black">
                                        mm
                                    </span>
                                }
                                classNames={{
                                    inputWrapper: "h-10",
                                    input: "font-bold",
                                }}
                                value={bedSizeX.toString()}
                                onValueChange={(value) =>
                                    updatePrinterSettings({ bedSizeX: +value })
                                }
                            />
                            <span>X</span>
                            <Input
                                type="number"
                                radius="sm"
                                endContent={
                                    <span className="font-bold text-black">
                                        mm
                                    </span>
                                }
                                classNames={{
                                    inputWrapper: "h-10",
                                    input: "font-bold",
                                }}
                                value={bedSizeY.toString()}
                                onValueChange={(value) =>
                                    updatePrinterSettings({ bedSizeY: +value })
                                }
                            />
                        </div>
                    </div>
                </AccordionItem>
                <AccordionItem
                    key="4"
                    title="Page Settings"
                    classNames={{ title: "!text-white font-bold" }}
                >
                    <div className="flex flex-col gap-2">
                        {checkboxes.map((checkbox, index) => {
                            return (
                                <Checkbox
                                    key={index}
                                    isSelected={checkbox.value}
                                    onValueChange={(isSelected: boolean) =>
                                        checkbox.updateFunc({
                                            [checkbox.variableName]: isSelected,
                                        })
                                    }
                                    classNames={{
                                        label: "text-white",
                                    }}
                                >
                                    {checkbox.label}
                                </Checkbox>
                            );
                        })}
                    </div>
                </AccordionItem>
            </Accordion>

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
