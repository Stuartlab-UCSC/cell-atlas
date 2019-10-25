// The top drawer of the Cell type worksheet page.

import React from 'react';
import { connect } from 'react-redux'
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography }
    from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import dataStore from 'cellTypeWork/dataStore'
import 'cellTypeWork/style.css'

const LabelValue = ({ label, value }) => {
    if (!value) {
        return null
    }
    return (
        <Typography>
            {label} {<b>{value}</b>}
        </Typography>
    )
}

const Body = ({props}) => {
    const { accessGroup, clustering, dataset, description } = props
    return (
        <DialogContent style={{margin: -12, marginLeft: 0, marginRight: 0}}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <LabelValue label='Access Group:' value={accessGroup} />
                </Grid>
                <Grid item xs={12}>
                    <LabelValue label='Clustering:' value={clustering} />
                </Grid>
                <Grid item xs={12}>
                    <LabelValue label='Dataset:' value={dataset} />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </DialogContent>
    )
}

const SheetNamePres = (props) => {
    const { open, worksheet, onClose } = props
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle style={{margin: -12, marginLeft: 0, marginRight: 0}}>
                {worksheet}
                <IconButton
                    style={{float: 'right', marginTop: -12, marginRight: -24}}
                    onClick={onClose}
                >
                    <CloseIcon color='primary' />
                </IconButton>
            </DialogTitle>
            <Body props={props} />
        </Dialog>
    )
}

const mapStateToProps = (state) => {
    return {
        clustering: dataStore.getClusterSolution(),
        dataset: dataStore.getDataset(),
        description: dataStore.getDescription(),
        accessGroup: dataStore.getAccessGroup(),
        open: state.cellTypeWork.sheetInfo,
        worksheet: state.cellTypeSheet.selected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: ev => {
            dispatch({ type: 'cellTypeWork.sheetInfo.close' })
        },
    }
}

const SheetName = connect(
    mapStateToProps, mapDispatchToProps
)(SheetNamePres)

export default SheetName
