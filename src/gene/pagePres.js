
// The gene page presentational component.

import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'

import { integerToCommaInteger } from 'app/util'
import { ColorColumnTooltip } from 'bubble/colorColumn'
import BubbleTooltip from 'bubble/tooltip'
import Table from 'gene/table'
import InputHeader from 'gene/inputHeader'
import Legend from 'components/legend'

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

const SameValueMessage = ({ name, same }) => {
    let comp = null
    // If this name is in the sameValueColumn list
    if (same[name]) {
        const labels = {
            datasetName: 'dataset',
            cluster_solution_name: 'cluster solution',
            species: 'species',
            organ: 'organ',
            study: 'study',
        }
        // Columns that should be in italics.
        const italics = ['study']
        if (italics.includes(name)) {
            comp =
                <Typography>
                    {labels[name]}: <b><i>{same[name]}</i></b>
                </Typography>
        } else {
            comp =
                <Typography>
                    {labels[name]}: <b>{same[name]}</b>
                </Typography>
        }
    }
    return comp
}

const SameValueMessages = ({ props }) => {
    let comp = null
    const { catAttrs, sameValueColumns, showChart } = props
    if (showChart && Object.keys(sameValueColumns).length > 0) {
        // Build a message for each column.
        let items = []
        catAttrs.forEach((attr, i) => {
            items.push(
                <SameValueMessage
                    name={attr}
                    same={sameValueColumns}
                    key={i}
                />
            )
        })
        comp =
            <div style={{ marginTop: '1rem' }} >
                {items}
            </div>
    }
    return comp
}

const SubHeader = ({ props }) => {
    const { bubbleRange, colorRange, data, onFindClick, showChart } = props
    let comp =
        <Grid container spacing={16} style={{marginTop: '-2.5rem'}}>
            <Grid item xs={4} style={{marginTop: '2rem', zIndex: 100}} >
                <SubmitButton
                    onClick={onFindClick}
                />
                <MatchesFound data={data} showChart={showChart} />
                <SameValueMessages props={props} />
            </Grid>
            <Grid item xs={3} >
                <Legend
                    flavor='colorBubble'
                    min={colorRange.min}
                    max={colorRange.max}
                />
            </Grid>
            <Grid item xs={2} >
                <Legend
                    flavor='sizeBubble'
                    min={bubbleRange.min}
                    max={bubbleRange.max}
                />
            </Grid>
            <Grid item xs={3} />
        </Grid>
    return comp
}

const Body = (props) => {
    // Render a message, or render the chart, or render nothing.
    const { message, showChart } = props.props
    let comp = null
    if (showChart) {
        comp =
            <div style={{marginTop: '-4rem'}} >
                <Table />
            </div>
    } else if (message){
        comp =
            <Typography variant='subtitle2' style={{marginTop: '1rem'}}>
                {message}
            </Typography>
    }
    return comp
}

const PageTitle = () => {
    const comp =
        <Typography variant='h6' >
            Gene search in EBI dataset clusters
        </Typography>
    return comp
}

const Presentation = (props) => {
    const { onFindClick } = props
    return (
        <div id='homePage'>
            <iframe
                id='geneDummyIframe'
                width='0'
                height='0'
                name='geneDummyIframe'
                title='geneDummyIframe'
                style={{borderWidth: '0'}}
            />
            <form
                target='geneDummyIframe'
                onSubmit={onFindClick}
            >
                <PageTitle />
                <InputHeader />
                <SubHeader props={props} />
                <Body props={props} />
                <ColorColumnTooltip data={props.colorColumnTooltip}/>
                <BubbleTooltip data={props.bubbleTooltip}/>
            </form>
        </div>
    )
}

export default Presentation
