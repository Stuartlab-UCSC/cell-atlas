
// A bubble component.

import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { set as rxSet } from 'state/rx'
import { colorRef, maxBubbleDiameter, sizeRef, stringToPrecision }
    from 'gene/util'

const Row = ({ label, value }) => {
    const comp =
        <tr>
            <td style={{textAlign: 'right'}} >
                {label + ':'}
            </td>
            <td>
                {value}
            </td>
        </tr>
    return comp
}

const Label = ({ value }) => {
    let comp = null
    if (value !== undefined) {
        comp =
            <Row
                label='label'
                value={value}
            />
    }
    return comp
}

const Description = ({ value }) => {
    let comp = null
    if (value !== undefined) {
        comp =
            <Row
                label='description'
                value={value}
            />
    }
    return comp
}

const BubbleTooltip = ({data}) => {
    let comp = null
    if (data) {
        const style = {
            position: 'fixed',
            top: data.y + 10,
            left: data.x - 80,
            background: '#888888',
        }
        comp =
            <Card style={style} >
                <CardContent style={{padding: '0.3rem'}} >
                    <Typography
                        color='inherit'
                        variant='caption'
                        style={{lineHeight: '0.8rem'}}
                    >
                        <table>
                            <tbody>
                                <Row
                                    label='cluster'
                                    value={data.name}
                                />
                                <Label value={data.label} />
                                <Description value={data.description} />
                                <Row
                                    label='cell count'
                                    value={data.cell_count}
                                />
                                <Row
                                    label={colorRef[data.color_by].label}
                                    value={stringToPrecision(data.color)}
                                />
                                <Row
                                    label={sizeRef[data.size_by].label}
                                    value={stringToPrecision(data.size)}
                                />
                            </tbody>
                        </table>
                    </Typography>
                </CardContent>
            </Card>
    }
    return comp
}

const onMouseOut = (ev) => {
    rxSet('gene.bubbleTooltip.mouseOut')
}

const onMouseOver = (ev) => {
    rxSet('gene.bubbleTooltip.mouseOver',
        { value: {...ev.target.dataset, x: ev.pageX, y: ev.pageY }})
}

const Bubble = (props) => {
    // Create a bubble react component given a cluster's data.
    const { cell_count, color, color_by, colorRgb, description, label, name,
        radius, size, size_by } = props
    const radiusStr = radius.toString()
    const center = (maxBubbleDiameter / 2 + 0.5).toString()
    const width = (maxBubbleDiameter + 1).toString()
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

                data-cell_count={cell_count}
                data-color={color}
                data-color_by={color_by}
                data-description={description}
                data-label={label}
                data-name={name}
                data-size={size}
                data-size_by={size_by}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            />
        </svg>
    )
}

export { Bubble, BubbleTooltip }
