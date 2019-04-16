
// A color column component for a datatable where the column contains colors
// rather than text.

import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { altBackground } from 'app/themeData'
import { set as rxSet } from 'state/rx'
import colorCat from 'color/colorCat'

const ColorColumnTooltip = ({data}) => {
    let comp = null
    if (data) {
        const style = {
            position: 'fixed',
            top: data.y + 10,
            left: data.x - 80,
            background: altBackground,
        }
        comp =
            <Card style={style} >
                <CardContent style={{padding: '0.3rem'}} >
                    <Typography
                        color='inherit'
                        variant='caption'
                        style={{lineHeight: '0.8rem'}}
                    >
                        {data.value}
                    </Typography>
                </CardContent>
            </Card>
    }
    return comp
}

const onMouseOut = (ev) => {
    rxSet('bubble.colorColumn.Tooltip.mouseOut')
}

const onMouseOver = (ev) => {
    rxSet('bubble.colorColumnTooltip.mouseOver',
        { value: {...ev.target.dataset, x: ev.pageX, y: ev.pageY }})
}

const ColorColumn = (value, tableMeta) => {
    // For rendering colors rather than text in the column.
    const attr = tableMeta.columnData.name
    let comp = null

    if (attr) {
        comp =
            <div
                data-value={value}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                style={{
                    backgroundColor: colorCat[attr][value],
                    width: '100%',
                    height: 28,
                }}
            />
    }
    return comp
}

export default ColorColumn
export { ColorColumnTooltip }
