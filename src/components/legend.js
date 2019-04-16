
// The legend presentational component.

import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'
import { background } from 'app/themeData'
import { stringToPrecision } from 'app/util'
import { getRangeColor } from 'color/range'
import { sizeToRadius } from 'bubble/util'

const rangeColorInfo = (min, max) => {
    let labels = (min < 0)
        ? [
            stringToPrecision(max, 2),
            stringToPrecision(max / 2, 2),
            '0',
            stringToPrecision(min / 2, 2),
            stringToPrecision(min, 2),
        ]
        : [
            stringToPrecision(max, 2),
            stringToPrecision(max * 3 / 4, 2),
            stringToPrecision(max / 2, 2),
            '0',
        ]
    let colors = labels.map(label => {
        return getRangeColor(parseFloat(label), min, max)
    })
    return { labels, values: colors }
}

const bubbleInfo = (min, max) => {
    // Find the width of the bubbles where the size values are represented
    // by the area of the circle.
    const labels = [
        stringToPrecision(max, 1),
        stringToPrecision((max - min) / 2, 1),
        stringToPrecision((max - min) / 4, 1),
        stringToPrecision(min, 1),
    ]
    let diameters = labels.map(label => {
        return sizeToRadius(parseFloat(label), min, max) * 2
    })
    return { labels, values: diameters }
}

const Circle = ({ diameters, i }) => {
    const diameter = diameters[i].toString()
    const rad = (diameters[i] / 2).toString()
    let comp =
        <svg
            height={diameter}
            width={diameter}
            style={{display: 'inline-block'}}
        >
            <circle
                cx={rad}
                cy={rad}
                r={rad}
                strokeWidth={0}
                fill='grey'
            />
        </svg>
    return comp
}

const Rectangle = ({ labels, values, i }) => {
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

const Shape = ({ flavor, labels, values, i }) => {
    return (flavor === 'colorRange')
        ? <Rectangle
            values={values}
            labels={labels}
            i={i}
        />
        : <Circle
            diameters={values}
            labels={labels}
            i={i}
        />
}

const Legend = ({ flavor, min, max }) => {
    let info
    let shapeStyle
    if (flavor === 'colorRange') {
        info = rangeColorInfo(min, max)
        shapeStyle = {
            marginBottom: -1,
            textAlign: 'right',
            paddingRight: '0.5rem',
        }
    } else if (flavor === 'bubble') {
        info = bubbleInfo(min, max)
        shapeStyle = {
            marginBottom: -1,
            textAlign: 'center',
        }
    }
    let labels = info.labels
    let values = info.values
    return (
        <Grid container spacing={0}>
            {labels.map((portion, i) =>
                <React.Fragment key={i}>
                    <Grid item xs={3} style={shapeStyle} >
                        <Shape
                            flavor={flavor}
                            labels={labels}
                            values={values}
                            i={i}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography
                            variant='caption'
                            align='left'
                            style={{ align: 'left' }}
                        >
                            {portion}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} />
                </React.Fragment>
            )}
        </Grid>
    )
}

export default Legend
