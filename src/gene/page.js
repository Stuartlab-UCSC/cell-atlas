
// The gene page.

import React from 'react'
import { connect } from 'react-redux'

import Grid from "@material-ui/core/Grid/Grid";
import Typography from '@material-ui/core/Typography'

import { set as rxSet } from 'state/rx'
//import fetchData from 'fetch/fetch'
import Chart from 'gene/chart'
import GeneName from 'gene/geneName'
import data from 'gene/data'

const ChartArea = ({ data, message }) => {
    console.log('ChartArea:data:', data)
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
                {data.datasets.map((chartData, i) =>
                    <Grid item xs={12} key={i}>
                        <Chart
                            data={chartData}
                            size_var={data.size_var}
                            color_var={data.color_var}
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
        } else if (status === 'requesting') {
            message = 'waiting for data...'
        } else if (status === 'preRequest') {
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
