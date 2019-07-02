
// The legend presentational component.

import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'
import { stringToPrecision } from 'app/util'
import { getRangeColor } from 'color/range'
import { maxDiameter, sizeToRadius } from 'bubble/util'

const rangeColorInfo = (min, max) => {
    let labels = (min < 0)
        ? [
            stringToPrecision(max, 2),
            '0',
            stringToPrecision(min, 2),
        ]
        : [
            stringToPrecision(max, 2),
            stringToPrecision(max / 2, 2),
            '0',
        ]
    let colors = labels.map(label => {
        return getRangeColor(parseFloat(label), min, max)
    })

    return { labels, values:colors}
}

const sizeInfo = (min, max) => {
    // Find the width of the bubbles where the size values are represented
    // by the area of the circle.
    const labels = [
        stringToPrecision(max, 2),
        stringToPrecision((max - min) / 2, 2),
        stringToPrecision(min, 2),
    ]
    let diameters = labels.map(label => {
        return sizeToRadius(parseFloat(label), min, max) * 2
    })
    return { labels, values: diameters }
}

const Circle = ({ diameters, i, colors }) => {
    let diameter = maxDiameter
    let color = 'grey'
    let marginTop = 2
    if (diameters) { // a sized circle
        diameter = diameters[i].toString()
        marginTop = 2 + 2 * i
    } else {  // a colored circle
        color = colors[i]
    }
    const rad = (diameter / 2).toString()
    const svgStyle = {
        display: 'inline-block',
        marginTop: marginTop,
        marginLeft: 20,
    }
    let comp =
        <svg
            height={diameter}
            width={diameter}
            style={svgStyle}
        >
            <circle
                cx={rad}
                cy={rad}
                r={rad}
                strokeWidth={0}
                fill={color}
                style={{textAlign: 'right'}}
            />
        </svg>
    return comp
}

/*
const Rectangle = ({ values, i }) => {
    const width = '20'
    const strokeWidth = (values[i] === background) ? '1' : '0'
    let comp =
        <svg
            width={width}
            height={width}
            style={{display: 'inline-block', marginBottom: '-5'}}
        >
            <rect
                width={width}
                height={width}
                style={{
                    fill: values[i],
                    strokeWidth: strokeWidth,
                    stroke: 'grey',
                    textAlign: 'right',
                }}
            />
        </svg>
    return comp
}
*/

const Shape = ({ i, flavor, values }) => {
    switch (flavor) {
    case 'colorBubble':
        return (<Circle
            i={i}
            colors={values}
        />)
    case 'sizeBubble':
        return (<Circle
            i={i}
            diameters={values}
        />)
    default:
        console.log('invalid legend flavor of:', flavor)
    }
}

const Legend = ({ flavor, min, max }) => {
    if (min === 0 && max === 0) {
        return null
    }
    let info
    let shapeStyle
    if (flavor === 'colorBubble') {
        info = rangeColorInfo(min, max)
        shapeStyle = {
            marginBottom: -1,
            textAlign: 'right',
            paddingRight: '0.5rem',
        }
    } else if (flavor === 'sizeBubble') {
        info = sizeInfo(min, max)
        shapeStyle = {
            textAlign: 'center',
        }
    }
    const labels = info.labels
    const values = info.values
    return (
        <Grid container spacing={0}>
            {labels.map((label, i) =>
                <React.Fragment key={i}>
                    <Grid item xs={6} style={shapeStyle} >
                        <Shape
                            i={i}
                            flavor={flavor}
                            values={values}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant='caption'
                            align='left'
                            style={{ align: 'left' }}
                        >
                            {label}
                        </Typography>
                    </Grid>
                </React.Fragment>
            )}
        </Grid>
    )
}

export default Legend
