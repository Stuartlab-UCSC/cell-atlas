
// The gene page presentational component.

import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'

import { integerToCommaInteger } from 'app/util'
import { BubbleTooltip } from 'gene/bubble'
import Table from 'gene/table'
import InputHeader from 'gene/inputHeader'
import LegendColor from 'gene/legendColor'
import LegendSize from 'gene/legendSize'
import MockUp from 'components/MockUp'

const SubmitButton = ({ onClick }) => {
    let comp =
        <Button
            variant='contained'
            component='span'
            size='small'
            color='primary'
            style={{width: '5rem'}}
            onClick={onClick}
        >
            Find
        </Button>
    return comp
}

const MatchesFound = ({ data, showChart }) => {
    let comp = null
    if (showChart) {
        const style = { marginLeft: '1rem' }
        comp =
            <Typography variant='body2' inline={true} style={style}>
                {integerToCommaInteger(data.cluster_solutions.length)
                    + ' matches found'}
            </Typography>
    }
    return comp
}

const SubHeader = (props) => {
    const { data, showChart, onSubmitClick} = props.props
    console.log('showChart:', showChart)
    let comp =
        <Grid container spacing={16} style={{marginTop: '-2.5rem'}}>
            <Grid item xs={4} style={{marginTop: '2rem', zIndex: 100}} >
                <SubmitButton
                    onClick={onSubmitClick}
                />
                <MatchesFound data={data} showChart={showChart} />
            </Grid>
            <Grid item xs={3} >
                <LegendColor />
            </Grid>
            <Grid item xs={2} >
                <LegendSize />
            </Grid>
            <Grid item xs={3} />
        </Grid>
    return comp
}

const Body = (props) => {
    // Render a message, or render the chart.
    const { message, showChart } = props.props
    let comp
    if (showChart) {
        comp =
            <div style={{marginTop: '-4rem'}} >
                <Table />
            </div>
    } else {
        comp =
            <Typography variant='subtitle2' style={{marginTop: '1rem'}}>
                {message}
            </Typography>
    }
    return comp
}

const Presentation = (props) => {
    return (
        <div>
            <div style={{marginTop: '0.5rem'}}>
                <InputHeader />
                <SubHeader props={props} />
                <Body props={props} />
                <BubbleTooltip data={props.bubbleTooltip}/>
            </div>
            <MockUp />
        </div>
    )
}

export default Presentation
