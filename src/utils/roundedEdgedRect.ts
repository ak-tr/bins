import { Shape, ExtrudeGeometry } from "three";

export const RoundedEdgedRectGeometry = (
    width: number,
    depth: number,
    height: number,
    radius: number
) => {
    const shape = new Shape();

    // Define the shape of the rounded edged rectangle
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cornerRadius = Math.min(radius, Math.min(halfWidth, halfHeight));

    shape.moveTo(-halfWidth + cornerRadius, -halfHeight);
    shape.lineTo(halfWidth - cornerRadius, -halfHeight);
    shape.quadraticCurveTo(
        halfWidth,
        -halfHeight,
        halfWidth,
        -halfHeight + cornerRadius
    );
    shape.lineTo(halfWidth, halfHeight - cornerRadius);
    shape.quadraticCurveTo(
        halfWidth,
        halfHeight,
        halfWidth - cornerRadius,
        halfHeight
    );
    shape.lineTo(-halfWidth + cornerRadius, halfHeight);
    shape.quadraticCurveTo(
        -halfWidth,
        halfHeight,
        -halfWidth,
        halfHeight - cornerRadius
    );
    shape.lineTo(-halfWidth, -halfHeight + cornerRadius);
    shape.quadraticCurveTo(
        -halfWidth,
        -halfHeight,
        -halfWidth + cornerRadius,
        -halfHeight
    );

    // Return ExtrudeGeometry with specified depth
    return new ExtrudeGeometry(shape, { depth })
        .rotateX(Math.PI / 2)
        .translate(0, depth / 2, 0);
};
