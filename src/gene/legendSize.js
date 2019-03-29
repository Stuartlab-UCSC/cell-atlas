
// The gene page size legend logic.

import { connect } from 'react-redux'

import Presentation from 'gene/legendPres'
import { maxBubbleSize, minBubbleSize, sizeRef, sizeUnit,
    stringToPrecision } from 'gene/util'
import { showVars } from 'gene/inputHeader'

let sizes

const findLabels = (state) => {
    const mag = state['gene.sizeMag']
    return [
        stringToPrecision(mag, 2),
        stringToPrecision(mag / 2, 2),
        stringToPrecision(mag / 4, 2),
        '0',
    ]
}

const area = (r) => {
    // Return area given a radius.
    return Math.PI * r**2
}

const radius = (a) => {
    // =Return the radius given an area.
    return Math.sqrt(a / Math.PI)
}

const findSizes = () => {
    // Find the width of the bubbles.
    const directTranslation = true
    let sizes
    if (directTranslation && sizeUnit === 'area') {
        // This calculates diameters of intermediate bubbles with
        // max & min bubble size given as diameters in pixels.
        // Find the areas of the intermediate bubbles, then convert to diameter.
        const aInterval = area(maxBubbleSize / 2) - area(minBubbleSize / 2)
        const a1 = aInterval / 2
        const a2 = aInterval / 4
        sizes = [maxBubbleSize, radius(a1) * 2, radius(a2) * 2, minBubbleSize]
    } else {
        // Adjust for highcharts sometimes not respecting
        // the max bubble size we provide.
        if (maxBubbleSize === 30) {
            sizes =  [24, 19, 15, 5]
        } else {
            sizes =  [24, 19, 15, 5]
            console.log('valid maxBubbleSizes are [30]')
        }
    }
    return sizes
}

const mapStateToProps = (state) => {
    sizes = sizes || findSizes()
    return {
        by: sizeRef[state['gene.size_by']].label,
        labels: findLabels(state),
        showVars: showVars(state),
        values: sizes,
        variable: 'size',
    }
}

const LegendSize = connect(
    mapStateToProps
)(Presentation)

export default LegendSize
