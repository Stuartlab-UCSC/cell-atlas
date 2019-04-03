
// The gene page size legend logic.

import { connect } from 'react-redux'

import Presentation from 'gene/legendPres'
import { sizeToRadius, stringToPrecision }
    from 'gene/util'
import { showVars } from 'gene/inputHeader'

const findLabels = (state) => {
    const mag = state['gene.sizeMag']
    return [
        stringToPrecision(mag, 2),
        stringToPrecision(mag / 2, 2),
        stringToPrecision(mag / 4, 2),
        '0',
    ]
}

const findSizes = (labels) => {
    // Find the width of the bubbles where the size values are represented
    // by the area of the circle.
    return labels.map(label => {
        return sizeToRadius(parseFloat(label)) * 2
    })
}

const mapStateToProps = (state) => {
    const labels = findLabels(state)
    return {
        labels: labels,
        showVars: showVars(state),
        values: findSizes(labels),
        variable: 'size',
    }
}

const LegendSize = connect(
    mapStateToProps
)(Presentation)

export default LegendSize
