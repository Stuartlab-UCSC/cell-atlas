
// A bubble component.

import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import { colorRef, maxBubbleDiameter, sizeRef } from 'gene/util'

const Label = ({ label }) => {
    let comp = null
    if (label !== undefined) {
        comp =
            <Typography color='inherit' variant='caption'>
                {'label: ' + label}
            </Typography>
    }
    return comp
}

const Description = ({ description }) => {
    let comp = null
    if (description !== undefined) {
        comp =
            <Typography color='inherit' variant='caption'>
                {'description: ' + description}
            </Typography>
    }
    return comp
}

const Title = (props) => {
    // TODO this would be better created on dynamically on hover
    // rather than one for each bubble.
    const { cell_count, color, color_by, description, label, name, size,
        size_by } = props.props
    let comp =
        <React.Fragment>
            <Typography color='inherit'>
                {'cluster: ' + name}
            </Typography>
            <Label label={label} />
            <Description description={description} />
            <Typography color='inherit' variant='caption'>
                {'cell count: ' + cell_count}
            </Typography>
            <Typography color='inherit' variant='caption'>
                {colorRef[color_by].label + ': ' + color}
            </Typography>
            <Typography color='inherit' variant='caption'>
                {sizeRef[size_by].label + ': ' + size}
            </Typography>
        </React.Fragment>
    return comp
}

const Bubble = (props) => {
    // Create a bubble react component given a cluster's data.
    const { colorRgb, radius } = props
    const radiusStr = radius.toString()
    const center = (maxBubbleDiameter / 2 + 0.5).toString()
    const width = (maxBubbleDiameter + 1).toString()
    return (
        <Tooltip
            title={
                <Title props={props} />
            }
        >
            <svg
                id='myBubble'
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
                />
            </svg>
        </Tooltip>
    )
}

export default Bubble
