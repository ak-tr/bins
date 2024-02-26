
# Bins (Procedural Bin Generator)

Bins is a procedural bin generator where the user can provide width, depth and height parameters for a set of drawers and get a procedurally generated set of bins, guaranteed to fit in your drawer.

I was originally inspired to create this project when I saw the ["dojo-recursive-bins"](https://github.com/node-dojo/dojo-recursive-bins/) implementation leveraging Blender's Geometry Nodes. You can learn more about that [here](https://nodedojo.gumroad.com/l/dojobin?layout=profile).

This project does not generate the bins in the same way as the project specified above. This was the easiest way I could get an implementation of this - I will look into improving this in the future. However, I do think the way that it generates currently could be more useable in the real world.
## Demo

![](https://github.com/ak-tr/bins/assets/62529128/a9e736de-aa7c-4acb-81e7-b61512493599)

Feel free to play around with it at [bins.akif.kr](https://bins.akif.kr).
## Usage

Currently there are 10 adjustable parameters that affect the generation of the bins. All values are in mm unles specified otherwise.

- Width - Width of the drawer.
- Height - Height of the drawer.
- Depth - Depth of the drawer.
- Radius - Corner radius of each box.
- Thickness - Wall thickness of each box, this includes the thickness of the bottom of the box though this will most likely change in the future.
- Width Division - Value between 0 and 1 used to calculate how to allocate space to the boxes in the X dimension.
- Depth Division - Value between 0 and 1 used to calculate how to allocate space to the boxes in the Z dimension.
- Outer Gap - Gap between all outer edges of the bins that meet with the inner drawer walls.
- Inner Gap - Gap between walls on all bins which meet another bin.
- Iterations - How many times to procedurally generate bins using the initial 4 bins.
## Created With

- React (Typescript)
    - This is my first time using React so feel free to critcise my code. I come from a Vue heavy background so a lot of this feels quite alien to me, but it was interesting to learn.
- React Three Fiber with...
    - React Three Drei
    - React Three CSG
    - Three BVH CSG

