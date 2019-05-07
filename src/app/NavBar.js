
// Navigation bar logic.

import connect from "react-redux/es/connect/connect";
import NavBarPres from 'app/NavBarPres'

const mapStateToProps = state => {
    const dataUrl = process.env.REACT_APP_DATA_URL
    return {
        active: state.app.navBarActive,
        apiUrl: dataUrl,
        loginUrl: dataUrl + '/user/sign-in',
        logoutUrl: dataUrl + '/user/sign-out',
        user: state.auth.user,
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
