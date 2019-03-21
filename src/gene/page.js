
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
        const geneLabel = 'gene: ' + data.gene
        comp =
            <React.Fragment>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {geneLabel}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Collapsed chart: cluster Names only on hover
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Chart
                        data={data.cluster_solutions}
                        size_by={data.size_by}
                        color_by={data.color_by}
                    />
                </Grid>
                <Grid item xs={12}>
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Expanded chart: cluster Names always show
                    </Typography>
                </Grid>
                {data.cluster_solutions.map((cluster_solution, i) =>
                    <Grid item xs={12}
                        key={i}
                        style={{
                            marginTop: (i>0 ? marginTop : marginTop0),
                            marginBottom: marginBottom,
                        }}
                    >
                        <ChartPerDataset
                            data={cluster_solution.clusters}
                            size_by={data.size_by}
                            color_by={data.color_by}
                            dataset_name={cluster_solution.dataset_name}
                            cluster_solution_name=
                                {cluster_solution.cluster_solution_name}
                            sequence={i.toString()}
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

let prevFetchStatus = 'quiet'

const receiveData = (data) => {
    rxSet('gene.fetchStatus.quiet')
}

const getData = () => {
    receiveData(data)
    /*
    let url =
        'gene/' + rxGet('gene.name.value') +
        '/size-by/' + rxGet('gene.size_by') +
        '/color-by/' + rxGet('gene.color_by') +
  
    //fetchData('gene', url, receiveData)
    */
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
