// The worksheet of the cell type worksheet page.

import React from 'react';
import { fontFamily } from 'app/themeData'
import bubbles from 'cellTypeWork/cellTypeWorksheet.png'
//import Bubble from 'bubble/bubble'
//import BubbleTooltip from 'bubble/tooltip'


const colWidth = 14
const rowHeight = 16.45
const fontSize = 11
const labelWidth = 100
const labelFontSize = 16
const topStyle = {
    width: colWidth,
    display: 'inline-block',
}
const leftColStyle = {
    width: labelWidth,
    textAlign: 'right',
}
const geneStyle = {
    ...leftColStyle,
    height: rowHeight,
    paddingRight: 15,
}
const labelStyle = {
    ...leftColStyle,
    paddingRight: 20,
    display: 'inline-block',
    fontSize: labelFontSize,
}

const CellTypes = ({ cellTypes, colors }) => {
    let types = []
    cellTypes.forEach((label, i) => {
        types.push(
            <div
                key={i}
                draggable
                style={{
                    ...topStyle,
                    color: colors[i],
                    height: 40,
                    whiteSpace: 'nowrap',
                    cursor: 'grab',
                    transform: 'translate(16px ,23px) rotate(-45deg)',
                }}
            >
                {label}
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

const ColorBar = ({ colors }) => {
    let tds = []
    colors.forEach((color, i) => {
        tds.push(
            <div
                key={i}
                style={{
                    ...topStyle,
                    height: 5,
                    background: color
                }}
            />
        )
    })
    return (
        <div>
            <div style={labelStyle} />
            {tds}
        </div>
    )
}

const Clusters = ({ clusters, colors }) => {
    let tds = []
    clusters.forEach((label, i) => {
        const color = (i % 2 === 0) ? 'black' : 'white'
        tds.push(
            <div
                key={i}
                draggable
                style={{
                    ...topStyle,
                    background: colors[i],
                    color: color,
                    cursor: 'grab',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    height: '18px',
                    paddingTop: '3px',
                 }}
            >
                {label}
            </div>
        )
    })
    return (
        <div>
            <div
                style={{
                    ...labelStyle,
                    height: '20px',
                }}
            >
                Cluster #
            </div>
            {tds}
        </div>
    )
}

const Counts = ({ counts }) => {
    let tds = []
    counts.forEach((label, i) => {
        tds.push(
            <div key={i} style={{
                ...topStyle,
                transform: 'translate(-2px, 5px) rotate(-90deg)'
            }}>
                {label}
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

const Genes = ({ genes }) => {
    let tds = []
    genes.forEach((label, i) => {
        tds.push(
            <div
                key={i}
                draggable
                style={{...geneStyle, cursor: 'move'}}
            >
                {label}
            </div>
        )
    })
    return (
        <div
            style={{
                marginTop: 14,
                display: 'inline-block',
                verticalAlign: 'top'
            }}
        >
            {tds}
        </div>
    )
}

const Worksheet = (props) => {
    const { cellTypes, clusters, colors, counts, genes, show } = props
    if (!show) {
        return (null)
    }
    const tableStyle = {
        width: ((clusters.length + 6) * colWidth) + labelWidth,
        paddingTop: 25,
        fontFamily: fontFamily,
        fontSize: fontSize,
    }
    const bubbleStyle = {
        display: 'inline-block',
        marginLeft: '-9px',
    }
    return (
        <div style={tableStyle}>
            <CellTypes cellTypes={cellTypes} colors={colors} />
            <ColorBar colors={colors}/>
            <Clusters clusters={clusters} colors={colors} />
            <Counts counts={counts} />
            <Genes genes={genes} />
            <img src={bubbles} alt='bubbles' height={410} width={531} style={bubbleStyle}/>
        </div>
    )
}

export default Worksheet
