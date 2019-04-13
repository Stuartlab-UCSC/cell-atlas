
// The gene page presentational component.

import React from 'react'

import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'

import { integerToCommaInteger } from 'app/util'
import { BubbleTooltip } from 'cellType/bubble'
import Table from 'cellType/table'
import InputHeader from 'cellType/inputHeader'
import LegendColor from 'cellType/legendColor'
import LegendSize from 'cellType/legendSize'

const MatchesFound = ({ data, showChart }) => {
    let comp = null
    if (showChart) {
        comp =
            <Typography variant='body2'>
                <b>{integerToCommaInteger(data.cluster_similarities.length)}</b>
                    &nbsp;clusters found
            </Typography>
    }
    return comp
}

const SameValueMessage = ({ name, same }) => {
    let comp = null
    // If this name is in the sameValueColumn list
    if (same[name]) {
        const labels = {
            datasetName: 'dataset',
            cluster_solution_name: 'cluster solution',
            species: 'species',
            organ: 'organ',
            study: 'study',
        }
        // Columns that should be in italics.
        const italics = ['study']
        if (italics.includes(name)) {
            comp =
                <Typography>
                    {labels[name]}: <b><i>{same[name]}</i></b>
                </Typography>
        } else {
            comp =
                <Typography>
                    {labels[name]}: <b>{same[name]}</b>
                </Typography>
        }
    }
    return comp
}

const SameValueMessages = ({ props }) => {
    let comp = null
    const { catAttrs, sameValueColumns, showChart } = props
    if (showChart && Object.keys(sameValueColumns).length > 0) {
        // Build a message for each column.
        let items = []
        catAttrs.forEach((attr, i) => {
            items.push(
                <SameValueMessage
                    name={attr}
                    same={sameValueColumns}
                    key={i}
                />
            )
        })
        comp =
            <div>
                {items}
            </div>
    }
    return comp
}

const SubHeader = ({ props }) => {
    const { data, showChart } = props
    let Hr = null
    if (showChart) {
        Hr =
            <Grid item xs={12} style={{marginTop: '-1rem'}}>
                <hr style={{border: '#dddddd solid 0.3px'}} />
            </Grid>
    }
    let comp =
        <Grid container spacing={16} style={{marginTop: '-3.5rem'}}>
            <Grid item xs={3} />
            <Grid item xs={3} >
                <LegendColor />
            </Grid>
            <Grid item xs={2} >
                <LegendSize />
            </Grid>
            <Grid item xs={4} style={{marginTop: '-4rem'}} >
                <MatchesFound data={data} showChart={showChart} />
                <SameValueMessages props={props} />
            </Grid>
            {Hr}
        </Grid>
    return comp
}

const Body = (props) => {
    // Render a message, or render the chart, or render nothing.
    const { message, showChart } = props.props
    let comp = null
    if (showChart) {
        comp =
            <div>
                <div style={{marginTop: '-5rem'}} >
                    <Table />
                </div>
            </div>
    } else if (message){
        comp =
            <Typography variant='subtitle2' style={{marginTop: '1rem'}}>
                {message}
            </Typography>
    }
    return comp
}

const DatasetAndClusterSolution = ({props}) => {
    let comp = null
    if (props.showChart) {
        const { cluster_solution_name, dataset_name } = props.data
        comp =
            <Typography inline={true} align='right' style={{float: 'right', marginTop: '0.5rem' }} >
                <b>{dataset_name}</b>, cell type comparison with <b>{cluster_solution_name}</b>
            </Typography>
    /*} else {
        comp =
            <Typography inline={true} align='right' style={{float: 'right' }} >
                <b>cell type comparison</b>
            </Typography>*/
    }
    return comp
}

const PageTitle = () => {
    return (
            <Typography variant='h6' inline={true} style={{ marginBottom: '-1rem' }}>
                Cell Type Psychic
            </Typography>
    )
}

const Presentation = (props) => {
    return (
        <div>
            <PageTitle />
            <DatasetAndClusterSolution props={props} />
            <InputHeader />
            <SubHeader props={props} />
            <Body props={props} />
            <BubbleTooltip data={props.bubbleTooltip}/>
        </div>
    )
}

export default Presentation
