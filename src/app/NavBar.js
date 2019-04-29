
// Navigation bar logic.

import connect from "react-redux/es/connect/connect";
import NavBarPres from 'app/NavBarPres'

const mapStateToProps = state => {
    return {
        active: state.app.navBarActive,
        apiUrl: process.env.REACT_APP_DATA_URL,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAnyClick: (ev) => {
            // Allow window location pathname to change.
            setTimeout(() => {
                dispatch({ type: 'app.navBarActive.anyClick' })},
            0)
        },
        onTopLevelClick: (ev) => {
            // Allow window location pathname to change.
            setTimeout(() => {
                dispatch({ type: 'app.navBarActive.topLevelClick' })},
            0)
        },
        
    }
}

const NavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBarPres)

export default NavBar
