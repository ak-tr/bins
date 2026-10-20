type Props = {
    width: number;
    depth: number;
    height: number;
    divideWidth: number;
    divideDepth: number;
    iterations: number;
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

    if (iterations === 0) return [];

    const halfInnerGap = innerGap / 2;
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
        },
    ];

    if (iterations === 1) return initialBins;

    // Split each initial bin into 4 more, flipping the divisions for every second bin
    return initialBins.flatMap((initialBin, index) => {
        const flip = index % 2 === 0;
        const subBins = generateBinsRecursive({
            ...props,
            width: initialBin.width,
            depth: initialBin.depth,
            divideWidth: flip ? divideDepth : divideWidth,
            divideDepth: flip ? divideWidth : divideDepth,
            iterations: iterations - 1,
        });
        return subBins.map((bin) => ({
            ...bin,
            x: initialBin.x + bin.x,
            z: initialBin.z + bin.z,
        }));
    });
};
