import { generateBinsRecursive } from "./generateBinsRecursive";
import { generateBinsGrid } from "./generateBinsGrid";

export const generateBins = (settings: Settings) => {
    const props = {
        ...settings,
        width: settings.width - settings.outerGap * 2,
        depth: settings.depth - settings.outerGap * 2,
    };

    return settings.type === "Recursive"
        ? generateBinsRecursive(props)
        : generateBinsGrid(props);
};
