// Cell type worksheet page logic.

import { connect } from 'react-redux'
import React from 'react';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import MenuIcon from '@material-ui/icons/Menu'

import BubbleTooltip from 'bubble/tooltip'
import Worksheet from 'cellTypeWork/worksheet'
import CtwTopDrawer from 'cellTypeWork/ctwTopDrawer'
import CtwMenu from 'cellTypeWork/ctwMenu'
import ScatterPlot from 'cellTypeScatter/scatter'
import GeneTable from 'cellTypeGene/ctgMain'

const DrawerIcons = ({props}) => {
    const { worksheet, onMenuClick, onTopDrawerClick } = props
    const menuIconStyle = {
        marginTop: -32,
        marginLeft: -50,
    }
    const topDrawerIconStyle = {
        ...menuIconStyle,
        marginLeft: 50,
        fontSize: '1.1rem',
        color: 'black',
        zIndex: 1,
    }
    return (
        <React.Fragment>
            <CtwMenu />
            <IconButton
                style={menuIconStyle}
                onClick={onMenuClick}
            >
                <MenuIcon color='primary' style={{height: 36, width: 36}}/>
            </IconButton>

            <CtwTopDrawer />
            <IconButton
                style={topDrawerIconStyle}
                onClick={onTopDrawerClick}
            >
                <KeyboardArrowDownIcon color='primary' />
                {worksheet}
            </IconButton>
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
        <div>
            <DrawerIcons props={props} />
            <div style={gridStyle}>
                <Grid container spacing={8} style={{background: 'transparent'}}>
            
                    <Grid item xs={12}>
                        <CtwTopDrawer />
                    </Grid>
            
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        bubbleTooltip: state.bubble.tooltip,
        worksheet: state.cellTypeSheet.selected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMenuClick: ev => {
            dispatch({ type: 'cellTypeWork.menu.show' })
        },
        onTopDrawerClick: ev => {
            dispatch({ type: 'cellTypeWork.topDrawer.open' })
        },
    }
}

const Page = connect(
    mapStateToProps, mapDispatchToProps
)(Presentation)

export default Page
