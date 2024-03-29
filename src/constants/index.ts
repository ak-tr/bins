export const DEFAULT_VALUES: ConfigurationValues = {
    width: 320,
    height: 130,
    depth: 560,
    radius: 25,
    thickness: 5,
    divideWidth: 0.55,
    divideDepth: 0.45,
    outerGap: 2.5,
    innerGap: 2.5,
    bedSizeX: 220,
    bedSizeY: 220,
};

export const DEFAULT_GENERATION_VALUES: GenerationSettings = {
    type: "Recursive",
    iterations: 1,
    rows: 2,
    cols: 2,
}

export const GENERATION_TYPES = ["Recursive", "Grid"]

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
    areMeasurementsEnabled: true,
    areIndexNumbersEnabled: true,
    isVaseMode: false,
};
