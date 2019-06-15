// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CellTypes from 'cellTypeWork/cellTypes'
import CellTypesEdit from 'cellTypeWork/cellTypesEdit'
import ColorBar from 'cellTypeWork/colorBar'
const labelFontSize = 16

const GeneButton = ({props}) => {
    // The gene stats button.
    const { onGeneStatsButtonClick } = props
    const { cellTypesHeight, clusterMarginTop, colorBarHeight, colWidth,
        fontSize, geneWidth } = props.dims
    return (
        <Button
            id='cellTypeWorkClusterButton'
            variant='outlined'
            size='small'
            color='primary'
            style={{
                position: 'absolute',
                top: cellTypesHeight + colorBarHeight + clusterMarginTop - 6,
                left: geneWidth + (colWidth * 3) + 10,
                fontSize: fontSize,
            }}
            onClick={onGeneStatsButtonClick}
        >
            Gene Stats
        </Button>
    )
}

const SelectMessage = ({props}) => {
    // The gene stats select message.
    const { cellTypesHeight, clusterMarginTop, colorBarHeight, colWidth,
        geneWidth } = props.dims
    return (
        <Typography
            id='cellTypeWorkClusterButton'
            color='primary'
            style={{
                position: 'absolute',
                top: cellTypesHeight + colorBarHeight + clusterMarginTop,
                left: geneWidth + (colWidth * 3) + 10,
            }}
        >
            Click on a Cluster
        </Typography>
    )
}

const ClusterNames = ({ labelStyle, topStyle, props }) => {
    const { clusters, colormap, mode, onClick, onMouseDown, onMouseLeave,
        onMouseOver } = props
    let tds = []
    clusters.forEach((cluster, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        tds.push(
            <div
                data-position={i}
                data-domain='cellTypeWorkClusters'
                key={i}
                style={{
                    ...topStyle,
                    background: colormap[i],
                    color: color,
                    cursor: (mode === 'select') ? 'pointer' : 'grab',
                    userSelect: 'none',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    height: '18px',
                    paddingTop: '3px',
                    marginTop: '-5px',
                }}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseOver}
            >
                {cluster.name}
            </div>
        )
    })
    return (
        <div>
            <div
                style={{
                    ...labelStyle,
                    height: 15,
                    marginTop: 5,
                }}
            >
                Cluster #
            </div>
            {tds}
        </div>
    )
}

const CellCounts = ({ clusters, topStyle, labelStyle }) => {
    let tds = []
    clusters.forEach((cluster, i) => {
        tds.push(
            <div key={i} style={{
                ...topStyle,
                transform: 'translate(-2px, 5px) rotate(-90deg)'
            }}>
                {cluster.cellCount}
            </div>
        )
    })
    return (
        <div>
            <div
                style={{
                    ...labelStyle,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginLeft: 2,
                }}
            >
                # of Cells
            </div>
            {tds}
        </div>
    )
}

const Presentation = (props) => {
    const { mode, clusters, showButton } = props
    const { colWidth, geneWidth } = props.dims
    if (!clusters) {
        return (null)
    }
    // If the gene stats button is to be shown, show the button or the message
    // depending on the mode of 'select' or 'sortable'.
    let GenesWidget = null
    if (showButton) {
        if (mode === 'select') {
            GenesWidget = ( <SelectMessage props={props} /> )
        } else {
            GenesWidget = ( <GeneButton props={props} /> )
        }
    }
    const topStyle = {
        width: colWidth,
        display: 'inline-block',
    }
    const labelStyle = {
        width: geneWidth,
        textAlign: 'right',
        paddingRight: 20,
        display: 'inline-block',
        fontSize: labelFontSize,
    }
   return (
        <React.Fragment>
            <CellTypes />
            <CellTypesEdit />
            <ColorBar />
            <ClusterNames
                props={props}
                topStyle={topStyle}
                labelStyle={labelStyle}
            />
            {GenesWidget}
            <CellCounts
                clusters={clusters}
                topStyle={topStyle}
                labelStyle={labelStyle}
            />
        </React.Fragment>
    )
}

export default Presentation
