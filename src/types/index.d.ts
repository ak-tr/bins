type Bin = {
    width: number;
    depth: number;
    height: number;
    x: number;
    y: number;
    z: number;
    radius: number;
    thickness: number;
};

type DrawerSettings = {
    width: number;
    height: number;
    depth: number;
};

type GenerationType = "Recursive" | "Grid";

type Settings = DrawerSettings & {
    radius: number;
    thickness: number;
    divideWidth: number;
    divideDepth: number;
    outerGap: number;
    innerGap: number;
    bedSizeX: number;
    bedSizeY: number;
    type: GenerationType;
    iterations: number;
    rows: number;
    cols: number;
    areMeasurementsEnabled: boolean;
    areIndexNumbersEnabled: boolean;
    isVaseMode: boolean;
};
