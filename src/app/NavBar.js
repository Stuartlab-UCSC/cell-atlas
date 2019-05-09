
// Navigation bar logic.

import connect from "react-redux/es/connect/connect";
import NavBarPres from 'app/NavBarPres'

const mapStateToProps = state => {
    const authUrl = process.env.REACT_APP_AUTH_URL
    return {
        active: state.app.navBarActive, // the highlighted option
        adminUrl: authUrl + '/admin',
        apiUrl: process.env.REACT_APP_DATA_URL,
        changePasswordUrl: authUrl + '/user/change-password',
        loginUrl: authUrl + '/user/sign-in',
        logoutUrl: authUrl + '/user/sign-out',
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
        onTopLevelClick: (value) => {
            if (value === 'auth') {
                dispatch({
                    type: 'auth.redirectPage.set',
                    value: window.location.pathname,
                })
           }
            
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
