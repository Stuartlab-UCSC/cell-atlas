
// Navigation bar logic.

import connect from "react-redux/es/connect/connect";
import NavBarPres from 'app/NavBarPres'

const mapStateToProps = state => {
    return {
        theme: state['navBar.theme']
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onThemeClick: ev => {
            dispatch({ type: 'navBar.theme.toggle' })
         },
    }
}

const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBarPres)

export default NavBar
