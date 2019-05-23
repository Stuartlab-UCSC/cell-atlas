
import { connect } from 'react-redux'
import React from 'react';
import IconButton from '@material-ui/core/IconButton'
//import ToggleButton from '@material-ui/lab/ToggleButton';
//import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Typography from '@material-ui/core/Typography'

/*
const ClusterMenu = ({ clusters, onChange, onKeyPress }) => {
    const itemStyle = {
        textTransform: 'none',
        fontWeight: 400,
        fontSize: '0.7rem',
        height: '1.5rem',
        width: '0.5rem',
        padding: 0,
        //margin: -5,
        position: 'relative',
    }
    let list = []
    clusters.forEach((cluster, i) => {
        list.push(
            <ToggleButton
                value={cluster}
                style={{...itemStyle,left: -20*i}}
            >
                {cluster}
            </ToggleButton>
        )
    })
    return (
        <div
            style={{
                width: '100%',
                height: '2.5rem',
                zIndex: '3000',
                //position: 'fixed',
                marginBottom: '10rem',
                //background: altBackground,
                //color: altForeground,
            }}
        >
            <ToggleButtonGroup
                exclusive
                style={{position: 'relative'}}
                onChange={this.onToggleGroupChange}
            >
                {list}
            </ToggleButtonGroup>
        </div>
    )
}
*/
const Presentation = ({ clusters, show, onClick }) => {
    if (!show) {
        return (null)
    }
    let list = []
    clusters.forEach(cluster => {
        list.push(
            <IconButton
                key={cluster}
                style={{
                    height: '1.5rem',
                    width: '1.5rem',
                    padding: 5,
                }}
                value={cluster}
                onClick={onClick}
            >
                <Typography  variant='body2' style={{fontSize: '0.7rem'}}>
                    {cluster}
                </Typography>
            </IconButton>
        )
    })
    return (
        <div>
            <Typography
                inline={true}
                style={{
                    marginRight: '0.5rem',
                    marginLeft: '1rem',
                }}
            >
                Show genes for cluster:
            </Typography>
            {list}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        clusterSelected: state.cellTypeWork.geneCluster,
        clusters: state.cellTypeWork.clusters,
        show: state.cellTypeWork.showSave,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: ev => {
            dispatch({
                type: 'cellTypeWork.geneCluster.uiSet',
                value: ev.currentTarget.value,
            })
            dispatch({ type: 'cellTypeWork.getGeneTable.true' })
        },
    }
}

const GeneClusterSelect = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default GeneClusterSelect
