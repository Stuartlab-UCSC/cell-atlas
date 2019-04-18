// Handle color ranges.

import colorMix from 'color/colorMix'
import { background } from 'app/themeData'

const minColor = '#0000ff'
const maxColor = '#ff0000'

const normalizeColorVal = (valIn, min, max) => {
    // The algorithm assumes a range of -1 to 1 and interpolates between two
    // colors. We want to use three colors with positives between two colors
    // and negatives between two other colors. So normalize the value given as
    // any real number to be between -1 and 1.
    // We assume if min exists, it is the negative of max.
    
    // Due to rounding, the value may be just outside the min or max.
    let val = valIn
    if (val < min) {
        val = min
    } else if (val > max) {
        val = max
    }

    let norm
    if (min < 0) {
        if (val < 0) {
            norm = (max - val) / (max - min) * 4 - 3
        } else {
            norm = (val - min) / (max - min) * 4 - 3
            // normalize 0 to 1: (val - min) / (max - min)
            // normalize -1 to 1: (4 * norm1) - 3
        }
    } else {
        // Normalize when there are no negative values.
        norm = (val - min) / (max - min) * 2 - 1
    }
    return norm
}

const getRangeColor = (val, min, max) => {
    const zeroColor = background
    if (val < 0) {
        return colorMix(normalizeColorVal(val, min, max),
            zeroColor, minColor)
    } else {
        return colorMix(normalizeColorVal(val, min, max),
            zeroColor, maxColor)
    }
}

export { getRangeColor }
