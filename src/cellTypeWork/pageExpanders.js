// Cell type worksheet page expandables.

import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { ExpandMore } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'

import ScatterPlot from 'cellTypeScatter/scatter'
import GeneTable from 'cellTypeGene/table'

const PageExpanders = (props) => {
    const { geneOrClusters, geneTableExpanded, scatterExpanded, show,
        onGeneTableExpandChange, onScatterExpandChange } = props
    if (!show) {
        return (null)
    }
    return (
        <div>
            <ExpansionPanel
                expanded={scatterExpanded}
                onChange={onScatterExpandChange}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography>
                        Map of {geneOrClusters}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ScatterPlot />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={geneTableExpanded}
                onChange={onGeneTableExpandChange}
            >
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Typography>
                        Gene Table
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <GeneTable />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default PageExpanders
