
// The database page presentation.

import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import DataTable from 'components/DataTable'
import Favorite from 'database/Favorite'
import schema from 'images/schema.png'

const buttonStyle = {
    width: '15%',
    marginRight: '1rem',
}

const AddFavorite = ({ showAddToFavorite, onClick }) => {
    let comp = null
    if (showAddToFavorite) {
        comp =
            <Button
                variant='contained'
                component='span'
                size='small'
                onClick={onClick}
                style={buttonStyle}
            >
                Add Favorite
            </Button>
    }
    return comp
}

const Schema = ({ showSchema, schema }) => {
    let comp = null
    if (showSchema) {
        comp =
            <Grid item xs={12}>
                <img
                    src={schema}
                    alt='schema'
                    height={350}
                />
            </Grid>
    }
    return comp
}

const ExecuteButton = ({ onClick }) => {
    const comp =
        <Button
            variant='contained'
            component='span'
            size='small'
            color='primary'
            onClick={onClick}
            style={buttonStyle}
        >
            Run Query
        </Button>
    return comp
}

const Query = (props) => {
    const { id, query, rows, onChange, onKeyPress } = props
    let comp =
        <TextField
            id={id}
            label='Query'
            multiline={true}
            rows={rows}
            value={query}
            onChange={onChange}
            onKeyPress={onKeyPress}
            title={'SQL string to query the database'}
            style={{ width: '100%' }}
        />
    return comp
}

const Buttons = (props) => {
    const {
        showAddToFavorite,
        onExecuteClick,
        onSchemaClick,
        onAddFavoriteClick,
    } = props
    let comp =
        <React.Fragment>
            <ExecuteButton onClick={onExecuteClick} />
            <Button
                variant='contained'
                component='span'
                size='small'
                onClick={onSchemaClick}
                style={buttonStyle}
            >
                Schema
            </Button>
            <AddFavorite
                showAddToFavorite={showAddToFavorite}
                onClick={onAddFavoriteClick}
            />
        </React.Fragment>
    return comp
}

const DatabasePres = (props) => {
    let { query, queryRowCount, showSchema, table,
        onQueryKeyPress, onQueryChange, onExecuteClick, onSchemaClick,
        onAddFavoriteClick, } = props
    const id = 'database'
    return (
        <Grid container spacing={16} >
            <Grid item xs={6}>
                <Query
                    id={id + '.query'}
                    query={query}
                    rows={queryRowCount}
                    onKeyPress={onQueryKeyPress}
                    onChange={onQueryChange}
                />
            </Grid>
            <Grid item xs={6}>
                <Favorite />
            </Grid>
            <Grid item xs={12}>
                <Buttons
                    onExecuteClick={onExecuteClick}
                    onSchemaClick={onSchemaClick}
                    onAddFavoriteClick={onAddFavoriteClick}
                />
            </Grid>
            <Schema
                showSchema={showSchema}
                schema={schema}
            />
            <Grid item xs={12}>
                <DataTable
                    header={table.header}
                    data={table.data}
                    columns={table.columns}
                    status={table.status}
                />
            </Grid>
        </Grid>
    )
}

export default DatabasePres
