
import { connect } from 'react-redux'
import { matrixTransform } from 'bubble/matrix'
import data from 'cellTypeWorksheet/data'

let chartData // data in the format to be rendered

const matrixRefresh = (newData) => {
    /*
    if (rxGet('cellTypeWork.firstChartDisplayed')) {
        // Initialize
    }
    const s = rxGet('cellTypeWork.sort')
    rxSet('cellTypeWork.showChart.sorting')
    sortBy(data.cluster_solutions, s.column, s.direction)
    */
    let transformed = matrixTransform('cellTypeWork', data)
    chartData = transformed.data
    if (newData) {
        // This means new data has arrived from the server and this is not
        // just a refresh from a column or row move.
        console.log('we have new data from the server')
    }
    //rxSet('cellTypeWork.showChart.toQuietStatus')
}

const matrixNewData = (data) => {
    // Executed whenever we get new data from the server.
    if (rxGet('cellTypeWork.firstChartDisplayed')) {
        // Initialize
        themeOverrides = getThemeOverrides()
    }
    matrixRefresh(true)
}

const onMove = (column, direction) => {
    // TODO: this may be better at the worksheet level.
    //rxSet('cellTypeWork.sort.uiSet', { column, direction })
    matrixRefresh()
}

const mapStateToProps = (state) => {
    matrixRefresh(true) // TODO: temp stub until fetching data
    return {
        data: chartData,
    }
}

const Matrix = connect(
    mapStateToProps
)(MatrixPres)

export default Matrix

export { matrixNewData }
