type Bin = {
    width: number;
    depth: number;
    height: number;
    x: number;
    y: number;
    z: number;
    radius: number;
    thickness: number;
    shouldRender: boolean;
};

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
    keyof DrawerSettings | keyof PrinterSettings | keyof GenerationSettings
>;
type BinContext = BinSettings & {
    updateBinSettings: (newValues: Partial<BinSettings>) => void;
};

type BaseBinValues = DrawerSettings &
    Omit<BinSettings, "outerGap"> &
    Partial<Omit<GenerationSettings, "type">>;

type PageSettings = {
    areMeasurementsEnabled: boolean;
    areIndexNumbersEnabled: boolean;
    isVaseMode: boolean;
};
type PageContext = PageSettings & {
    updatePageSettings: (newValues: Partial<PageSettings>) => void;
};

type GenerationType = "Recursive" | "Grid";
type GenerationSettings = {
    type: GenerationType;
    iterations: number;
    rows: number;
    cols: number;
};
type GenerationContext = GenerationSettings & {
    updateGenerationSettings: (newValues: Partial<GenerationSettings>) => void;
};

type ContextProviderProps = { children?: import("react").ReactNode };

type ExtraProps = {
    isExporting: boolean;
};

type BinValues = Omit<
    ConfigurationValues,
    "divideWidth" | "divideDepth" | "outerGap" | "innerGap" | "iterations"
>;
