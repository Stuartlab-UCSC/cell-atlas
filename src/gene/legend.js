
// Logic for the gene page legend.

import { connect } from 'react-redux'

import Presentation from 'gene/legendPres'
import { colorRef, colorNegMag, colorPosMag, getColor, maxBubbleSize, sizeMag,
    sizeRef, stringToPrecision } from 'gene/reference'

let sizes

const findColorLabels = () => {
    if (colorNegMag < 0) {
        return [
            stringToPrecision(colorPosMag),
            stringToPrecision(colorPosMag / 2),
            '0',
            stringToPrecision(colorNegMag / 2),
            stringToPrecision(colorNegMag),
        ]
    } else {
        return [
            stringToPrecision(colorPosMag),
            stringToPrecision(colorPosMag * 3 / 4),
            stringToPrecision(colorPosMag / 2),
            '0',
        ]
    }
}

const findColors = (labels) => {
    return labels.map(label => {
        return getColor(parseFloat(label))
    })
}

const findSizeLabels = () => {
    return [
        stringToPrecision(sizeMag, 2),
        stringToPrecision(sizeMag / 2, 2),
        stringToPrecision(sizeMag / 4, 2),
        '0',
    ]
}

const findSizes = () => {
    // Find the width of the bubbles.
    // Adjust for highcharts not respecting the max bubble size we provide.
    let sizes
    if (maxBubbleSize === 30) {
        sizes =  [24, 19, 15, 5]
    } else {
        sizes =  [24, 19, 15, 5]
        console.log('valid maxBubbleSizes are [30]')
    }
    return sizes
}

const mapStateToProps = (state) => {
    sizes = sizes || findSizes()
    const colorLabels = findColorLabels()    
    return {
        colorBy: colorRef[state['gene.color_by']].label,
        colorLabels,
        colors: findColors(colorLabels),
        geneLabel: state['gene.name'],
        sizeBy: sizeRef[state['gene.size_by']].label,
        sizeLabels: findSizeLabels(),
        sizes,
    }
}

const Legend = connect(
    mapStateToProps
)(Presentation)

export default Legend
