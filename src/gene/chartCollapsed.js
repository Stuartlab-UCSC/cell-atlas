
// The collapsed gene chart information.

import { getColor } from 'gene/reference'

const transform = (data) => {
    // Transform the data received from the server
    // into the structure wanted by this chart library.
    let yLabels = []
    const clusterData = []
    let cData = {
        series: [{ data: [] }]
    }
    data.forEach((solution, i) => {
        yLabels.push(
            '<b>' + solution.dataset_name + '</b> dataset<br>' +
            '<b>' + solution.cluster_solution_name + '</b> cluster solution')
        solution.clusters.forEach((cluster, j) => {
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

const chartCollapsed = (props, commonOptions) => {
    const { data, size_by, color_by } = props
    const height = 80 // TODO: dynamic
    let cData = transform(data)

    let options = commonOptions( cData, size_by, color_by)
    options.chart.height = height + 50 // TODO dynamic depending on # of solutions

    options.xAxis.height = 0
    options.xAxis.tickWidth = 0
    options.xAxis.labels = {
        format: ' '
    }
    
    options.yAxis.categories = cData.yAxis.categories
    options.yAxis.ceiling = cData.yAxis.ceiling
    options.yAxis.floor = 0
        options.yAxis.height = height // TODO dynamic depending on # of solutions

    return options
}

export default chartCollapsed
