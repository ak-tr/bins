import "./App.css";

import { RefObject, useRef } from "react";
import { Mesh } from "three";

import { ThreeApp } from "./components/ThreeApp/ThreeApp";
import { ConfigPanel } from "./components/ConfigPanel/ConfigPanel";
import { PrintBeds } from "./components/PrintBeds/PrintBeds";
import { SettingsProvider } from "./context/SettingsContext";

const link =
    "text-white underline decoration-neutral-600 underline-offset-[3px] hover:decoration-white focus-visible:decoration-white";

function App() {
    const binRefs = useRef<RefObject<Mesh>[]>([]);

    return (
        <div className="flex flex-col h-lvh font-mono text-xs uppercase tracking-wide text-neutral-500">
            <header className="flex items-center justify-between gap-4 px-4 sm:px-6 h-12 shrink-0 border-b border-neutral-800">
                <h1 className="flex items-center gap-3 text-white">
                    <img src="/icon.svg" alt="" className="size-5" />
                    Bins
                </h1>
                <span>Procedural bin generator</span>
            </header>
            <main className="grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-[minmax(0,_1fr)_400px] flex-1 min-h-0 normal-case tracking-normal text-base text-neutral-200 font-sans">
                <SettingsProvider>
                    <div className="flex flex-col xl:flex-row min-h-0 min-w-0">
                        <PrintBeds />
                        <div className="flex-1 min-h-0 min-w-0">
                            <ThreeApp binRefs={binRefs} />
                        </div>
                    </div>
                    <ConfigPanel binRefs={binRefs} />
                </SettingsProvider>
            </main>
            <footer className="flex justify-between gap-4 px-4 sm:px-6 py-3 shrink-0 border-t border-neutral-800">
                <span>
                    Made by{" "}
                    <a className={link} href="https://git.akif.kr">
                        Akif
                    </a>
                </span>
                <span>
                    Inspired by{" "}
                    <a
                        className={link}
                        href="https://nodedojo.gumroad.com/l/dojobin?layout=profile"
                    >
                        Node Dojo
                    </a>
                </span>
            </footer>
        </div>
    );
}

export default App;
