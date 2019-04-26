
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
            'prototypes',
        ]
        this.state=(this.closeAllLists({}))
        this.state.active = window.location.pathname
        this.height = '2.5rem'
        this.itemStyle = {
            textTransform: 'none',
            fontWeight: 400,
            height: this.height,
        }
    }
    setStyles () {
        this.barItemStyle = {
            ...this.itemStyle,
            color: altForeground,
        }
        this.barItemActiveStyle = {
            ...this.itemStyle,
            color: altForeground,
            backgroundColor: background,
        }
        this.listItemStyle = {
            ...this.barItemStyle,
            fontSize: '0.8rem',
            height: '1.5rem',
        }
    }

    findStyle = (link) => {
        return (this.state.active === link)
            ? this.barItemActiveStyle : this.barItemStyle
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
        const newOpen = {open: openState}
        return newOpen
    }

    onAnyClick = (ev) => {
        // Executed upon a click to close any open menu lists for clicks
        // anywhere except the active menu list head.

         // Close all menu lists.
         // It is easier to close them all than to find the one that is open.
        this.setState(this.closeAllLists({...this.state.open}))
        setTimeout(() => {
            this.setState({ active: window.location.pathname })

        },10)
    }
    
    onToggleGroupChange = (ev, value) => {
        // Executed upon click of an item at the highest level.
        this.setState({ active: value })
    }

    externalLinkItem = (text, link) => {
        // An external link on the navigation bar.
        let comp =
            <ToggleButton
                href={link}
                style={this.findStyle(link)}
                value={link}
            >
                {text}
            </ToggleButton>
        return comp
    }

    linkItem = (text, link) => {

        // An internal link on the navigation bar.
        let comp =
            <ToggleButton
                component={Link}
                to={link}
                style={this.findStyle(link)}
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
                style={this.listItemStyle}
            >
                {text}
            </MenuItem>
        return comp
    }

    prototypes = () => {
        // The cell type menu.
        const list =
            <MenuList>
                {this.listItem('Cell Type Determination', '/prototypes/determ')}
                {this.listItem('Cell Type Psychic', '/prototypes/cellType')}
            </MenuList>
        const comp =
            <React.Fragment>
                <NavBarList id='prototypes' label='Prototypes' list={list}
                    open={this.state.open}
                    active={this.state.active}
                    onAnyClick={this.onAnyClick}
                />
            </React.Fragment>

        return comp
    }

    render() {
        this.setStyles()
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
                        UCSC Cell Atlas
                        {this.logo()}
                    </ToggleButton>
                    {this.linkItem('Gene', '/gene')}
                    {this.linkItem('Datasets', '/dataset')}
                    {this.linkItem('SQL Query', '/sql-query')}
                    {this.linkItem('Pipeline', '/pipeline')}
                    {this.linkItem('Data Model', '/data-model')}
                    {this.prototypes()}
                    {this.externalLinkItem('API', this.props.apiUrl)}
                </ToggleButtonGroup>
            </div>
        )
    }
}

export default NavBarPres
