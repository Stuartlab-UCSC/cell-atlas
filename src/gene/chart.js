
// A gene chart.

import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more' //module

import colorMix from 'gene/colorMix'
import { background } from 'app/themeData'
import { colorRef, sizeRef } from 'gene/reference'

HC_more(Highcharts) //init module

const HIGH_POS_COLOR = '#ff0000'
const HIGH_NEG_COLOR = '#00ff00'
const height = 80

const legend = (cData) => {
    // Only show the legend on the first chart.
    return {
        enabled: false,
    }
    /*
    return {
        align: 'right',
        //labelFormat: ' ',
        layout: 'vertical',
        verticalAlign: 'top',
        itemMarginTop: 10,
        bubbleLegend: {
            enabled: true,
            borderWidth: 1,
            connectorDistance: 40,
            maxSize: 70,
            //ranges: [{}, {}, {}]
            ranges: [{}, {}, { color: '#e4d354' }]
        }
    }
    */
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

const sortClustersBySize = (dataIn) => {
    let data = dataIn.slice()
    data.sort(((a, b) => { return b.size - a.size }))
    return data
}
/*
const sortSolutionsBySize = (dataIn) => {
    const compare = (a, b) => {
        for (var i = 0; i < data.solutions.length; i++) {
            if (b.clusters[i].size !== a.clusters[i].size) {
                return b.clusters[i].size - a.clusters[i].size
            }
        }
    }
    
    let data = dataIn.slice()
    data.cluster_solutions.sort(compare)
    return data
}

const sortBySize = (dataIn) => {
    let data = dataIn.slice()
    dataIn.forEach((solution, i) => {
        data.solution.clusters = sortClustersBySize(solution.clusters)
    })
    data.solutions = sortSolutionsBySize(data.solutions)
    return data
}
*/
const transform = (dataIn) => {
    // Transform the data received from the server
    // into the structure wanted by this chart library.
    // Sort the cluster data by the size value.
    const data = dataIn
    //const data = sortBySize(dataIn)
    let yLabels = []
    const clusterData = []
    let cData = {
        series: [{ data: [] }]
    }
    data.forEach((solution, i) => {
        yLabels.push(
            '<b>' + solution.dataset_name + '</b> dataset<br>' +
            '<b>' + solution.cluster_solution_name + '</b> cluster solution')
        const clusters = sortClustersBySize(solution.clusters)
        clusters.forEach((cluster, j) => {
        //solution.clusters.forEach((cluster, j) => {
            clusterData.push({
                x: j, // cluster position on x axis
                y: i, // dataset/cluster_solution position on y axis
                z: cluster.size,
                color: getColor(cluster.color),
                clusterColor: cluster.color,
                clusterName: cluster.name,
            })
        })
        
        cData.series[0].data = clusterData
        cData.yAxis = { ceiling: i }
    })
    cData.yAxis.categories = yLabels
    return cData
}

const options = ({ data, size_by, color_by }) => {
    //console.log('options:data:', data)
    const cData = transform(data)
    //console.log('options:cData:', cData)
    let options = {
        chart: {
            backgroundColor: 'transparent',
            height: 130, // TODO dynamic depending on # of solutions
            type: 'bubble',
        },
        credits: {
            enabled: false,
        },
        legend: legend(cData),
        plotOptions: {
            bubble: {
                marker: {
                    fillOpacity: 1,
                    //lineColor: 'black',
                    //lineWidth: 1,
                },
            },
        },
        series: [{
            data: cData.series[0].data,
            //pointPlacement: 1,
            size_by: 'width',
            zMax: 1,
            zMin: 0,
        }],
        title: {
            text: ''
        },
        tooltip: {
            headerFormat: '',
            pointFormat:
                'cluster: {point.clusterName} <br>' +
                 sizeRef[size_by].label + ': {point.z} <br>' +
                 colorRef[color_by].label + ': {point.clusterColor}',
        },
        xAxis: {
            gridLineWidth: 0,
            height: 0,
            lineWidth: 0,
            labels: {
                format: ' '
            },
            tickWidth: 0,
            /*title: {
                text: ''
            },*/
        },
        
        yAxis: {
            categories: cData.yAxis.categories,
            ceiling: cData.yAxis.ceiling,
            floor: 0,
            gridLineWidth: 0,
            height: height, // TODO dynamic depending on # of solutions
            lineWidth: 0,
            //showFirstLabel: false,
            //showLastLabel: false,
            title: {
                text: ''
            },
        },
        zAxis: {
            ceiling: 1,
            floor: 0,
            labels: {
                enabled: true,
            },
            lineWidth: 0,
            max: 1,
            min: 0,
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
