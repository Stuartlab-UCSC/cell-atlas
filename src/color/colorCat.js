
// Handle categorical attributes, including colors.

import ColorMap from 'lib/jPalette'

// The list of categorical color attributes we are handling.
const coloredAttrs = ['species', 'organ', 'study']
// The list of categorial attributes that are checked for all the same value.
const catAttrs = ['datasetName', 'cluster_solution_name'].concat(coloredAttrs)
// The store for category to color mapping.
let colorCat = {}
// This holds unique category values while being gathered.
let cats = {}

const toHexString = (val) => {
    let hex = val.toString(16)
    return (hex.length < 2) ? '0' + hex : hex
}

const summarizeCats = () => {
    // Find those attrs with all the same value and assign colors.
    let singleValues = {}
    catAttrs.forEach(at => {
        if (cats[at].length < 2) {
            // Columns with all the same value are returned to the caller.
            singleValues[at] = cats[at][0]
        }
        if (coloredAttrs.includes(at)) {
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
        }
    })
    return singleValues
}

const gatherUniqueCats = (group) => {
    // Gather the unique categories within each attribute.
    // group is an object with keys included in the list of catAttrs.
    catAttrs.forEach(at => {
        if (!cats[at].includes(group[at])) {
            cats[at].push(group[at])
        }
    })
}

const clearCats = () => {
    catAttrs.forEach(at => {
        cats[at] = []
        if (coloredAttrs.includes(at)) {
            colorCat[at] = {}
        }
    })

}

export default colorCat

export { summarizeCats, clearCats, catAttrs, coloredAttrs, gatherUniqueCats }
