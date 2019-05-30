
// A bubble component.

import React from 'react'

import { set as rxSet } from 'state/rx'
import { maxDiameter } from 'bubble/util'

const onMouseOut = (ev) => {
    rxSet('bubble.tooltip.mouseOut')
}

const onMouseOver = (ev) => {
    rxSet('bubble.tooltip.mouseOver',
        { value: {...ev.target.dataset, x: ev.pageX, y: ev.pageY }})
}

const Bubble = (props) => {
    // Create a bubble react component given a cluster's data.
    const { cellCount, color, colorBy, colorRgb, description, label, name,
        radius, size, sizeBy } = props
    const radiusStr = radius.toString()
    const center = (maxDiameter / 2 + 0.5).toString()
    const width = (maxDiameter + 1).toString()
    return (
        <svg
            height={width}
            width={width}
            style={{display: 'inline-block'}}
        >
            <circle
                cx={center}
                cy={center}
                r={radiusStr}
                stroke='grey'
                strokeWidth={1}
                fill={colorRgb}

                data-cell_count={cellCount}
                data-color={color}
                data-color_by={colorBy}
                data-description={description}
                data-label={label}
                data-name={name}
                data-size={size}
                data-size_by={sizeBy}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            />
        </svg>
    )
}

export default Bubble
