// Run with: pnpm check
import { packBins } from "./packBins.ts";

const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(message);
};
const bins = (...sizes: [number, number][]) =>
    sizes.map(([width, depth]) => ({ width, depth, height: 50, x: 0, y: 0, z: 0, radius: 10, thickness: 2 }));

// 4 small bins share 1 bed
assert(packBins(bins([100, 100], [100, 100], [100, 100], [100, 100]), 220, 220).beds.length === 1, "4 small bins on 1 bed");
// 4 long bins: 2 per bed once rotated
assert(packBins(bins([100, 210], [100, 210], [100, 210], [100, 210]), 220, 220).beds.length === 2, "4 long bins on 2 beds");
// Too big either way round
const tooBig = packBins(bins([100, 100], [300, 50]), 220, 220);
assert(tooBig.unprintable.join() === "1" && tooBig.beds.length === 1, "300mm bin is unprintable");

// Random bins never overlap or leave the bed
for (let run = 0; run < 200; run++) {
    const random = bins(...Array.from({ length: 16 }, () => [10 + Math.random() * 200, 10 + Math.random() * 200] as [number, number]));
    const { beds, unprintable } = packBins(random, 220, 180);
    const placed = beds.flat();
    assert(placed.length + unprintable.length === random.length, "every bin placed once");
    for (const bed of beds)
        for (const a of bed) {
            assert(a.x >= 0 && a.y >= 0 && a.x + a.width <= 220 && a.y + a.depth <= 180, "inside bed");
            for (const b of bed)
                if (a !== b)
                    assert(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.depth <= b.y || b.y + b.depth <= a.y, "no overlap");
        }
}

console.log("packBins ok");
