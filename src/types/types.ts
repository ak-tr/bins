type ConfigurationValues = {
    width: number;
    height: number;
    depth: number;
    radius: number;
    thickness: number;
    divideWidth: number;
    divideDepth: number;
    outerGap: number;
    innerGap: number;
    iterations: number;
    bedSizeX: number;
    bedSizeY: number;
};

type DrawerSettings = Pick<ConfigurationValues, "width" | "height" | "depth">;
type DrawerContext = DrawerSettings & {
    updateBoxSettings: (newValues: Partial<DrawerSettings>) => void;
};

type PrinterSettings = Pick<ConfigurationValues, "bedSizeX" | "bedSizeY">;
type PrinterContext = PrinterSettings & {
    updatePrinterSettings: (newValues: Partial<PrinterSettings>) => void;
};

type BinSettings = Omit<
    ConfigurationValues,
    keyof DrawerSettings | keyof PrinterSettings
>;
type BinContext = BinSettings & {
    updateBinSettings: (newValues: Partial<BinSettings>) => void;
};

type PageSettings = {
    areMeasurementsEnabled: boolean;
    areIndexNumbersEnabled: boolean;
    isVaseMode: boolean;
};
type PageContext = PageSettings & {
    updatePageSettings: (newValues: Partial<PageSettings>) => void;
};

type ContextProviderProps = { children?: import("react").ReactNode };

type ExtraProps = {
    isExporting: boolean;
};

type BinValues = Omit<
    ConfigurationValues,
    "divideWidth" | "divideDepth" | "outerGap" | "innerGap" | "iterations"
>;
