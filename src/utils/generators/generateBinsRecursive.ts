type Props = {
    width: number;
    depth: number;
    height: number;
    divideWidth: number;
    divideDepth: number;
    iterations?: number;
    radius: number;
    thickness: number;
    innerGap: number;
};

export const generateBinsRecursive = (props: Props): Bin[] => {
    const {
        width,
        depth,
        height,
        divideWidth,
        divideDepth,
        iterations,
        radius,
        thickness,
        innerGap,
    } = props;

    const bins: Bin[] = [];
    const halfInnerGap = innerGap / 2;
    let actualIterations = iterations ?? 1;

    // If no iterations, return empty array
    if (actualIterations === 0) return bins;

    const initialBins: Bin[] = [
        // Top left
        {
            width: width * (1 - divideWidth) - halfInnerGap,
            depth: depth * (1 - divideDepth) - halfInnerGap,
            height,
            x: 0,
            y: 0,
            z: 0,
            radius,
            thickness,
            shouldRender: actualIterations === 1,
        },
        // Top right
        {
            width: width * divideWidth - halfInnerGap,
            depth: depth * (1 - divideDepth) - halfInnerGap,
            height,
            x: width * (1 - divideWidth) + halfInnerGap,
            y: 0,
            z: 0,
            radius,
            thickness,
            shouldRender: actualIterations === 1,
        },
        // Bottom left
        {
            width: width * divideWidth - halfInnerGap,
            depth: depth * divideDepth - halfInnerGap,
            height,
            x: 0,
            y: 0,
            z: depth * (1 - divideDepth) + halfInnerGap,
            radius,
            thickness,
            shouldRender: actualIterations === 1,
        },
        // Bottom right
        {
            width: width * (1 - divideWidth) - halfInnerGap,
            depth: depth * divideDepth - halfInnerGap,
            height,
            x: width * divideWidth + halfInnerGap,
            y: 0,
            z: depth * (1 - divideDepth) + halfInnerGap,
            radius,
            thickness,
            shouldRender: actualIterations === 1,
        },
    ];

    // Push initial bins
    bins.push(...initialBins);

    if (actualIterations > 1) {
        // For each initial bin, generate 4 more bins recursively
        initialBins.forEach((initialBin, index) => {
            // Flip divideWidth and divideDepth for every second bin
            const flippedDivideWidth =
                index % 2 === 0 ? divideDepth : divideWidth;
            const flippedDivideDepth =
                index % 2 === 0 ? divideWidth : divideDepth;

            const values: Props = {
                width: initialBin.width,
                depth: initialBin.depth,
                height: initialBin.height,
                divideWidth: flippedDivideWidth,
                divideDepth: flippedDivideDepth,
                iterations: actualIterations - 1,
                radius,
                thickness,
                innerGap
            }

            const subBins = generateBinsRecursive(values);
            bins.push(
                ...subBins.map((bin) => ({
                    ...bin,
                    x: initialBin.x + bin.x,
                    y: initialBin.y + bin.y,
                    z: initialBin.z + bin.z,
                }))
            );
        });
    }

    return bins.filter((bin) => bin.shouldRender);
};
