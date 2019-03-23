
// The gene page.

import React from 'react'

import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'

import Chart from 'gene/chart'
import GeneName from 'gene/geneName'
import Legend from 'gene/legend'

const ChartArea = ({ data, message }) => {
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
                <Grid item xs={10}>
                    <Typography variant='h6'>
                        {data.gene}
                    </Typography>
                    <Typography variant='caption'>
                        (option A: cluster names only on hover)
                    </Typography>
                </Grid>
                <Grid item xs={2} >
                    <Legend />
                </Grid>
                <Grid item xs={12} style={{marginTop: -30, marginBottom: -30}}>
                    <Chart
                        data={data.cluster_solutions}
                        size_by={data.size_by}
                        color_by={data.color_by}
                    />
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant='h6'>
                        {data.gene}
                    </Typography>
                    <Typography variant='caption'>
                        (Option B: cluster Names always show)
                    </Typography>
                </Grid>
                <Grid item xs={2} >
                    <Legend />
                </Grid>
                {data.cluster_solutions.map((solution, i) =>
                    <Grid item xs={12}
                        key={i}
                        style={{
                            marginTop: (i>0 ? -100 : -35),
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
                <Grid item xs={12}>
                    <hr />
                </Grid>

            </React.Fragment>
    }
    return comp
}
const Presentation = ({ data, message }) => {
    return (
        <Grid container spacing={16}>
            <GeneName />
            <ChartArea
                data={data}
                message={message}
            />
        </Grid>
    )
}
export default Presentation
