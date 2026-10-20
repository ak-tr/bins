import JSZip from "jszip";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { Mesh } from "three";

export const exportMeshesToObj = async (binMeshes: Mesh[]) => {
    const timestamp = new Date().getTime();
    const zip = new JSZip();

    binMeshes.forEach((binMesh, index) => {
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
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `bins_${timestamp}.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href));
};
