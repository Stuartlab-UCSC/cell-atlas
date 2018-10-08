
// Select an upload file format.
// Also show format details in expandable sections.

import { connect } from 'react-redux'
import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import FormatDescribe from 'format/FormatDescribe'
import FormatSelect from 'format/FormatSelect'

const UploadFormatPres = ({ id, select, expand }) => {
    //console.log('UploadFormatPres: expand:', expand)
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <FormatSelect
                    id={select.id}
                    value={select.value}
                    type='analysisInput'
                />
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={1} />
            <Grid item xs={11}>
                <FormatDescribe
                    id={id}
                    expand={expand}
                />
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        id: 'upload',
        select: {
            id: 'upload.format',
            value: state['upload.format'],
            type: 'analysisInput',
        },
        expand: [
            { id: 'upload.format.expand',
                value: state['upload.format.expand']},
            { id: 'upload.featureMatrix.expand',
                value: state['upload.featureMatrix.expand']},
            { id: 'upload.fullSimilarity.expand',
                value: state['upload.fullSimilarity.expand']},
            { id: 'upload.sparseSimilarity.expand',
                value: state['upload.sparseSimilarity.expand']},
            { id: 'upload.xyPositions.expand',
                value: state['upload.xyPositions.expand']},
            { id: 'upload.metadata.expand',
                value: state['upload.metadata.expand']},
            { id: 'upload.trajectory.expand',
                value: state['upload.trajectory.expand']},
        ],
        xsTotal: 12,
    }
}

const UploadFormat = connect(
    mapStateToProps,
)(UploadFormatPres)

export default UploadFormat
