
// The collapsed gene chart information.

import { getColor, colorNegMag, colorPosMag } from 'gene/reference'

const solutionHeight = 120

const transform = (data) => {
    // Transform the data received from the server
    // into the structure wanted by this chart library.
    let cData = {
        series: [{ data: [] }],
        yAxis: { categories: [] },
    }
    // Outer loop handles each cluster solution and
    // finds the y-axis labels for each solution.
    cData.yAxis.categories = data.map((solution, i) => {
        // Inner loop puts the chart body variables into one list for all
        // solutions with objects of {label, size, color}
        cData.series[0].data = cData.series[0].data.concat(
            solution.clusters.map((cluster, j) => {
                return {
                    x: j, // cluster position on x axis
                    y: i, // dataset/cluster_solution position on y axis
                    z: cluster.size,
                    color: getColor(cluster.color, colorNegMag, colorPosMag),
                    cell_count: cluster.cell_count,
                    clusterColor: cluster.color,
                    clusterName: cluster.name,
                }
            })
        )
        cData.yAxis.ceiling = i
        return (
            solution.dataset_name + '<br>' +
            solution.cluster_solution_name)
    })
    return cData
}

const chartCollapsed = (props, commonOptions) => {
    const { data, size_by, color_by } = props
    let cData = transform(data)

    let options = commonOptions( cData, size_by, color_by)
    options.chart.height = solutionHeight * cData.yAxis.ceiling
    options.xAxis.height = 0
    options.xAxis.tickWidth = 0
    options.xAxis.labels = {
        format: ' '
    }
    
    options.yAxis.categories = cData.yAxis.categories
    options.yAxis.ceiling = cData.yAxis.ceiling
    options.yAxis.floor = 0
    options.yAxis.height = solutionHeight
    options.yAxis.reversed = true
    return options
}

export default chartCollapsed
