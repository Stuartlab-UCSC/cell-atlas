
// The database page presentation.

import React from 'react'
import Button from '@material-ui/core/Button'
import FormControl from "@material-ui/core/FormControl/FormControl"
import Grid from '@material-ui/core/Grid'
import Input from "@material-ui/core/Input/Input"
import NativeSelect from '@material-ui/core/NativeSelect'
import Typography from '@material-ui/core/Typography'

import { TextFieldGrid } from 'input/inputGrid'
import SmallButton from 'components/SmallButton'
import DatabaseTable from 'database/DatabaseTable'
import schema from 'database/schema.png'

const ExampleList = ({id, list, selected, onChange}) => {
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
    return null
    const comp =
        <Grid container spacing={16} >
            <Grid item xs={12}>
                <Typography variant='subheading'>
                    Examples
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ExampleList
                    id={id + '.exampleList'}
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

const Query = ({ id, query, queryRowCount, onKeyPress, onExecuteClick }) => {
    const comp =
        <Grid container spacing={16}>
            <Grid item xs={12}>
                <TextFieldGrid
                    id={id + '.query'}
                    label='SQL query'
                    defaultValue={query}
                    multiline={true}
                    rows={queryRowCount}
                    onKeyPress={onKeyPress}
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
            <Grid item xs={12}>
                <DatabaseTable />
            </Grid>
        </Grid>
    return comp
}

const DatabasePres = (props) => {
    let { exampleList, exampleQuery, exampleSelected, result, query,
        queryRowCount, showSchema, onQueryKeyPress, onExecuteClick,
        onExampleChange, onSchemaClick,
    } = props
    const id = 'database'
    let schemaDiagram = null
    if (showSchema) {
        schemaDiagram =
            <Grid item xs={12}>
                <img
                    src={schema}
                    alt='schema'
                    height={300}
                    style={{
                        //float: 'right',
                        //marginTop: imageTop,
                        //marginBottom: imageBottom,
                    }}
                />
            </Grid>
    }
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
                    queryRowCount={queryRowCount}
                    onKeyPress={onQueryKeyPress}
                    onExecuteClick={onExecuteClick}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <SmallButton
                            label='Database Schema'
                            action='schema'
                            onClick={onSchemaClick}
                        />
                    </Grid>
                    {schemaDiagram}
                </Grid>
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
    /*
    */
}

export default DatabasePres
