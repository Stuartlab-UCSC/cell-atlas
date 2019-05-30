
// WORK IN PROGRESS
// The bubble matrix logic. Prepares data for rendering in an svg matrix, with
// a tooltip containing title, size variable & value, color variable & value.

import React from 'react'

import { get as rxGet } from 'state/rx'
import Bubble from 'bubble/bubble'
import { colorRef as defaultColorRef, izeRef as defaultSizeRef, sizeToRadius }
    from 'bubble/util'
import { getRangeColor } from 'color/range'

const matrixTransform = (id, data, colorRef, sizeRef, state) => {
    // Transform the data received from the server
    // into the structure needed for the svg matrix.
    colorRef = colorRef || defaultColorRef
    sizeRef = sizeRef || defaultSizeRef
    const color = state ? state[id].colorRange : rxGet(id + '.colorRange')
    let maxClusterCount = 0
    // Outer loop handles each cluster solution.
    const solutions = (id === 'cellType')
        ? data.cluster_similarities
        : data.cluster_solutions
    let clusterHeads = []
    let cData = solutions.map((soln, i) => {
        // Inner loop handles each cluster in the solution.
        let row = [
            soln.dataset.name,
            soln.cluster_solution_name,
            soln.dataset.species,
            soln.dataset.organ,
            soln.dataset.study,
        ]
        if ((id === 'cellType')) {
            row.splice(1, 0, soln.compared_to_cluster)
        }
        const bub = state? state[id].bubbleRange : rxGet(id + '.bubbleRange')
        soln.clusters.forEach((c, j) => {
            // Save the cluster header labels
            if (i === 0) {
                clusterHeads.push(c.name)
            }
            const radius = sizeToRadius(c.size, bub.min, bub.max)
                
            row.push(
                <Bubble
                    cellCount={c.cellCount}
                    color={c.color}
                    colorBy={colorRef[data.colorBy].label}
                    colorRgb={getRangeColor(c.color, color.min, color.max)}
                    name={c.name}
                    radius={radius}
                    size={c.size}
                    sizeBy={sizeRef[data.sizeBy].label}
                />
            )
            maxClusterCount = Math.max(j + 1, maxClusterCount)
        })
        return row
    })
    return { data: cData, maxClusterCount, clusterHeads }
}

export { matrixTransform }
