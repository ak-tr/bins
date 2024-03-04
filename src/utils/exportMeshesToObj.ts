import JSZip from "jszip";
import { saveAs } from "file-saver";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { Mesh } from "three";
import { MutableRefObject } from "react";

export const exportMeshesToObj = async (
    binMeshArray: MutableRefObject<Mesh[]>
) => {
    const timestamp = new Date().getTime();
    const zip = new JSZip();

    binMeshArray.current.forEach((binMesh, index) => {
        const exporter = new OBJExporter();

        const newMesh = new Mesh(binMesh.geometry);
        newMesh.rotateX(Math.PI / 2);
        newMesh.updateMatrixWorld();

        const file = exporter.parse(newMesh);

        zip.file(
            `Bin_${index + 1}_${timestamp}.obj`,
            new Blob([file], { type: "text/plain" })
        );
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `bins_${timestamp}.zip`);
};
