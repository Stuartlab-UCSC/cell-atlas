
// Navigation bar presentation.

import React from 'react'
import { Link }  from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import appLogo from 'app/images/logo.svg'
import NavBarList from 'app/NavBarList'
import { altBackground, altForeground, background } from 'app/themeData'

class NavBarPres extends React.Component {

    constructor (props) {
        super(props)
        this.listHeads = [
            'cellType',
            'analyze',
            'explore',
            'settings',
        ]
        this.state=(this.closeAllLists({}))
        this.state.active = window.location.pathname
        this.color = 'rgba(127,127,127,1)'
        this.height = '2.5rem'
        this.itemStyle = {
            textTransform: 'none',
            fontWeight: 400,
            height: this.height,
        }
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
        //this.setState({ active: window.location.pathname })
    }

    onThemeClick = () => {
        this.props.onThemeClick()
        this.onAnyClick()
    }
    
    onToggleGroupChange = (ev, value) => {
        this.setState({ active: value })
    }

    externalLinkItem = (text, link) => {
        // An external link on the navigation bar.
        let style = (this.state.active === link)
            ? this.barItemActiveStyle : this.barItemStyle
        let comp =
            <ToggleButton
                href={link}
                style={style}
                value={link}
            >
                {text}
            </ToggleButton>
        return comp
    }

    linkItem = (text, link) => {

        // An internal link on the navigation bar.
        let style = (this.state.active === link)
            ? this.barItemActiveStyle : this.barItemStyle
        let comp =
            <ToggleButton
                component={Link}
                to={link}
                style={style}
                value={link}
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

    cellType = () => {

        // The Reference menu.
        const list =
            <MenuList>
                {this.listItem('Determination Plot', '/cell-type/determ')}
                {this.listItem('Cell Type Psychic', '/cell-type/psych')}
            </MenuList>
        const comp =
            <React.Fragment>
                <NavBarList id='cellType' label='Cell Type' list={list}
                    open={this.state.open}
                    onAnyClick={this.onAnyClick}
                />
            </React.Fragment>

        return comp
    }

    cellType = () => {

        // The cell type menu.
        const list =
            <MenuList>
                {this.listItem('Determination Plot', '/cell-type/determ')}
                {this.listItem('Cell Type Psychic', '/cell-type/psych')}
            </MenuList>
        const comp =
            <React.Fragment>
                <NavBarList id='cellType' label='Cell Type' list={list}
                    open={this.state.open}
                    onAnyClick={this.onAnyClick}
                />
            </React.Fragment>

        return comp
    }

    render() {
        this.barItemStyle = {
            ...this.itemStyle,
            color: altForeground,
        }
        this.barItemActiveStyle = {
            ...this.itemStyle,
            color: altForeground,
            backgroundColor: background,
        }
        return (
            <div
                style={{
                    width: '100%',
                    height: this.height,
                    zIndex: '3000',
                    position: 'fixed',
                    background: altBackground,
                    color: altForeground,
                }}
            >
                <ToggleButtonGroup exclusive
                    onChange={this.onToggleGroupChange}
                >
                    <ToggleButton
                        component={Link}
                        to='/'
                        value='/'
                        style={{height: this.height, color: altForeground}}
                    >
                        Stuart Cell Atlas
                        {this.logo()}
                    </ToggleButton>
                    {this.linkItem('Cell Type Determination', '/cell-type/determ')}
                    {this.linkItem('Cell Type Psychic', '/cell-type/psych')}
                    {this.linkItem('Gene', '/gene')}
                    {this.linkItem('Datasets', '/dataset')}
                    {this.linkItem('Trajectory', '/traj')}
                    {this.linkItem('SQL Query', '/sql-query')}
                    {this.linkItem('Pipeline', '/pipeline')}
                    {this.linkItem('Data Model', '/data-model')}
                    {this.externalLinkItem('API', this.props.apiUrl)}
                </ToggleButtonGroup>
            </div>
        )
    }
}

export default NavBarPres
