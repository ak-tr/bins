import {
    Canvas,
} from "@react-three/fiber";
import {
    PerspectiveCamera,
    PresentationControls,
} from "@react-three/drei";

import Drawer from "./objects/Drawer";
import Measurements from "./objects/Measurements";
import Bin from "./objects/Bin";




const ThreeRoot = (props: ConfigValuesProps) => {
    const objects = [...Drawer(props), ...Measurements(props), Bin({
        width: 10,
        height: 10,
        depth: 40,
        x: 0,
        y: 0,
        z: (props.depth / 2) - 40 / 2,
        radius: props.radius
    })];

    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, -2, 100]} />
            <ambientLight intensity={0.5} />
            <spotLight
                position={[0, 20, 100]}
                angle={0.5}
                penumbra={0.3}
                decay={1.4}
                intensity={1000}
            />
            <rectAreaLight intensity={15} position={[5, 0, 40]} color="white" />
            <PresentationControls
                enabled={true} // the controls can be disabled by setting this to false
                global={false} // Spin globally or by dragging the model
                cursor={true} // Whether to toggle cursor style on drag
                snap={false} // Snap-back to center (can also be a spring config)
                speed={0.5} // Speed factor
                zoom={0.75} // Zoom factor when half the polar-max is reached
                rotation={[0.7, 0.3, 0]} // Default rotation
                polar={[-0.4, Math.PI / 2]} // Vertical limits
                azimuth={[-Infinity, Infinity]} // Horizontal limits
                config={{ mass: 0.5, tension: 120, friction: 10 }} // Spring config
            >
                {...objects}
            </PresentationControls>
        </Canvas>
    );
};

export default ThreeRoot;
