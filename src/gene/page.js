
// The gene page.

import React from 'react'
import { connect } from 'react-redux'

import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'

import { set as rxSet } from 'state/rx'
//import fetchData from 'fetch/fetch'
import Chart from 'gene/chart'
import ChartPerDataset from 'gene/chartPerDataset'
import GeneName from 'gene/geneName'
import data from 'gene/data'

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
        // height of 200
        const marginBottom = -35 // 400 235
        const marginTop0 = -15
        const marginTop = -30
        comp =
            <React.Fragment>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Chart option 1: cluster Names on hover
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Chart
                        data={data.cluster_solutions}
                        size_var={data.size_var}
                        color_var={data.color_var}
                    />
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Chart option 2: cluster Names always displaying
                    </Typography>
                </Grid>
                {data.cluster_solutions.map((dataset, i) =>
                    <Grid item xs={12}
                        key={i}
                        style={{
                            marginTop: (i>0 ? marginTop : marginTop0),
                            marginBottom: marginBottom,
                        }}
                    >
                        <ChartPerDataset
                            data={dataset.clusters}
                            size_var={data.size_var}
                            color_var={data.color_var}
                            dataset_name={dataset.dataset_name}
                            cluster_solution_name=
                                {dataset.cluster_solution_name}
                            sequence={i.toString()}
                        />
                    </Grid>
                )}
            </React.Fragment>
    }
    return comp
}
const Presentation = ({ data, message }) => {
    return (
        <Grid container spacing={16} alignItems='center' >
            <GeneName />
            <ChartArea
                data={data}
                message={message}
            />
        </Grid>
    )
}

let prevFetchStatus = 'quiet'

const receiveData = (data) => {
    rxSet('gene.fetchStatus.quiet')
}

const getData = () => {
    receiveData(data)
    //let url = 'TODO/' + rxGet('geneName.value')
    //fetchData('gene', url, receiveData)
}

const mapStateToProps = (state) => {
    // Handle any changes to the fetch status.
    let dataReady = false
    let message = null
    const status = state['gene.fetchStatus']
    if (status !== prevFetchStatus) {
        if (typeof status === 'object' && status.message) {
            message = status.message
        } else if (status === 'waiting') {
            message = 'waiting for data...'
        } else if (status === 'request') {
            getData()
        } else if (status === 'quiet') {
            dataReady = true
        }
        prevFetchStatus = status
    }

    return {
        message,
        dataReady,
        data,
    }
}

const GeneCharts = connect(
    mapStateToProps
)(Presentation)

export default GeneCharts
