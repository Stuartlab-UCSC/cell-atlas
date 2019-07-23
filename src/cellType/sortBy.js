
const sortClusters = (data) => {
    // Within this solution sort the clusters by cluster name.
    data.sort((a, b) => {
        return a.name - b.name
        }
    )
    return data
}

const sortSolutions = (solutions) => {
    // Sort the rows putting
    // the best similarity for the 1st cluster as 1st row,
    // the best similarity for the 2nd cluster as 2nd row,
    // the best similarity for the 3rd cluster as 3rd row, ...
    
    let newSolns = []
    // Track the compared_to_clusters already assigned to a row in the new order
    let ccAssigned = []
    // Loop through one column at a time.
    for (let i = 0; i < solutions[0].clusters.length; i++) {
    
        // Find & sort the values for this column.
        let vals = solutions.map(row => {
            return row.clusters[i].color
        })
        vals.sort()
        vals.reverse()
        
        // Loop through the sorted values finding the highest value whose
        // compared_to_cluster has not yet been assigned.
        for (let j = 0; j < vals.length; j++) {
            const found = solutions.find(row => {
                return (row.clusters[i].color === vals[j] &&
                    !ccAssigned.includes(row.compared_to_cluster))
            })
            if (found) {
                newSolns.push(found)
                ccAssigned.push(newSolns[i].compared_to_cluster)
                break
            }
        }
    }
    return newSolns
}

const sortBy = (solutions) => {
    solutions.forEach((solution, i) => {
        // Sort the clusters within this solution by cluster name.
        solutions[i].clusters = sortClusters(solution.clusters)
    })
    // Sort the solutions.
    const newSolns =  sortSolutions(solutions)
    return newSolns
}

export default sortBy
