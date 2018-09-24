
import React from 'react'
import { Link }  from 'react-router-dom'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ToggleButton, { ToggleButtonGroup } from '@material-ui/lab/ToggleButton';

import appLogo from 'app/images/logo.svg'
import 'app/App.css'

class NavBar extends React.Component {
    state = {
        analyzeOpen: false,
    }
    anchorEl = null
    color = 'rgba(0, 0, 0, 0.87)'

    logo = () => {
        let comp =
            <img
                src={appLogo}
                width='32px'
                alt='logo'
                style={{
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                }}
            ></img>
        return comp
    }

    onAnalyzeClick = ev => {
        this.setState(state => ({ analyzeOpen: !state.analyzeOpen }));
    }
    
    onAnalyzeClose = () => {
        this.setState({ analyzeOpen: false })
    }
    
    menuItem = (text, to) => {
        let comp =
            <MenuItem
                component={Link}
                to={to}
                onClick={this.onAnalyzeClose}
            >
                {text}
            </MenuItem>
        return comp
    }

    analyze = (text) => {
        const { analyzeOpen } = this.state;
        let comp =
            <React.Fragment>
                <ToggleButton
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={analyzeOpen ? 'analyzeMenuGrow' : null}
                    aria-haspopup="true"
                     style={{
                        textTransform: 'none',
                        color: this.color,
                        height: '40px',
                    }}
                    value=''
                    onClick={this.onAnalyzeClick}
                >
                    Analyze
                </ToggleButton>
                <Popper
                    open={analyzeOpen}
                    anchorEl={this.anchorEl}
                    transition
                    disablePortal
                    placement='bottom-start'
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id='analyzeMenuGrow'
                            style={{ transformOrigin: 'top' }}
                        >
                            <Paper style={{ backgroundColor: 'white' }}>
                                <ClickAwayListener
                                    onClickAway={this.onAnalyzeClose}
                                >
                                    <MenuList>
                                        {this.menuItem('Trajectory Similarity',
                                            '/analyze/trajSim')}
                                        {this.menuItem('Molecular Similarity',
                                            '/analyze/moleSim')}
                                        {this.menuItem('Cell Type Psychic',
                                            '/analyze/typePsych')}
                                     </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>

        return comp
    }

    barItem = (text, link) => {
        let comp =
            <ToggleButton
                component={Link}
                to={link}
                style={{
                    textTransform: 'none',
                    color: this.color,
                }}
                value=''
            >
                {text}
            </ToggleButton>
        return comp
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    zIndex: '3000',
                    position: 'fixed'
                }}
            >
                <ToggleButtonGroup exclusive
                >
                    <ToggleButton
                        component={Link}
                        to='/'
                        value=''
                        style={{color: this.color}}
                    >
                        Cell Atlas
                        {this.logo()}
                    </ToggleButton>
                    {this.barItem('Upload', '/upload')}
                    {this.analyze()}
                    {this.barItem('Results', '/result')}
                    {this.barItem('Help', '/help')}
                </ToggleButtonGroup>
                <hr style={{ marginTop: '0' }} />
            </div>
        )
    }
}
export default NavBar
