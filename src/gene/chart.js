
// A gene chart.

import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more' //module

import { colorRef, maxBubbleSize, minBubbleSize, sizeRef, sizeUnit }
    from 'gene/reference'
import chartCollapsed from 'gene/chartCollapsed'
import chartExpanded from 'gene/chartExpanded'

HC_more(Highcharts) //init module

const commonOptions = (cData, size_by, color_by) => {
    let options = {
        chart: {
            backgroundColor: 'transparent',
            type: 'bubble',
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            bubble: {
                marker: {
                    fillOpacity: 1,
                    lineWidth: 1,
                    lineColor: '#888888',
                },
                // highcharts actually draws smaller than this maxSize.
                maxSize: maxBubbleSize,
                minSize: minBubbleSize,
            },
        },
        series: [{
            data: cData.series[0].data,
            size_by: sizeUnit,
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
                'cell count: {point.cell_count} <br>' +
                sizeRef[size_by].label + ': {point.z}<br>' +
                colorRef[color_by].label + ': {point.clusterColor}',
        },
        xAxis: {
            gridLineWidth: 0,
            lineWidth: 0,
        },
        
        yAxis: {
            gridLineWidth: 0,
            lineWidth: 0,
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

const options = (props) => {
    return (props.expanded)
        ? chartExpanded(props, commonOptions)
        : chartCollapsed(props, commonOptions)
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
