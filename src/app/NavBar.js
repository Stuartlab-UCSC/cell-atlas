
import React from 'react'
import { Link }  from 'react-router-dom'

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ToggleButton, { ToggleButtonGroup } from '@material-ui/lab/ToggleButton';

import Settings from 'images/settings.svg'
import appLogo from 'app/images/logo.svg'
import 'app/App.css'

class NavBar extends React.Component {

    constructor (props) {
        super(props)

        // The list heads.
        this.listHeads = [
            'analyze',
            'explore',
        ]

        // Set the open state for each list head and initialize the anchorEls.
        this.anchorEl = {}
        let openState = {}
        this.listHeads.forEach(head => {
            openState[head] = false
            this.anchorEl[head] = null
        })
        this.state = { open: openState }

        this.color = 'rgba(127,127,127,1)'
    }

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
            />
        return comp
    }

     onListHeadClick = ev => {

        // Handle a click on a menu option that has a list of options.
        // Open the menu.
        const id = ev.target.closest('.listHead').dataset.id
        let openState = {...this.state.open}
        openState[id] = true
        this.setState({ open: openState })
    }

    closeLists = (ev) => {

         // Close all menu lists.
         // It is easier to close them all than to find the one that is open.
        let openState = {...this.state.open}
        this.listHeads.forEach(head => {
            openState[head] = false
        })
        this.setState({ open: openState })
    }

    menuList = ( id, label, list ) => {

        // A list of options for a menu item.
        const open = this.state.open[id]
        const menuGrow = id + 'MenuGrow'
        let comp =
            <React.Fragment>
                <ToggleButton
                    className='listHead'
                    data-id={id}
                    buttonRef={node => {
                        this.anchorEl[id] = node;
                    }}
                    aria-owns={open ? menuGrow : null}
                    aria-haspopup="true"
                    style={{
                        textTransform: 'none',
                        color: this.color,
                        height: '40px',
                        fontWeight: 400,
                    }}
                    value=''
                    onClick={this.onListHeadClick}
                >
                    {label}
                </ToggleButton>
                <Popper
                    open={open}
                    anchorEl={this.anchorEl[id]}
                    transition
                    disablePortal
                    placement='bottom-start'
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id={menuGrow}
                            className={'listBody'}
                            data-id={id}
                            style={{ transformOrigin: 'top' }}
                        >
                            <Paper style={{ backgroundColor: this.color }}>
                                <ClickAwayListener
                                    onClickAway={this.closeLists}
                                >
                                    {list}
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>

        return comp
    }

    barItem = (text, link) => {

        // A simple option on the navigation bar.
        let comp =
            <ToggleButton
                component={Link}
                to={link}
                style={{
                    textTransform: 'none',
                    color: this.color,
                    fontWeight: 400,
                }}
                value=''
            >
                {text}
            </ToggleButton>
        return comp
    }

    barIcon = (icon, link) => {

        // A simple option on the navigation bar.
        let comp =
            <ToggleButton
                component={Link}
                to={link}
                value=''
             >
                 <img src={icon} alt='icon' />
            </ToggleButton>
        return comp
    }

    menuItem = (text, to) => {

        // A menu item within a list.
        let comp =
            <MenuItem
                component={Link}
                to={to}
                onClick={this.closeLists}
            >
                {text}
            </MenuItem>
        return comp
    }

    analyze = () => {

        // The analyze menu.
        const list =
            <MenuList>
                {this.menuItem('Trajectory Similarity', '/analyze/trajSim')}
                {this.menuItem('Molecular Similarity', '/analyze/moleSim')}
                {this.menuItem('Cell Type Psychic', '/analyze/typePsych')}
            </MenuList>
        const comp =
            <React.Fragment>
                {this.menuList( 'analyze', 'Analyze', list)}
            </React.Fragment>

        return comp
    }

    explore = () => {

        // The explore menu.
        const list =
            <MenuList>
                {this.menuItem('Search', '/explore/search')}
                {this.menuItem('Trajectories', '/explore/traj')}
                {this.menuItem('Datasets', '/explore/dataset')}
            </MenuList>
        const comp =
            <React.Fragment>
                {this.menuList( 'explore', 'Explore', list)}
            </React.Fragment>

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
                    {this.explore()}
                    {this.barItem('Upload', '/upload')}
                    {this.analyze()}
                    {this.barItem('Results', '/result')}
                    {this.barItem('Help', '/help')}
                    {this.barItem('NOTE: UNDER DEVELOPMENT', '/')}
                    {this.barIcon(Settings, '/')}
                </ToggleButtonGroup>
                <hr style={{ marginTop: '0' }} />
            </div>
        )
    }
}
export default NavBar
