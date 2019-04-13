
// The name to label, tooltip translations.

import colorMix from 'cellType/colorMix'
import { background } from 'app/themeData'
import { get as rxGet } from 'state/rx'

const maxBubbleDiameter = 16 // pixel width
const minBubbleDiameter = 5  // pixel width
const negMagColor = '#0000ff'
const posMagColor = '#ff0000'

const sizeRef = {
    similarity: {
        label: 'similarity',
        tooltip: 'weighted correlation of pathway activity scores',
    },
}

const normalizeColorVal = (val, colorNegMag, colorPosMag) => {
    // The algorithm assumes a range of -1 to 1 and interpolates between two
    // colors. We want to use three colors with positives between two colors
    // and negatives between two other colors. So normalize the value given as
    // any real number to be between -1 and 1.
    // We assume if colorNegMag exists, it is the negative of colorPosMag.
    let norm
    if (colorNegMag < 0) {
        if (val < 0) {
            norm = (colorPosMag - val) / (colorPosMag - colorNegMag) * 4 - 3
        } else {
            norm = (val - colorNegMag) / (colorPosMag - colorNegMag) * 4 - 3
            // normalize 0 to 1: (val - colorNegMag) / (colorPosMag - colorNegMag)
            // normalize -1 to 1: (4 * norm1) - 3
        }
    } else {
        // Normalize when there are no negative values.
        norm = (val - colorNegMag) / (colorPosMag - colorNegMag) * 2 - 1
    }
    return norm
}

const getColor = (val) => {
    const zeroColor = background
    const colorNegMag = rxGet('cellType.colorNegMag')
    const colorPosMag = rxGet('cellType.colorPosMag')

    if (val < 0) {
        return colorMix(normalizeColorVal(val, colorNegMag, colorPosMag),
            zeroColor, negMagColor)
    } else {
        return colorMix(normalizeColorVal(val, colorNegMag, colorPosMag),
                zeroColor, posMagColor)
    }
}

const stringToPrecision = (x, p) => {
    // Given a string number, return a string number
    // with the precision, p, which defaults to 3.
    p = p || 3
    return parseFloat(x).toPrecision(p)
}

const area = (radius) => {
    // Return area given a radius.
    return Math.PI * radius**2
}

const radius = (area) => {
    // Return the radius given an area.
    return Math.sqrt(area / Math.PI)
}

const sizeToRadius = (size) => {
    const minArea = area(minBubbleDiameter / 2)
    return radius(
        (area(maxBubbleDiameter / 2) - minArea) * size
            / rxGet('cellType.sizeMag') + minArea)
}

export { getColor, maxBubbleDiameter, minBubbleDiameter, sizeRef,
    sizeToRadius, stringToPrecision }
