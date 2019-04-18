
// A bubble component.

import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { altBackground, altForeground } from 'app/themeData'
import { stringToPrecision } from 'app/util'

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
                                <Row
                                    label={data.color_by}
                                    value={stringToPrecision(data.color)}
                                />
                                <Row
                                    label={data.size_by}
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


export default BubbleTooltip
