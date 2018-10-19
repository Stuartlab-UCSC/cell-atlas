
// Select an upload file format.
// Also show format details in expandable sections.

import { connect } from 'react-redux'
import React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import FormatDetailGroup from 'format/FormatDetailGroup'
import FormatSelect from 'format/FormatSelect'

const UploadFormatPres = ({ id, select, formatGroup, expand }) => {
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
            <Grid item xs={8}>
                <Grid item xs={11}>
                    <FormatDetailGroup
                        id={id}
                        expand={expand}
                    />
                </Grid>
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
            {
                id: 'upload.format.expand',
                summary: 'Formats',
                value: state['upload.format.expand']
            },
            {
                id: 'upload.featureMatrix.expand',
                summary: 'Gene expression matrix',
                value: state['upload.featureMatrix.expand']
            },
            {
                id: 'upload.metadata.expand',
                summary: 'Sample metadata',
                value: state['upload.metadata.expand']
            },
            {
                id: 'upload.fullSimilarity.expand',
                summary: 'Full similarity',
                value: state['upload.fullSimilarity.expand']
            },
            {
                id: 'upload.sparseSimilarity.expand',
                summary: 'Sparse similarity',
                value: state['upload.sparseSimilarity.expand']
            },
            {
                id: 'upload.xyPositions.expand',
                summary: 'XY positions',
                value: state['upload.xyPositions.expand']
            },
            {
                id: 'upload.trajectory.expand',
                summary: 'Trajectoruy',
                value: state['upload.trajectory.expand']
            },
         ],
    }
}

const UploadFormat = connect(
    mapStateToProps,
)(UploadFormatPres)

export default UploadFormat
