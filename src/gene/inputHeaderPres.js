
// Gene chart input header presentational component.

import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import GeneName from 'gene/geneName'

const VarSelect = ({list, name, show, tooltip, value, variable, onChange }) => {
    let comp = null
    if (show) {
        const helperId = 'gene-page-helper-var-helper-' + variable
        comp =
            <FormControl style={{width: '100%', marginTop: -19}}>
                <InputLabel htmlFor={helperId} >
                    {(variable === 'size') ? 'Size by' : 'Color by'}
                </InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    input={<Input
                        name={'gene-page-name-var-' + variable}
                        id={helperId}
                    />}
                    title={tooltip}
                >
                    {list.map((opt, i) =>
                        <MenuItem
                            value={opt.value}
                            title={opt.tooltip}
                            key={i}
                        >
                            {opt.label}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
    }
    return comp
}

const Presentation = (props) => {
    const { colorList, colorValue, colorTooltip, showVars, sizeList, sizeValue,
        sizeTooltip, onColorChange, onSizeChange } = props
    return (
        <Grid container spacing={16}
            alignItems='center'
            style={{height: 111, minHeight: 111}}
        >
            <Grid item xs={4}>
                <GeneName />
            </Grid>
            <Grid item xs={2}>
                <VarSelect
                    show={showVars}
                    list={sizeList}
                    tooltip={sizeTooltip}
                    value={sizeValue}
                    variable='size'
                    onChange={onSizeChange}
                />
           </Grid>
           <Grid item xs={3}>
                <VarSelect
                    show={showVars}
                    list={colorList}
                    tooltip={colorTooltip}
                    value={colorValue}
                    variable='color'
                    onChange={onColorChange}
                />
            </Grid>
           <Grid item xs={3} />
        </Grid>
    )
}

export default Presentation
