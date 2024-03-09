type Props = {
    width: number;
    depth: number;
    height: number;
    divideWidth: number;
    divideDepth: number;
    rows?: number;
    cols?: number;
    radius: number;
    thickness: number;
    innerGap: number;
};

export const generateBinsGrid = (props: Props): Bin[] => {
    const {
        width,
        depth,
        height,
        rows = 2, // Default number of rows
        cols = 2, // Default number of columns
        radius,
        thickness,
        innerGap,
    } = props;

    const bins: Bin[] = [];

    // Calculate the total inner gap applied on each row and column
    const totalRowInnerGap = (rows - 1) * innerGap;
    const totalColInnerGap = (cols - 1) * innerGap;

    // Calculate the effective width and depth of each bin after considering inner gaps
    const effectiveColWidth = (width - totalColInnerGap) / cols;
    const effectiveRowHeight = (depth - totalRowInnerGap) / rows;

    // Iterate over rows and columns to create initial bins
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Calculate adjusted x and z positions based on inner gap
            const xPos = col * (effectiveColWidth + innerGap);
            const zPos = row * (effectiveRowHeight + innerGap);

            const bin: Bin = {
                width: effectiveColWidth,
                depth: effectiveRowHeight,
                height,
                x: xPos,
                y: 0,
                z: zPos,
                radius,
                thickness,
                shouldRender: true,
            };

            bins.push(bin);
        }
    }

    return bins;
};
