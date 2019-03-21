
// A gene chart.

import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more' //module

import colorMix from 'gene/colorMix'
import { background } from 'app/themeData'
import ref from 'gene/reference'

HC_more(Highcharts) //init module

const HIGH_POS_COLOR = '#ff0000'
const HIGH_NEG_COLOR = '#00ff00'

const legend = (data, sequence) => {
    // Only show the legend on the first chart.
    if (sequence > 0) {
        return {
            enabled: false,
        }
    } else {
        return {
            enabled: true,
            align: 'left',
            layout: 'vertical',
            verticalAlign: 'top',
            itemMarginTop: 10,
            bubbleLegend: {
                enabled: true,
                borderWidth: 1,
                connectorDistance: 40,
                maxSize: 70,
                ranges: [{}, {}, { color: '#e4d354' }]
            }
        }
    }
}

const normalizeColorVal = (val) => {
    // The algorithm assumes a range of -1 to 1 and interpolates between two
    // colors. We want to use three colors with positives between two colors
    // and negatives between two other colors. So normalize the value given as
    // 0 to 1 to be between -1 and 1.
    return 2 * val - 1;
}

const getColor = (val) => {
    if (val < 0) {
        return colorMix(normalizeColorVal(-val), background, HIGH_NEG_COLOR)
    } else {
        return colorMix(normalizeColorVal(val), background, HIGH_POS_COLOR)
    }
}

const sortBySize = (dataIn) => {
    let data = dataIn.slice()
    data.sort(((a, b) => { return b.size - a.size }))
    return data
}

const transform = (dataIn) => {
    // Transform the data received from the server
    // into the structure wanted by this chart library.
    // Sort the cluster data by the size value.
    const data = sortBySize(dataIn)
    let clusters = []
    let cData = {}
    const clusterData = data.map((cluster, seq) => {
        // Save the cluster name to label the axis.
        clusters.push(cluster.name)
        // Save the sequence number and size as (x,y=0,z)
        return {
            x: seq,
            y: 0,
            z: cluster.size,
            color: getColor(cluster.color),
            clusterColor: cluster.color,
            clusterName: cluster.name,
        }
    })
    //cData.series = [{ data: clusterData }]
    cData.series = [{}]
    cData.series[0].data = clusterData

    cData.xAxis = { categories: clusters }
    return cData
}

const options = (props) => {
    const { data, size_var, color_var, dataset_name, cluster_solution_name,
        sequence } = props
    //console.log('options:data:', data)
    const cData = transform(data)
    //console.log('options:cData:', cData)
    let options = {
        chart: {
            backgroundColor: 'transparent',
            height: 200,
            type: 'bubble',
        },
        credits: {
            enabled: false,
        },
        legend: legend(cData, sequence),
        plotOptions: {
            bubble: {
                marker: {
                    fillOpacity: 1,
                },
            },
        },
        series: [{
            data: cData.series[0].data,
            sizeBy: 'width',
            zMax: 1,
            zMin: 0,
        }],
        title: {
            text: ''
        },
        zMax: 100,
        zMin: 0,
        tooltip: {
            headerFormat: '',
            pointFormat:
                'cluster: {point.clusterName} <br>' +
                 ref[size_var].label + ': {point.z} <br>' +
                 ref[color_var].label + ': {point.clusterColor}',
        },
        xAxis: {
            categories: cData.xAxis.categories,
            gridLineWidth: 0,
            height: 100,
            lineWidth: 0,
            title: {
                text: 'Dataset: <b>' + dataset_name + '</b>, ' +
                    'Cluster Solution: <b>' + cluster_solution_name + '</b>'
            },
        },
        
        yAxis: {
            gridLineWidth: 0,
            height: 100,
            labels: {
                format: ' '
            },
            lineWidth: 0,
            maxPadding: 0.2,
            title: {
                text: ''
            },
        },
        zAxis: {
            lineWidth: 0,
            title: {
                text: ''
            },
        },
    }
    return options
}

const GeneChart = (props) => {
    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options(props)}
            />
        </div>
    )
}

export default GeneChart
