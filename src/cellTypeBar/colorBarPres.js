// The presentational component for the clusters and their info
// on the cell type worksheet.

import React from 'react'
import { GithubPicker } from 'react-color';

const ColorPicker = ({props}) => {
    const { showPicker, colormap, startColor} = props
    if (showPicker === null) {
        return (null)
    }
    return (
        <GithubPicker
            colors={colormap}
            value={startColor}
            triangle='hide'
        />
    )
}

const ColorBarPres = (props) => {
    const { colorBar, colormap, onBarClick, onMouseOver } = props
    const { colorBarHeight, colWidth, geneWidth } = props.dims
    let tds = []
    colorBar.forEach((bar, i) => {
        tds.push(
            <div
                key={i}
                data-position={i}
                style={{
                    width: colWidth,
                    display: 'inline-block',
                    height: colorBarHeight,
                    background: colormap[bar],
                    cursor: 'pointer',
                }}
                onClick={onBarClick}
                onMouseOver={onMouseOver}
            />
        )
    })
    return (
        <div>
            <div
                style={{paddingLeft: geneWidth }}
            >
                {tds}
            </div>
            <ColorPicker props={props} />
        </div>
    )
}

export default ColorBarPres
