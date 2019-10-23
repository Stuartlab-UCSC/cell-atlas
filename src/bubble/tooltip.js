
// A bubble component.

import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { altBackground, altForeground } from 'app/themeData'
import { stringToPrecision } from 'app/util'

const Row = ({ label, value }) => {
    if (value === undefined) {
        return (null)
    }
    return (
        <tr>
            <td style={{textAlign: 'right'}} >
                {label + ':'}
            </td>
            <td>
                {value}
            </td>
        </tr>
    )
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

const ColorRow = ({ label, value, id }) => {
    let comp = null
    if (id !== 'cellType') {
        comp =
            <Row
                label={label}
                value={stringToPrecision(value)}
            />
    }
    return comp
}

const BubbleTooltip = ({data, id}) => {
    let comp = null
    if (data) {
        const style = {
            position: 'fixed',
            top: data.y + 10,
            left: data.x - 80,
            background: altBackground,
            color: altForeground,
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
                                <ColorRow
                                    label={data.color_by}
                                    value={data.color}
                                    id={id}
                                />
                                <Row
                                    label={data.size_by}
                                    value={stringToPrecision(data.size)}
                                />
                                <Row
                                    label='cluster'
                                    value={data.cluster}
                                />
                                <Row
                                    label='gene'
                                    value={data.gene}
                                />
                            </tbody>
                        </table>
                    </Typography>
                </CardContent>
            </Card>
    }
    return comp
}


export default BubbleTooltip
