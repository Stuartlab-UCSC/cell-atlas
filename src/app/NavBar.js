
// Navigation bar logic.

import connect from "react-redux/es/connect/connect";
import NavBarPres from 'app/NavBarPres'

const mapStateToProps = state => {
    return {
        theme: state['navBar.theme'],
        apiUrl: process.env.REACT_APP_DATA_URL,
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
