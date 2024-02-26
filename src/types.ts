type ConfigValuesProps = {
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

type ExtraProps = {
    isExporting: boolean;
}

type BinValuesProps = Omit<
    ConfigValuesProps,
    | "divideWidth"
    | "divideDepth"
    | "outerGap"
    | "innerGap"
    | "iterations"
>;
