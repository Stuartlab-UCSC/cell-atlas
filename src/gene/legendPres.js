
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
    const width = '25'
    const height = '25'
    const strokeWidth = (values[i] === background) ? '1' : '0'
    let comp =
        <svg
            width={width}
            height={height}
            style={{display: 'inline-block', marginBottom: '-5'}}
        >
            <rect
                width={width}
                height={height}
                style={{
                    fill: values[i],
                    strokeWidth: strokeWidth,
                    stroke: 'grey',
                }}
            />
        </svg>
    return comp
}

const Shape = ({ isColor, labels, values, i }) => {
    return (isColor)
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

const Column = ({ colorBy, labels, sizeBy, values }) => {
    let isColor = false
    if (colorBy) {
        isColor = true
    }
    const comp =
        <Grid container
            spacing={0}
            justify='center'
            alignItems='center'
            alignContent='center'
        >
            {labels.map((portion, i) =>
                <React.Fragment key={i}>
                    <Grid item xs={6}
                        style={{
                            textAlign: 'right',
                            paddingRight: '0.5rem',
                            marginBottom: -1,
                        }}
                    >
                        <Shape
                            isColor={isColor}
                            labels={labels}
                            values={values}
                            i={i}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            variant='caption'
                            align='left'
                            style={{ align: 'left' }}
                        >
                            {portion}
                        </Typography>
                    </Grid>
                </React.Fragment>
            )}
        </Grid>
    return comp
}

const Head = ({ label }) => {
    const comp =
        <Grid item xs={6} >
            <Typography
                variant='caption'
                align='center'
                style={{
                    paddingBottom: '0.2rem',
                    display: 'table-cell',
                    verticalAlign: 'bottom'
                }}
            >
                {label}
            </Typography>
        </Grid>
    return comp
}

const Presentation = (props) => {
    const { colorBy, colorLabels, colors, sizeBy, sizeLabels, sizes } = props
    return (
        <Grid container spacing={0} >
            <Head label={sizeBy} />
            <Head label={colorBy} />
            <Grid item xs={6}>
                <Column
                    sizeBy={sizeBy}
                    labels={sizeLabels}
                    values={sizes}
                />
            </Grid>
            <Grid item xs={6}>
                <Column
                    colorBy={colorBy}
                    labels={colorLabels}
                    values={colors}
                />
            </Grid>
        </Grid>
    )
}

export default Presentation
