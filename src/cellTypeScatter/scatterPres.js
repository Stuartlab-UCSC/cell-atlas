
import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const imageHeight = 420
const paperWidth = 440

const Label = ({ gene }) => {
    if (gene === null) {
        return (
            <Typography inline>
                Cluster Assignments
            </Typography>
        )
    } else {
        return (
            <Typography inline>
                Gene: <b>{gene}</b>
            </Typography>
        )
    }
}

const AssignmentsButton = ({ gene, onClick }) => {
    if (!gene) {
        return (null)
    }
    return (
        <div>
            <Button
                variant='outlined'
                color='primary'
                size='small'
                style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '1rem',
                }}
                onClick={onClick}
            >
                Cluster Assignments
            </Button>
        </div>
    )
}

const ScatterPlotPres = ({ fetchMessage, gene, plot, show, onClick }) => {
    let paperHeight = imageHeight - 20
    let viz = null
    if (fetchMessage) {
        viz = (
            <Typography style={{marginTop: 40}}>
                {fetchMessage}
            </Typography>
        )
    } else if (show) {
        viz = (
            <Paper style={{
                position: 'relative',
                height: paperHeight,
                width: paperWidth
            }}>
                <img
                    src={plot}
                    alt='scatterPlot'
                    height={imageHeight}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: -65,
                        zIndex: -1,
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '0.8rem',
                }} >
                    <Label gene={gene} />
                </div>
                <AssignmentsButton
                    gene={gene}
                    onClick={onClick}
                />
            </Paper>
        )
    }
    return (
        <div style={{minHeight: paperHeight - 40}} >
            {viz}
        </div>
    )
}

export default ScatterPlotPres
