// Auth is invoked by the auth server.

import React from 'react'
import { Redirect } from 'react-router-dom'
import { get as rxGet, set as rxSet } from 'state/rx'

const resetOnLogout = () => {
    // There is probably a better place to do this, but for now
    // reset some user data when she logs out.
    rxSet('cellTypeWork.sheetList.userChange')
    rxSet('cellTypeWork.sheetSelected.userChange')
}

const checkUrlSearch = () => {
    let parms = new URLSearchParams(window.location.search)
    if (parms.toString()) {
        const u = parms.get('u')
        if (u) {
            if (u === 'check-email') {
                rxSet('auth.checkEmail.now')
            } else if (u === 'logout') {
                rxSet('auth.user.logout')
                resetOnLogout()
            } else { // a login
                rxSet('auth.user.login', {
                    username: u,
                    roles: parms.get('r'),
                })
            }
        }
    }
}

const Auth = () => {
    checkUrlSearch()
    console.log('Auth: auth.redirectPage:', rxGet('auth.redirectPage'))
    return (
        <Redirect to={rxGet('auth.redirectPage')} />
    )
}
export default Auth
