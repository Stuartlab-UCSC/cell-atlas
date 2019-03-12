
// The database page presentation.

import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import Favorite from 'database/Favorite'
import DatabaseTable from 'database/DatabaseTable'
import schema from 'images/schema.png'

const buttonStyle = {
    width: '15%',
    marginRight: '1rem',
}

const AddFavorite = ({ showDownload, onClick }) => {
    let comp = null
    if (showDownload) {
        comp =
            <Button
                variant='contained'
                component='span'
                size='small'
                onClick={onClick}
                style={buttonStyle}
            >
                Add to Favorites
            </Button>
    }
    return comp
}

const Download = ({ id, showDownload, downloadUrl, onDownloadClick }) => {
    let comp = null
    if (showDownload) {
        comp =
            <Button
                href={downloadUrl}
                target='_blank'
                download='stuartCellAtlas.tsv'
                variant='contained'
                size='small'
                component='a'
                style={buttonStyle}
            >
                Download
            </Button>
    }
    return comp
}
/*
            <Typography>
                <Link
                    href={downloadUrl}
                    target='_blank'
                    download='stuartCellAtlas.tsv'
                >
                    Download
                </Link>
            </Typography>
                <a
                    href={downloadUrl}
                    download='stuartCellAtlas.tsv'
                >
                    Download
                </a>
\*/
    /*
    TODO: download is opening in a tab rather than downloading directly.
    This works for tumormap in :
    link = $('<a href=' + getDataUrl('assignments') +
        ' title="Download positions of nodes on the hexagonal grid"' +
        ' download > Hexagon Coordinates </>');
    */

const Schema = ({ showSchema, schema }) => {
    let comp = null
    if (showSchema) {
        comp =
            <img
                src={schema}
                alt='schema'
                height={300}
            />
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
            Execute Query
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

const Progress = ({ message }) => {
    const comp =
        <Typography>
            {message}
        </Typography>
    return comp
}

const DatabasePres = (props) => {
    let { query, queryRowCount, showDownload, showSchema, tableStatus,
        onQueryKeyPress, onQueryChange, onExecuteClick, onSchemaClick,
        downloadUrl, onDownloadClick, onAddFavoriteClick, } = props
    const id = 'database'
    let progress = null
    let table = null
    if (tableStatus === 'requesting') {
        progress = <Progress message='waiting for requested data...' />
    } else {
        table = <DatabaseTable />
    }
    return (
        <Grid container spacing={16} >
            <Grid item xs={12}>
                <Typography variant='h6'>
                    SQL Query
                </Typography>
            </Grid>
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
                <ExecuteButton onClick={onExecuteClick} />
                <Button
                    variant='contained'
                    component='span'
                    size='small'
                    onClick={onSchemaClick}
                    style={buttonStyle}
                >
                    Database Schema
                </Button>
                <AddFavorite
                    showDownload={showDownload}
                    onClick={onAddFavoriteClick}
                />
                <Download
                    showDownload={showDownload}
                    downloadUrl={downloadUrl}
                    onDownloadClick={onDownloadClick}
                />
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
                <Schema
                    showSchema={showSchema}
                    schema={schema}
                />
            </Grid>
            <Grid item xs={12}>
                {progress}
                {table}
            </Grid>
        </Grid>
    )
}

export default DatabasePres
