// The worksheet of the cell type worksheet page.

import React from 'react';

const labelFontSize = 16

const CellTypes = ({ clusters, topStyle, labelStyle }) => {
    let types = []
    clusters.forEach((cluster, i) => {
        types.push(
            <div
                key={i}
                draggable
                style={{
                    ...topStyle,
                    color: cluster.color,
                    height: 40,
                    whiteSpace: 'nowrap',
                    cursor: 'grab',
                    transform: 'translate(16px ,23px) rotate(-45deg)',
                }}
            >
                {cluster.cellType}
            </div>
        )
    })
    return (
        <div>
            <div style={labelStyle}>
                Cell-type
            </div>
            {types}
        </div>
    )
}

const BarColor = ({ clusters, topStyle, labelStyle, geneWidth }) => {
    let tds = []
    clusters.forEach((cluster, i) => {
        tds.push(
            <div
                key={i}
                style={{
                    ...topStyle,
                    height: 10,
                    background: cluster.barColor
                }}
            />
        )
    })
    return (
        <div>
            <div style={{ ...labelStyle, paddingLeft: geneWidth }} >
                {tds}
            </div>
        </div>
    )
}

const ClusterNames = ({ clusters, topStyle, labelStyle }) => {
    let tds = []
    clusters.forEach((cluster, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        tds.push(
            <div
                key={i}
                draggable
                style={{
                    ...topStyle,
                    background: cluster.color,
                    color: color,
                    cursor: 'grab',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    height: '18px',
                    paddingTop: '3px',
                 }}
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

const Presentation = ({ clusters, dims }) => {
    const { colWidth, geneWidth } = dims
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
            <CellTypes
                clusters={clusters}
                topStyle={topStyle}
                labelStyle={labelStyle}
            />
            <BarColor
                clusters={clusters}
                topStyle={topStyle}
                geneWidth={geneWidth}
            />
            <ClusterNames
                clusters={clusters}
                topStyle={topStyle}
                labelStyle={labelStyle}
            />
            <CellCounts
                clusters={clusters}
                topStyle={topStyle}
                labelStyle={labelStyle}
            />
        </React.Fragment>
    )
}

export default Presentation
