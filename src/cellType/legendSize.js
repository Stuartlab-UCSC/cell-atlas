
// The gene page size legend logic.

import { connect } from 'react-redux'

import Presentation from 'cellType/legendPres'
import { sizeToRadius, stringToPrecision }
    from 'cellType/util'
import { showVars } from 'cellType/inputHeader'

const findLabels = (state) => {
    const mag = state['cellType.sizeMag']
    return [
        stringToPrecision(mag, 1),
        stringToPrecision(mag / 2, 1),
        stringToPrecision(mag / 4, 1),
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
