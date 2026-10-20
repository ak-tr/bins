// Gap left between bins on the same bed, in mm
const GAP = 5;

type Rect = { x: number; y: number; width: number; depth: number };
type Placement = Rect & { index: number; radius: number };
type Bed = { free: Rect[]; placements: Placement[] };

// A bin fits if it is smaller than the bed either way round
export const fitsOnBed = (width: number, depth: number, bedX: number, bedY: number) =>
    (width < bedX && depth < bedY) || (depth < bedX && width < bedY);

const overlaps = (a: Rect, b: Rect) =>
    a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.depth && b.y < a.y + a.depth;

const contains = (a: Rect, b: Rect) =>
    b.x >= a.x && b.y >= a.y && b.x + b.width <= a.x + a.width && b.y + b.depth <= a.y + a.depth;

// Free spot leaving the least space on its shorter side, trying both rotations
const findSpot = (free: Rect[], width: number, depth: number) => {
    let best: (Rect & { score: number }) | undefined;
    for (const f of free)
        for (const [w, d] of [[width, depth], [depth, width]])
            if (w <= f.width && d <= f.depth) {
                const score = Math.min(f.width - w, f.depth - d);
                if (!best || score < best.score) best = { x: f.x, y: f.y, width: w, depth: d, score };
            }
    return best;
};

// Cut the used rect out of every free rect it overlaps, then drop free rects inside others
const split = (free: Rect[], used: Rect) => {
    const next = free.flatMap((f) =>
        !overlaps(f, used)
            ? [f]
            : [
                  { ...f, width: used.x - f.x },
                  { ...f, x: used.x + used.width, width: f.x + f.width - used.x - used.width },
                  { ...f, depth: used.y - f.y },
                  { ...f, y: used.y + used.depth, depth: f.y + f.depth - used.y - used.depth },
              ].filter((r) => r.width > 0 && r.depth > 0)
    );
    return next.filter(
        (r, i) => !next.some((o, j) => j !== i && contains(o, r) && (!contains(r, o) || j < i))
    );
};

// ponytail: first fit MaxRects, largest bins first. Good, not optimal (exact packing is NP-hard)
export const packBins = (bins: Bin[], bedX: number, bedY: number) => {
    const beds: Bed[] = [];
    const unprintable: number[] = [];

    const order = bins
        .map((bin, index) => ({ bin, index }))
        .sort((a, b) => b.bin.width * b.bin.depth - a.bin.width * a.bin.depth);

    for (const { bin, index } of order) {
        if (!fitsOnBed(bin.width, bin.depth, bedX, bedY)) {
            unprintable.push(index);
            continue;
        }

        // Pad each bin by the gap, and the bed too, so the gap only sits between bins
        const width = bin.width + GAP;
        const depth = bin.depth + GAP;

        let bed = beds.find((b) => findSpot(b.free, width, depth));
        if (!bed) {
            bed = { free: [{ x: 0, y: 0, width: bedX + GAP, depth: bedY + GAP }], placements: [] };
            beds.push(bed);
        }

        const spot = findSpot(bed.free, width, depth)!;
        bed.free = split(bed.free, spot);
        bed.placements.push({
            index,
            x: spot.x,
            y: spot.y,
            width: spot.width - GAP,
            depth: spot.depth - GAP,
            radius: bin.radius,
        });
    }

    return {
        beds: beds.map((bed) => bed.placements),
        unprintable: unprintable.sort((a, b) => a - b),
    };
};
