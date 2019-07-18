// Auth is invoked by the auth server.

import React from 'react'
import { Redirect } from 'react-router-dom'
import { get as rxGet, set as rxSet } from 'state/rx'

const checkUrlSearch = () => {
    let parms = new URLSearchParams(window.location.search)
    if (parms.toString()) {
        const u = parms.get('u')
        if (u) {
            if (u !== 'logout') {
                rxSet('auth.user.login', {
                    username: u,
                    roles: parms.get('r'),
                })
            } else {
                rxSet('auth.user.logout')
            }
        }
    }
    return '/'
}

const Auth = () => {
    checkUrlSearch()
    console.log('Auth redirectPage:', rxGet('auth.redirectPage'))
    return (
        <Redirect to={rxGet('auth.redirectPage')} />
    )
}
export default Auth
