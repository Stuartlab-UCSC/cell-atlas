
// The expanded gene chart information.

import { getColor } from 'gene/reference'

const transform = (data) => {
    // Transform the data received from the server
    // into the structure wanted by this chart library.
    let clusters = []
    const clusterData = data.map((cluster, seq) => {
        // Save the cluster name to label the axis.
        clusters.push(cluster.name)
        // Save the sequence number and size as (x,y=0,z)
        return {
            x: seq,
            y: 0,
                z: cluster.size,
                color: getColor(cluster.color),
                cell_count: cluster.cell_count,
                clusterColor: cluster.color,
                clusterName: cluster.name,
        }
    })
    let cData = {}
    cData.series = [{}]
        cData.series[0].data = clusterData

    cData.xAxis = { categories: clusters }
    return cData
}
const chartExpanded = (props, commonOptions) => {
    // Expanded view.
    const { data, size_by, color_by } = props
    const { dataset_name, cluster_solution_name, i } = props
    let cData = transform(data[i].clusters)
    let options = commonOptions( cData, size_by, color_by)
    
    options.chart.height = 200

    options.xAxis.categories = cData.xAxis.categories
    options.xAxis.height = 100
    options.xAxis.offset = -40
    options.xAxis.opposite = true
    options.xAxis.title = {
        text: dataset_name + ', ' + cluster_solution_name
    }

    options.yAxis.height = 100
    options.yAxis.labels = {
        format: ' '
    }

    return options
}

export default chartExpanded
