
// Handle category colors.

import ColorMap from 'lib/jPalette'

// The list of attributes we are handling.
const coloredAttrs = ['species', 'organ', 'study']
// The store for category to color mapping.
let colorCat = {}
// This holds unique category values while being gathered.
let cats = {}

const toHexString = (val) => {
    let hex = val.toString(16)
    return (hex.length < 2) ? '0' + hex : hex
}

const assignCatColors = () => {
    // Assign colors to each category.
    let singleValues = {}
    coloredAttrs.forEach(at => {
        if (cats[at].length < 2) {
            // Columns with all the same value are returned to the caller.
            singleValues[at] = cats[at][0]
        }
        // Get the colors as hexadecimal strings.
        let rgbs = ColorMap.get('hexmap')(cats[at].length + 1)
        let colors = rgbs.map.map(val => {
            // Ignore alpha, taking the default of one.
            return '#'
                + toHexString(val.r)
                + toHexString(val.g)
                + toHexString(val.b)
            }
        )
        // Remove the repeating red at the end.
        colors.splice(cats[at].length, 1);
        // Create the operating colormap.
        cats[at].forEach((cat, i) => {
            colorCat[at][cat] = colors[i]
        })
    })
    return singleValues
}

const gatherUniqueCats = (group) => {
    // Gather the unique categories within each attribute.
    coloredAttrs.forEach(at => {
        if (!cats[at].includes(group[at])) {
            cats[at].push(group[at])
        }
    })
}

const clearColorCats = () => {
    coloredAttrs.forEach(at => {
        cats[at] = []
        colorCat[at] = {}
    })
}

export default colorCat

export { assignCatColors, clearColorCats, coloredAttrs, gatherUniqueCats }
