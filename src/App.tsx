import "./App.css";
import ThreeRoot from "./components/ThreeRoot";
import ConfigPanel from "./components/ConfigPanel";
import { useState } from "react";

function App() {
    const defaults = {
        width: 32,
        height: 13,
        depth: 56,
        radius: 0.3
    };

    const [configValues, setConfigValues] = useState({
        ...defaults
    });

    const onConfigValueChange = (property: string, value: number) => {
        setConfigValues((prev) => {
            return { ...prev, [property]: value };
        });
    };

    const setDefault = () => {
        setConfigValues(() => ({...defaults}))
    }

    return (
        <div className="bg-neutral-900 text-white grid grid-cols-[minmax(800px,_1fr)_400px] h-lvh">
            {/* Canvas for Three.js */}
            <ThreeRoot {...configValues} />
            {/* Settings sliders */}
            <ConfigPanel {...configValues} onConfigValueChange={onConfigValueChange} setDefault={setDefault} />
        </div>
    );
}

export default App;
