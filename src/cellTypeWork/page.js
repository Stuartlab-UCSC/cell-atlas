// Cell type worksheet page logic.

import { connect } from 'react-redux'
import React from 'react';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'

import BubbleTooltip from 'bubble/tooltip'
import Worksheet from 'cellTypeWork/worksheet'
import SheetName from 'cellTypeSheet/sheetName'
import CtwMenu from 'cellTypeWork/ctwMenu'
import ScatterPlot from 'cellTypeScatter/scatter'
import SheetList from 'cellTypeSheet/sheetList'
import GeneTable from 'cellTypeGene/ctgMain'
import Upload from 'cellTypeSheet/sheetUpload'

const Header = ({props}) => {
    const { onMenuClick, onSheetInfoClick } = props
    return (
        <React.Fragment>
            <CtwMenu />
            <IconButton
                style={{marginTop: -2, marginLeft: -50}}
                onClick={onMenuClick}
            >
                <MenuIcon color='primary' style={{height: 36, width: 36}}/>
            </IconButton>
            <IconButton style={{marginTop: 10}} onClick={onSheetInfoClick} >
                <InfoIcon color='primary' />
            </IconButton>
            <div style={{
                width: 400,
                marginBottom: '1rem',
                display: 'inline-block'
            }} >
                <SheetList />
            </div>
            <SheetName />
        </React.Fragment>
    )
}

const Presentation = (props) => {
    const { bubbleTooltip } = props
    const gridStyle = {
        marginTop: -10,
        marginLeft: 0,
        width: '100%'
    }
    return (
        <div style={{marginTop: -30}}>
            <Header props={props} />
            <div style={gridStyle}>
                <Grid container spacing={8} style={{background: 'transparent'}}>
                    <Grid item xs={5}>
                        <ScatterPlot />
                    </Grid>
                    <Grid item xs={7}>
                        <Worksheet />
                    </Grid>

                    <Grid item xs={12}>
                        <GeneTable/>
                    </Grid>
            
                </Grid>
            </div>
            <BubbleTooltip data={bubbleTooltip} id='cellTypeWork' />
            <Upload />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        bubbleTooltip: state.bubble.tooltip,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMenuClick: ev => {
            dispatch({ type: 'cellTypeWork.menu.show' })
        },
        onSheetInfoClick: ev => {
            console.log('onSheetInfoClick')
            dispatch({ type: 'cellTypeWork.sheetInfo.open' })
        },
    }
}

const Page = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Page
