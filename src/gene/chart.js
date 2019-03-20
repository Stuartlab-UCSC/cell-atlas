
// A gene chart.

import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts) //init module

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
            //labelFormat: ' ',
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

const transform = (data) => {
    // Transform the data received from the server
    // into the structure wanted by this chart library.
    console.log('transform:data:', data)
    let clusters = []
    let cData = {}
    const clusterData = data.clusters.map((cluster, seq) => {
        // Save the cluster name to label the axis.
        clusters.push(cluster.name)
        // Save the sequence number and size as (x,y=0,z)
        return {
            x: seq,
            y: 0,
            z: cluster.size,
            //color: cluster.color,
        }
    })
    cData.series = [{ data: clusterData }]
    cData.xAxis = { categories: clusters }
    return cData
}

const options = ({ data, size_var, color_var, sequence }) => {
    console.log('options:data:', data)
    const cData = transform(data)
    console.log('options:cData:', cData)
    let options = {
        chart: {
            type: 'bubble'
        },
        legend: legend(cData, sequence),
        plotOptions: {
            //series: {
            //    maxSize: 70
            //}
        },
        series: cData.series,
        title: {
            text: ''
        },
        
        xAxis: {
            categories: cData.xAxis.categories,
            gridLineWidth: 1,
            lineWidth: 0,
            title: {
                text: 'Clusters'
            },
            //labels: {
            //    format: '{value} tt'
            //},
            //plotLines: [{
                //color: 'black',
                //dashStyle: 'dot',
                //width: 0,
                //value: 65,
                //label: {
                //    rotation: 0,
                //    y: 15,
                //    text: 'Safe fat intake 65g/day'
                //},
              //zIndex: 3
            //}]
        },
        
        yAxis: {
            gridLineWidth: 0,
            //startOnTick: false,
            //endOnTick: false,
            labels: {
                format: ' '
            },
            title: {
                text: ''
            },
            lineWidth: 0,
            //maxPadding: 0.2,
            //plotLines: [{
                //color: 'black',
                //width: 0,
                //value: 50,
                //label: {
                //    align: 'right',
                //    text: 'Safe sugar intake 50g/day',
                //    x: -10
                //},
                //zIndex: 3
            //}]
        },
        zAxis: {
            ceiling: 100,
            //startOnTick: false,
            //endOnTick: false,
            title: {
                text: ''
            },
            labels: {
                format: '{value} '
            },
            lineWidth: 0,
        },
        // from https://codepen.io/pen/?&editable=true
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
