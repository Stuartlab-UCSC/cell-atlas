
// The gene page.

import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'

import Chart from 'gene/chart'
import GeneName from 'gene/geneName'
import Legend from 'gene/legend'

const ExpandedChart = ({ data }) => {
    let comp =
        <React.Fragment>
            {data.cluster_solutions.map((solution, i) =>
                <Grid item xs={12}
                    key={i}
                    style={{
                        marginTop: (i>0 ? -100 : -5),
                        marginBottom: -35 ,
                    }}
                >
                    <Chart
                        expanded={true}
                        data={data.cluster_solutions}
                        size_by={data.size_by}
                        color_by={data.color_by}
                        dataset_name={solution.dataset_name}
                        cluster_solution_name=
                            {solution.cluster_solution_name}
                        i={i}
                    />
                </Grid>
            )}
        </React.Fragment>
    return comp
}

const WhichChart= ({ data, expanded }) => {
    let comp = null
    if (expanded) {
        comp =
            <Grid item xs={12} style={{marginTop: -40}}>
                <ExpandedChart
                    data={data}
                />
            </Grid>
    } else {
        comp =
            <Grid item xs={12} style={{marginTop: -10}}>
                <Chart
                    data={data.cluster_solutions}
                    size_by={data.size_by}
                    color_by={data.color_by}
                />
            </Grid>
    }
    return comp
}

const SolutionLabel = ({ expanded }) => {
    let comp
    if (expanded) {
        comp =
            <React.Fragment>
                <Grid item xs={6} />
                <Grid item xs={6} style={{marginTop: 50, marginBottom: -30}}>
                    <Typography>
                        Dataset, Cluster Solution
                    </Typography>
                </Grid>
            </React.Fragment>
    } else {
        comp =
            <React.Fragment>
                <Grid item xs={2} style={{marginTop: 50}}>
                    <Typography>
                        Dataset<br />Cluster Solution
                    </Typography>
                </Grid>
                <Grid item xs={10} />
            </React.Fragment>
    }
    return comp
}

const ChartHead = (props) => {
    const { data, expanded, onExpandClick } = props.props
    let comp =
        <Grid container spacing={0}>
            <Grid item xs={5} >
                <Button
                    variant='contained'
                    component='span'
                    size='small'
                    onClick={onExpandClick}
                >
                    {expanded ? 'Collapse' : 'Expand'}
                </Button>
            </Grid>
            <Grid item xs={7}>
                <Typography variant='h6'>
                    {data.gene}
                </Typography>
            </Grid>
            <SolutionLabel expanded={expanded} />
        </Grid>
    return comp
}

const ChartArea = (props) => {
    const { data, message, expanded } = props
    //console.log('ChartArea:message:', message)
    let comp = null
    // If there is a fetch status message, render it rather than the chart.
    if (message) {
        comp = (
            <Typography variant='subtitle2'>
                {message}
            </Typography>
        )
        
    // Render the chart.
    } else {
        comp =
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <hr />
                </Grid>
        
                <Grid item xs={10}>
                    <ChartHead props={props} />
                </Grid>
                <Grid item xs={2} >
                    <Legend />
                </Grid>
        
                <WhichChart
                    data={data}
                    expanded={expanded}
                />
            </Grid>
    }
    return comp
}
const Presentation = ({ data, expandedChart, message, onExpandClick }) => {
    //console.log('Presentation:message:', message)
    return (
        <Grid container spacing={16}>
            <GeneName />
            <Grid item xs={12}>
                <ChartArea
                    data={data}
                    expanded={expandedChart}
                    message={message}
                    onExpandClick={onExpandClick}
                />
            </Grid>
        </Grid>
    )
}
export default Presentation
