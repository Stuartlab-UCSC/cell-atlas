
// The worksheet logic for the cell type worksheet page.

import { connect } from 'react-redux'
import Presentation from 'cellTypeWork/worksheetPres'
import { getCatColormap } from 'color/colorCat'

const cellTypes = [
    '',
    'Ventricular CMs',
    '',
    '',
    '',
    '',
    'Atrial CMs',
    '',
    '',
    'AVC CMs',
    'CCS CMs',
    '',
    'Endocardio',
    '',
    'Vascular Endothelial',
    'Lymphatic',
    '',
    '',
    'Fibroblasts',
    '',
    '',
    '',
    '',
    '',
    'Smooth Muscle',
    '',
    '',
    '',
    '',
    '',
    'VIC',
    'Epicardial',
    'Neuronal-like',
    '',
    'WBC',
    '',
    'RBC',
]
const clusters = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36',
]
const colors = getCatColormap('hexmap', clusters.length)
const counts = [
    2643, 3322, 13962, 3029, 1413, 1406, 3096, 1873, 3975,  925,
    2010, 640, 5553, 3138, 310, 353, 8779, 3911, 3666, 1876,
    1635, 5736, 1530, 4115, 3507, 4110, 3291, 933, 4342, 5024,
    685, 1313, 596, 3373, 305, 729, 416,
]
const genes = [
    'TP53', 'TNF', 'EGFR', 'VEGFA', 'APOE', 'IL6', 'TGFBI', 'MTHFR', 'ESR1', 'AKTI',
    'TP53', 'TNF', 'EGFR', 'VEGFA', 'APOE', 'IL6', 'TGFBI', 'MTHFR', 'ESR1', 'AKTI',
    'TP53', 'TNF', 'EGFR', 'VEGFA',
]


const mapStateToProps = (state) => {
    return {
        cellTypes,
        clusters,
        colors,
        counts,
        genes,
        show: state.cellTypeWork.showSave,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: ev => {
            const value = ev.target.value
            dispatch({
                type: 'cellTypeWork.solutionRowCount.select',
                queryString: value,
            })
            dispatch({
                type: 'cellTypeWork.solutionSelected.uiSelect',
                value,
            })
        },
    }
}

const Worksheet = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Worksheet
