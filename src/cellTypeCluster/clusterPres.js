// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react';
import CellTypes from 'cellTypeBar/cellTypes'
import ColorBar from 'cellTypeCluster/clusterBar'

const CellCounts = ({ clusters, topStyle, labelFontSize, labelStyle }) => {
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
    const { clusters } = props
    const { colWidth, geneWidth, labelFontSize } = props.dims
    if (!clusters) {
        return (null)
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
            <div style={{
                ...labelStyle,
                height: 15,
                marginTop: 5,
            }} >
                Cluster #
            </div>
            <ColorBar />
            <CellCounts
                clusters={clusters}
                topStyle={topStyle}
                labelFontSize={labelFontSize}
                labelStyle={labelStyle}
            />
        </React.Fragment>
    )
}

export default Presentation
