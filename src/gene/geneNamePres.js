
// Presentation component to search for a gene.

import React from 'react'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

const VarSelect = ({ label, list, helperId, name, value, onChange }) => {
    let comp =
        <Grid item xs={3}>
            <FormControl style={{width: '100%'}}>
                <InputLabel htmlFor={helperId}>
                    {label}
                </InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    input={<Input name={name} id={helperId} />}
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
        </Grid>
    return comp
}

const Selectors = (props) => {
    const { selectors, onColorChange, onSizeChange } = props
    let comp = null
    if (selectors !== null) {
        const { colorList, colorValue, sizeList, sizeValue } = selectors
        comp =
            <React.Fragment>
                <VarSelect
                    helperId='gene-size-helper'
                    label='Size by'
                    list={sizeList}
                    name='geneSize'
                    value={sizeValue}
                    onChange={onSizeChange}
                />
                <VarSelect
                    helperId='gene-color-helper'
                    label='Color by'
                    list={colorList}
                    name='geneColor'
                    value={colorValue}
                    onChange={onColorChange}
                />
            </React.Fragment>
    }
    return comp
}

const Presentation = (props) => {
    const { errorMessage, selectors, value, onNameChange, onButtonClick,
        onColorChange, onSizeChange } = props
    let error = false
    let label = 'Gene'
    if (errorMessage) {
        error = true
        label = errorMessage
    }
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <TextField
                    label={label}
                    value={value}
                    error={error}
                    helperText='HUGO, Ensembl or Entrez'
                    onChange={onNameChange}
                    autoFocus={true}
                    style={{ width: '100%' }}
                />
            </Grid>
            <Grid item xs={2} style={{marginTop: '1rem'}}>
                <Button
                    variant='contained'
                    component='span'
                    size='small'
                    color='primary'
                    onClick={onButtonClick}
                >
                    Find
                </Button>
            </Grid>
            <Selectors
                selectors={selectors}
                onColorChange={onColorChange}
                onSizeChange={onSizeChange}
            />
        </React.Fragment>
    )
}

export default Presentation
