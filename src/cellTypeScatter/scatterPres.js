
import React from 'react'
import Typography from '@material-ui/core/Typography'

const ScatterPlotPres = ({ fetchMessage, plot }) => {
    if (fetchMessage) {
        return (
            <Typography style={{marginTop: 40}}>
                {fetchMessage}
            </Typography>
        )
    }
    return (
        <img
            src={plot}
            alt='scatterPlot'
            height={400}
            style={{zIndex:-1}}
        />
    )
}

export default ScatterPlotPres
