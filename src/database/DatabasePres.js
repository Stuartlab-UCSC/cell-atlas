
// The database page presentation.

import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import Favorite from 'database/Favorite'
import DatabaseTable from 'database/DatabaseTable'
import schema from 'database/schema.png'

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
    const { id, query, favoriteSelected, rows, onChange, onKeyPress } = props
    //console.log('Query render: favoriteSelected:', favoriteSelected)
    //console.log('Query render: query:', query)
    let comp
    if (favoriteSelected) {
        //console.log('Query render: HAS favorite')
        // The trigger for this render Is due to a select from favorites,
        // so set the CURRENT value to the selected favorite.
        comp =
            <TextField
                id={id}
                label='SQL Database Query'
                multiline={true}
                rows={rows}
                value={query}
                onChange={onChange}
                onKeyPress={onKeyPress}
                title={'SQL string to query the database'}
                style={{ width: '100%' }}
            />
    } else {
        //console.log('Query render: NO favorite')
        // The trigger for this render IS NOT due to a select from favorites,
        // so set the DEFAULT value with the state.
        comp =
            <TextField
                id={id}
                label='SQL Database Query'
                multiline={true}
                rows={rows}
                defaultValue={query}
                onChange={onChange}
                onKeyPress={onKeyPress}
                title={'SQL string to query the database'}
                style={{ width: '100%' }}
            />
    }
    return comp
}

const DatabasePres = (props) => {
    let { query, favoriteSelected, queryRowCount, showDownload, showSchema,
        onQueryKeyPress, onQueryChange, onExecuteClick, onSchemaClick,
        downloadUrl, onDownloadClick, onAddFavoriteClick, } = props
    const id = 'database'
    return (
        <Grid container spacing={16}
              className='pageBodyLower'
        >
            <Grid item xs={6}>
                <Query
                    id={id + '.query'}
                    query={query}
                    favoriteSelected={favoriteSelected}
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
                <DatabaseTable />
            </Grid>
        </Grid>
    )
}

export default DatabasePres
