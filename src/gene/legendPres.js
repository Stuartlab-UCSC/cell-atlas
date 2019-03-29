
// The gene page legend presentational component.

import React from 'react'
import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'
import { background } from 'app/themeData'

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
                }}
            />
        </svg>
    return comp
}

const Shape = ({ variable, labels, values, i }) => {
    return (variable === 'color')
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

const Presentation = ({ by, labels, values, showVars, variable }) => {
    if (!showVars) {
        return null
    }
    return (
        <Grid container spacing={0}>
            {labels.map((portion, i) =>
                <React.Fragment key={i}>
                    <Grid item xs={2}
                        style={{
                            paddingRight: '0.5rem',
                            marginBottom: -1,
                            textAlign: 'center',
                        }}
                    >
                        <Shape
                            variable={variable}
                            labels={labels}
                            values={values}
                            i={i}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography
                            variant='caption'
                            align='left'
                            style={{ align: 'left' }}
                        >
                            {portion}
                        </Typography>
                    </Grid>
                    <Grid item xs={8} />
                </React.Fragment>
            )}
        </Grid>
    )
}

export default Presentation
