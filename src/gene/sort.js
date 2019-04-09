
// The gene page sort by color or size logic.

import { connect } from 'react-redux'

import Presentation from 'gene/sortLabelPres'

const customColorByHead = () => {
    return 'cOlOrBy'
}

const mapStateToProps = (state) => {
    const labels = findLabels(state)
    return {
        colorByLabel: colorRef[state['gene.color_by']].label,
        show: state['gene.showChart'],
        sizeByLabel: sizeRef[state['gene.size_by']].label,
        order: 
    }
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
