
// Navigation bar presentation.

import React from 'react'
import { Link }  from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Settings from 'images/settings.svg'
import appLogo from 'app/images/logo.svg'
import NavBarList from 'app/NavBarList'

class NavBarPres extends React.Component {

    constructor (props) {
        super(props)
        this.listHeads = [
            'analyze',
            'explore',
            'settings',
        ]
        this.state=(this.closeAllLists({}))
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

    closeAllLists = (openState) => {
        this.listHeads.forEach(head => {
            openState[head] = false
        })
        return {open: openState}
    }

    onAnyClick = (ev) => {

         // Close all menu lists.
         // It is easier to close them all than to find the one that is open.
        this.setState(this.closeAllLists({...this.state.open}))
    }

    onThemeClick = () => {
        this.props.onThemeClick()
        this.onAnyClick()
    }

    externalLinkItem = (text, url) => {

        // An option pointing to an external link on the navigation bar.
        let comp =
            <ToggleButton
                href={url}
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

    linkItem = (text, link) => {

        // An option pointing to an internal link on the navigation bar.
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

    listItem = (text, to) => {

        // A menu item within a list.
        let comp =
            <MenuItem
                component={Link}
                to={to}
                onClick={this.onAnyClick}
            >
                {text}
            </MenuItem>
        return comp
    }

    analyze = () => {

        // The analyze menu.
        const list =
            <MenuList>
                {this.listItem('Trajectory Similarity', '/analyze/trajSim')}
                {this.listItem('Molecular Similarity', '/analyze/moleSim')}
                {this.listItem('Cell Type Psychic', '/analyze/typePsych')}
            </MenuList>
        const comp =
            <React.Fragment>
                <NavBarList id='analyze' label='Analyze' list={list}
                    open={this.state.open}
                    onAnyClick={this.onAnyClick}
                />
            </React.Fragment>

        return comp
    }

    explore = () => {

        // The explore menu.
        const list =
            <MenuList>
                {this.listItem('SQL Query', '/explore/database')}
            </MenuList>
        const comp =
            <React.Fragment>
                <NavBarList id='explore' label='Explore' list={list}
                    open={this.state.open}
                    onAnyClick={this.onAnyClick}
                />

            </React.Fragment>

        return comp
        /*
                {this.listItem('Datasets', '/explore/dataset')}
                {this.listItem('Search', '/explore/search')}
                {this.listItem('Trajectories', '/explore/traj')}
        */
    }

    settings = () => {

        // The settings menu.
        const theme = (this.props.theme === 'light') ?
            'Dark Theme' : 'Light Theme'
        const list =
            <MenuList>
                <MenuItem
                    onClick={this.onThemeClick}
                >
                    {theme}
                </MenuItem>
            </MenuList>
        const icon = <img src={Settings} alt='settings' />
        const comp =
            <React.Fragment>
                <NavBarList id='settings' label={icon} list={list}
                    open={this.state.open}
                    onAnyClick={this.onAnyClick}
                />

            </React.Fragment>
        return comp
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    zIndex: '3000',
                    position: 'fixed',
                    borderBottom: '1px solid #808080',
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
                        Stuart Cell Atlas
                        {this.logo()}
                    </ToggleButton>
                    {this.linkItem('Datasets', '/dataset')}
                    {this.linkItem('Trajectory', '/traj')}
                    {this.linkItem('SQL Query', '/sql-query')}
                    {this.linkItem('Data Model', '/data-model')}
                    {this.externalLinkItem('API', this.props.apiUrl)}
                    {this.settings()}
                </ToggleButtonGroup>
            </div>
        )
        /*
                    {this.explore()}
                    {this.linkItem('Upload', '/upload')}
                    {this.analyze()}
                    {this.linkItem('Results', '/result')}
                    {this.linkItem('Help', '/help')}
                    {this.settings()}
                    {this.linkItem('NOTE: UNDER DEVELOPMENT', '/')}
        */
    }
}

export default NavBarPres
