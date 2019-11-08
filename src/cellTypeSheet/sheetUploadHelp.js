
import { connect } from 'react-redux'
import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Typography } from '@material-ui/core'

const Content = () => {
    return (
        <DialogContent>
            <Typography>
There are two scripts available to generate the data needed to create a
worksheet. One script takes in a scanpy object and the other takes in
TSV-formatted files.
<br/>There are four TSV file formats for upload to the cell type workbench.
            </Typography>
            
            <Typography variant='subtitle1'>
                Expression matrix. File name: exp.tsv
            </Typography>
            <pre>
gene       AAACCCAAGCGTATGG-1    ...    TTTGTTGTCGCACGAC-1<br/>
NOC2L      1.767468              ...    0.624987<br/>
PLEKHN1    0.864569              ...    0.645758<br/>
...</pre>

            <Typography variant='subtitle1'>
                Cluster assignments of cells. File name: clustering.tsv
            </Typography>
            <pre>
cell                  cluster<br/>
AAACCCAAGCGTATGG-1    3<br/>
AAACCCAGTCCTACAA-1    2<br/>
...</pre>

            <Typography variant='subtitle1'>
                Cartesian coordinates of cells. File name: xys.tsv
            </Typography>
            <pre>
cell                  x           y<br/>
AAACCCAAGCGTATGG-1    5.352023    14.706462<br/>
AAACCCAGTCCTACAA-1    2.181495    32.960689<br/>
...</pre>

            <Typography variant='subtitle1'>
                Marker gene metrics. File name: markers.tsv
            </Typography>
            <pre>
cluster    gene       log2fc       ...    -log10_pval    1-adjp*2<br/>
7          NOC2L      0.008068     ...    -0.000000      0.000000<br/>
9          PLEKHN1    -1.015159    ...     0.608961      0.939455<br/>
...</pre>
        </DialogContent>
    )
}

const UploadHelpPres = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
        >
            <DialogTitle>
                Upload File formats
            </DialogTitle>
            <Content />
            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    return {
        open: state.cellTypeSheetUpload.helpOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: ev => {
            // Close the dialog.
            dispatch({ type: 'cellTypeSheetUpload.helpOpen.close' })
        },
    }
}

const UploadHelp = connect(
    mapStateToProps, mapDispatchToProps
)(UploadHelpPres)

export default UploadHelp
