# Bins (Procedural Bin Generator)

Bins is a 3D printable procedural bin generator where the user can provide width, depth and height parameters for a set of drawers and get a procedurally generated set of bins.

I was originally inspired to create this project when I saw the ["dojo-recursive-bins"](https://github.com/node-dojo/dojo-recursive-bins/) implementation leveraging Blender's Geometry Nodes. You can learn more about that [here](https://nodedojo.gumroad.com/l/dojobin?layout=profile).

## Demo

Live demo available at [bins.akif.kr](https://bins.akif.kr).

## Usage

Currently there are 10 adjustable parameters that affect the generation of the bins. All values are in mm unless specified otherwise.

Red bins indicate bins that cannot be printed according to the X and Y dimensions of the print bed provided under "Printer Settings". Blue bins indicate bins that can be printed. This does not take into account the Z ability of your printer.

### Box Settings

Adjusting these values will affect the drawer only.

- Width - Width of the drawer.
- Height - Height of the drawer.
- Depth - Depth of the drawer.

<img src="https://github.com/ak-tr/bins/assets/62529128/909138bd-edcd-4806-9fdb-4496c72090b2" width="100%" />

### Bin Settings

Adjusting these values will affect the generated bins inside the drawer.

- Radius - Corner radius of each box.
- Thickness - Wall thickness of each box. Bottom layer thickness is fixed to 5mm.
- Width Division - Value between 0 and 1 used to calculate how to allocate space to the boxes in the X dimension.
- Depth Division - Value between 0 and 1 used to calculate how to allocate space to the boxes in the Z dimension.
- Outer Gap - Gap between all outer edges of the bins that meet with the inner drawer walls.
- Inner Gap - Gap between walls on all bins which meet another bin.
- Iterations - How many times to procedurally generate bins using the initial 4 bins.

<img src="https://github.com/ak-tr/bins/assets/62529128/7c86ce82-af30-4868-aa2b-fc3d45f6c6ab" width="100%" />

### Page Settings

These settings are quite self explanatory. They are there for disabling certain elements on the page.
There is also a checkbox that you can enable which will export the bins as non hollow objects. This allows you to print them in vase mode if you would like that option. Refer to "[Printing bins in vase mode](#printing-bins-in-vase-mode)".

## Printing

After clicking "Export Bins", a `.zip` file will be downloaded onto your device. This zip file will contain each bin that you have generated.

![](https://github.com/ak-tr/bins/assets/62529128/9258d214-ece6-42a7-a191-9373f3cfb153)

Bins are named in the following format. `Bin_[index]_[timestamp]`.
The index value is provided so you can visually see the bin and its corresponding location as this will map to the numbers as seen on the generator.

### Printing bins in vase mode (Recommended option)

If you would like to print your bins in vase mode, simply check the "Export as 'Vase Mode' object" option under page settings. This will prepare the .obj files differently so you can print them in vase mode. I recommend this as it reduces filament usage drastically. Remember though, this will completely disregard the thickness parameters specified in the bin settings as the thickness of the walls will be determined by your wall thickness settings in your slicer.

![](https://github.com/ak-tr/bins/assets/62529128/9e3f526a-ff43-46c2-982e-ce03c48a3a00)

Once you have these files, drag them into your slicer and enable vase mode. This will differ from slicer to slicer.

> [!NOTE]
> If you are printing in vase mode with a standard 0.4mm nozzle (or any nozzle smaller than 0.8mm at standard wall thickness) or smaller, you are very likely going to experience major warping as the thin walled layers cool and contract quickly on top of each other. You are often able to comfortably print walls that are up to two times thicker than your nozzle diameter which for a 0.4mm nozzle can help drastically with the warping. I have found with my testing it is very usable with 0.8mm walls and using vase mode can reduce filament usage drastically.

![](https://github.com/ak-tr/bins/assets/62529128/8b252647-d9f0-44e2-bf55-45f110ab84df)

### Printing bins in normal mode

This is as simple as dragging the .obj file into your slicer and printing.

![](https://github.com/ak-tr/bins/assets/62529128/d939e26e-3811-4f79-851e-55a6140e58bf)

Your slicer might show or warn you about open edges, these should be automatically fixed by your slicer and will not affect the print.

## Current Bugs/Known Issues

- Generated .obj files have a large amount of open edges as warned by PrusaSlicer. Tested with Cura and PrusaSlicer and this doesn't affect its printability but can be quite annoying.
- Cannot generate .stl files at all, they are very buggy using `STLExporter`. Currently not implemented, may look into it in the future. Currently .obj files work well enough to make this project work.

## Roadmap

- Add different bin generation methods i.e. grid.
- Add printer bed with layer visualisation like the implementation by [Node Dojo](https://github.com/node-dojo/dojo-recursive-bins/).
- Add a different way to visualise the generated bins, maybe like a carousel(?), top down view or something of that sort.

## Stack

- [Vite](https://vitejs.dev/) with [`react-ts`](https://vite.new/react-ts)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next UI](https://nextui.org/docs/guide/introduction)
- [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber/tree/master)
- [`@react-three/drei`](https://github.com/pmndrs/drei)
- [`@react-three/csg`](https://github.com/pmndrs/react-three-csg)
- [`three-bvh-csg`](https://github.com/gkjohnson/three-bvh-csg)

## Notes

First time using React, feel free to criticise my code or provide advice on how to improve things.

Created by [akif.kr](https://akif.kr)
