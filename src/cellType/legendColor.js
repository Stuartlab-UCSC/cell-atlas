
// The gene page color legend logic.

import { connect } from 'react-redux'

import { get as rxGet} from 'state/rx'
import Presentation from 'cellType/legendPres'
import { getColor, stringToPrecision } from 'cellType/util'
import { showVars } from 'cellType/inputHeader';

const findLabels = () => {
    const colorNegMag = rxGet('cellType.colorNegMag')
    const colorPosMag = rxGet('cellType.colorPosMag')

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

const mapStateToProps = (state) => {
    const labels = findLabels()
    return {
        labels,
        showVars: showVars(state),
        values: findColors(labels),
        variable: 'color',
    }
}

const LegendColor = connect(
    mapStateToProps
)(Presentation)

export default LegendColor
