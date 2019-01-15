
// The database page presentation.

import React from 'react'
import Button from '@material-ui/core/Button'
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from '@material-ui/core/Grid';
import Input from "@material-ui/core/Input/Input";
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from '@material-ui/core/Typography';

import { TextFieldGrid } from 'input/inputGrid'

const DropDown = ({id, list, selected, onChange}) => {
    const comp =
        <FormControl style={{ width: '100%' }}>
            <NativeSelect
                value={selected}
                onChange={onChange}
                name="Examples"
                input={<Input id={id} />}
            >
                {list.map((opt, i) => (
                    <option
                        value={opt}
                        data-id={id}
                        key={i}>
                        {opt}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    return comp
}

const Examples = ({id, list, listValue, query, onChange}) => {
    const comp =
        <Grid container spacing={16} >
            <Grid item xs={12}>
                <Typography variant='subheading'>
                    Examples
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <DropDown
                    id={id + '.exampleDropDown'}
                    list={list}
                    value={listValue}
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextFieldGrid
                    id={id + '.exampleQuery'}
                    label='Query'
                    defaultValue={query}
                    multiline={true}
                    rows={10}
                />
            </Grid>
        </Grid>
    return comp
}

const Result = ({ result }) => {
    const comp =
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant='subheading'>
                    Result
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    {result}
                </Typography>
            </Grid>
        </React.Fragment>
    return comp
}

const Query = ({ id, query, result, onExecuteClick}) => {

    const comp =
        <Grid container spacing={16}>
            <Grid item xs={12}>
                <TextFieldGrid
                    id={id + '.query'}
                    label='SQL query *'
                    defaultValue={query}
                    multiline={true}
                    rows={10}
                />
            </Grid>
            <Grid item xs={12}>
                <label htmlFor={id}>
                    <Button
                        variant='contained'
                        component='span'
                        color='primary'
                        onClick={onExecuteClick}
                    >
                        Execute Query
                    </Button>
                </label>
            </Grid>
            <Result result={result} />
        </Grid>
    return comp
}

const DatabasePres = (props) => {
    let { exampleList, exampleQuery, exampleSelected, result, query,
        onExampleChange, onExecuteClick } = props
    const id = 'database'
    return (
        <Grid container spacing={16}
              className='pageBody'
        >
            <Grid item xs={12}>
                <Typography variant='title'>
                    Database Query
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Query
                    id={id}
                    query={query}
                    result={result}
                    onExecuteClick={onExecuteClick}
                />
            </Grid>
            <Grid item xs={6}>
                <Examples
                    id={id}
                    list={exampleList}
                    listValue={exampleSelected}
                    query={exampleQuery}
                    onChange={onExampleChange}
                />
            </Grid>
        </Grid>
    )
}

export default DatabasePres
