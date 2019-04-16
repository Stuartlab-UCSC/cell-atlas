
// The name to label, tooltip translations.

const maxDiameter = 16 // pixel width
const minDiameter = 5  // pixel width

const areaFromRadius = (radius) => {
    // Return area given a radius.
    return Math.PI * radius**2
}

const minArea = areaFromRadius(minDiameter / 2)
const maxArea = areaFromRadius(maxDiameter / 2)

const radiusFromArea = (area) => {
    // Return the radius given an area.
    return Math.sqrt(area / Math.PI)
}

const sizeToRadius = (size, min, max) => {
    return radiusFromArea(((maxArea - minArea) * size) + minArea)
}

export { maxDiameter, sizeToRadius }
