
// The gene page presentational component.

import React from 'react'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid/Grid'
import Typography from '@material-ui/core/Typography'

import Chart from 'gene/chart'
import InputHeader from 'gene/inputHeader'
import LegendColor from 'gene/legendColor'
import LegendSize from 'gene/legendSize'
import MockUp from 'components/MockUp'


const ExpandedChart = ({ data }) => {
    let comp =
        <React.Fragment>
            {data.cluster_solutions.map((solution, i) =>
                <Grid item xs={12}
                    key={i}
                    style={{
                        marginTop: (i > 0 ? '-8rem' : '1.5rem'),
                        marginBottom: -35 ,
                    }}
                >
                    <Chart
                        expanded={true}
                        data={data.cluster_solutions}
                        size_by={data.size_by}
                        color_by={data.color_by}
                        dataset_name={solution.dataset_name}
                        cluster_solution_name=
                            {solution.cluster_solution_name}
                        i={i}
                    />
                </Grid>
            )}
        </React.Fragment>
    return comp
}

const AChart = ({ data, expanded }) => {
    let comp = null
    if (expanded) {
        comp =
            <Grid item xs={12} style={{marginTop: -40}}>
                <ExpandedChart
                    data={data}
                />
            </Grid>
    } else {
        comp =
            <Grid item xs={12} style={{marginTop: -10}}>
                <Chart
                    data={data.cluster_solutions}
                    size_by={data.size_by}
                    color_by={data.color_by}
                />
            </Grid>
    }
    return comp
}

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

const ExpandButton = ({ expanded, show, onClick }) => {
    let comp = null
    if (show) {
        comp =
            <Button
                variant='contained'
                component='span'
                size='small'
                style={{width: '5rem', marginLeft: '1rem'}}
                onClick={onClick}
            >
                {expanded ? 'Collapse' : 'Expand'}
            </Button>
    }
    return comp
}

const SubHeader = (props) => {
    const { expanded, showChart, onExpandClick, onSubmitClick}
        = props.props
    let comp =
        <Grid container spacing={16} style={{marginTop: '-2.5rem'}}>
            <Grid item xs={4} style={{marginTop: '2rem'}} >
                <SubmitButton
                    onClick={onSubmitClick}
                />
                <ExpandButton
                    expanded={expanded}
                    onClick={onExpandClick}
                    show={showChart}
                />
            </Grid>
            <Grid item xs={4} >
                <LegendSize />
            </Grid>
            <Grid item xs={4} >
                <LegendColor />
            </Grid>
        </Grid>
    return comp
}

const SolutionLabel = ({ expanded, show }) => {
    let comp = null
    if (show) {
        if (expanded) {
            comp =
               <Typography
                    align='center'
                    style={{width: '100%'}}
                >
                    Dataset, Cluster Solution
                </Typography>
        } else {
            comp =
                <Typography>
                    Dataset <br /> Cluster Solution
                </Typography>
        }
    }
    return comp
}

const Body = (props) => {
    // If there is a fetch status message, render it rather than the chart.
    const { data, expanded, message } = props.props
    let comp
    if (message) {
        comp =
            <Typography variant='subtitle2' style={{marginTop: '1rem'}}>
                {message}
            </Typography>
    } else {
        comp =
            <AChart
                data={data}
                expanded={expanded}
            />
    }
    return comp
}

const Presentation = (props) => {
    const { expanded, showChart } = props
    return (
        <div>
            <div style={{marginTop: '0.5rem'}}>
                <InputHeader />
                <SubHeader props={props} />
                <SolutionLabel expanded={expanded} show={showChart}/>
                <Body props={props} />
            </div>
            <MockUp />
        </div>
    )
}

export default Presentation
