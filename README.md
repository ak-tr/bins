# Bins (Procedural Bin Generator)

Bins is a 3D printable procedural bin generator where the user can provide width, depth and height parameters for a set of drawers and get a procedurally generated set of bins.

I was originally inspired to create this project when I saw the ["dojo-recursive-bins"](https://github.com/node-dojo/dojo-recursive-bins/) implementation leveraging Blender's Geometry Nodes. You can learn more about that [here](https://nodedojo.gumroad.com/l/dojobin?layout=profile).

## Demo
![Recording showing demo of bins project](https://github.com/ak-tr/bins/assets/62529128/a2c87ad5-b81f-458e-8c2e-73be30e90733)

Feel free to play around with it at [bins.akif.kr](https://bins.akif.kr).

## Usage

Currently there are 10 adjustable parameters that affect the generation of the bins. All values are in mm unles specified otherwise.

-   Width - Width of the drawer.
-   Height - Height of the drawer.
-   Depth - Depth of the drawer.
-   Radius - Corner radius of each box.
-   Thickness - Wall thickness of each box. Bottom layer thickness is fixed to 5mm.
-   Width Division - Value between 0 and 1 used to calculate how to allocate space to the boxes in the X dimension.
-   Depth Division - Value between 0 and 1 used to calculate how to allocate space to the boxes in the Z dimension.
-   Outer Gap - Gap between all outer edges of the bins that meet with the inner drawer walls.
-   Inner Gap - Gap between walls on all bins which meet another bin.
-   Iterations - How many times to procedurally generate bins using the initial 4 bins.

## Current Bugs/Known Issues

-   Generated .obj files have a large amount of open edges as warned by PrusaSlicer. Tested with Cura and PrusaSlicer and this doesn't affect its printability but can be quite annoying.
-   Cannot generate .stl files at all, they are very buggy using `STLExporter`. Currently not implemented, may look into it in the future. Currently .obj files work well enough to make this project work.

## Roadmap

-   Add printer bed with layer visualisation like the implementation by [Node Dojo](https://github.com/node-dojo/dojo-recursive-bins/)
-   Add a different way to visualise the generated bins, maybe like a carousel(?), top down view or something of that sort.

## Stack

-   [Vite](https://vitejs.dev/) with [`react-ts`](https://vite.new/react-ts)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber/tree/master)
-   [`@react-three/drei`](https://github.com/pmndrs/drei)
-   [`@react-three/csg`](https://github.com/pmndrs/react-three-csg)
-   [`three-bvh-csg`](https://github.com/gkjohnson/three-bvh-csg)

## Notes

First time using React, feel free to criticise my code or provide advice on how to improve things.

Created by [akif.kr](https://akif.kr)
