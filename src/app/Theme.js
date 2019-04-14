import React, {Component} from "react"
import {connect} from "react-redux";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { themeData } from 'app/themeData'
import { get as rxGet } from 'state/rx'

class ThemePres extends Component {

    render() {
        let theme = rxGet('app.navBarTheme')
        return (
            <MuiThemeProvider theme={createMuiTheme(themeData(theme))}>
                <div>
                    { this.props.children }
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.app.navBarTheme,
    }
}

const Theme= connect(
    mapStateToProps
)(ThemePres)

export default Theme
