
import { connect } from 'react-redux'
import { matrixTransform } from 'bubble/matrix'
import data from 'cellTypeWork/data'

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
