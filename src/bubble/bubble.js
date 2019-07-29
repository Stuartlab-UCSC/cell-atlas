
// A bubble component.

import PropTypes from 'prop-types'
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

const Circle = ({ props }) => {
    const { cellCount, color, colorBy, colorRgb, name, offsetX, offsetY,
        radius, size, sizeBy } = props
    const radiusStr = radius.toString()
    let cx = maxDiameter / 2 + 0.5
    let cy = cx
    if (offsetX) {
        cx += offsetX
    }
    if (offsetY) {
        cy += offsetY
    }
    // Optional data to save in the widget.
    var opt = {}
    if (cellCount) {
        opt['data-cell_count'] = cellCount
    }
    if (name) {
        opt['data-name'] = name
    }

    return (
        <circle
            cx={cx.toString()}
            cy={cy.toString()}
            r={radiusStr}
            strokeWidth={0}
            fill={colorRgb}
            {...opt}
            data-color={color.toString()}
            data-color_by={colorBy}
            data-size={size.toString()}
            data-size_by={sizeBy}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        />
    )
}

const Bubble = (props) => {
    // Create a bubble react component given a cluster's data.
    const { justCircleElement } = props
    const width = (maxDiameter + 1).toString()
    if (justCircleElement) {
        return (
            <Circle props={props} />
        )
    } else {
        return (
            <svg
                height={width}
                width={width}
                style={{display: 'inline-block'}}
            >
                <Circle props={props} />
            </svg>
        )
    }
}

Bubble.propTypes = {
    cellCount: PropTypes.number,        // cell count for tooltip
    color: PropTypes.number,            // color value for tooltip
    colorBy: PropTypes.string,          // color-by variable for tooltip
    colorRgb: PropTypes.string.isRequired, // color of bubble
    name: PropTypes.string,             // name for the tooltip
    radius: PropTypes.number.isRequired,// radius of bubble
    size: PropTypes.number,             // size value for tooltip
    sizeBy: PropTypes.string,           // size-by variable for tooltip
    offsetX: PropTypes.number,          // pixels to offset in x direction
    offsetY: PropTypes.number,          // pixels to offset in y direction
    justCircleElement: PropTypes.bool,  // svg element is not needed
}

export default Bubble
