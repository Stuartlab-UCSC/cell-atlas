
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
            <ExpandedChart
                data={data}
            />
    } else {
        comp =
            <Chart
                data={data.cluster_solutions}
                size_by={data.size_by}
                color_by={data.color_by}
            />
    }
    return comp
}

const ChartArea = ({ data, expanded, message, onExpandClick }) => {
    let comp = null
    // If there is a fetch status message, render it rather than the chart.
    if (message) {
        comp = (
            <Typography>
                {message}
            </Typography>
        )
        
    // Render the chart.
    } else {
        comp =
            <React.Fragment>
                <Grid item xs={12}>
                    <hr />
                </Grid>
        
                <Grid item xs={4} >
                    <Button
                        variant='contained'
                        component='span'
                        size='small'
                        onClick={onExpandClick}
                    >
                        {expanded ? 'Collapse' : 'Expand'}
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant='h6'>
                        {data.gene}
                    </Typography>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={2} />
                <Grid item xs={2} >
                    <Legend />
                </Grid>
        
                <Grid item xs={12} style={{marginTop: -30, marginBottom: -30}}>
                    <WhichChart
                        data={data}
                        expanded={expanded}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <hr />
                </Grid>

            </React.Fragment>
    }
    return comp
}
const Presentation = ({ data, expandedChart, message, onExpandClick }) => {
    return (
        <Grid container spacing={16}>
            <GeneName />
            <ChartArea
                data={data}
                expanded={expandedChart}
                message={message}
                onExpandClick={onExpandClick}
            />
        </Grid>
    )
}
export default Presentation
