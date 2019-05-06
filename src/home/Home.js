// Home page: logic

import { connect } from 'react-redux'
import HomePres from 'home/HomePres'
import { isValidGeneName } from 'components/geneName'
import { onGeneFindClick } from 'gene/page'
import parse from 'home/parseUrlParms'
import { set as rxSet } from 'state/rx'


const checkUrlSearch = (state) => {
    const search = window.location.search
    if (search === state.app.homeUrlSearch) {
        return
    }
    rxSet('app.homeUrlSearch.set', { value: search })
    let parms = parse(search)
    if (parms) {
        if (parms.t) {
            if (parms.t !== 'logout' && parms.u) {
                rxSet('auth.user.login', { username: parms.u, token: parms.t })
            } else {
                rxSet('auth.user.logout', { username: null, token: null })
            }
        }
    }
}

const mapStateToProps = (state) => {
    checkUrlSearch(state)
    return {
        redirect: state.app.homeRedirect,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFindGeneClick: (ev) => {
            if (isValidGeneName(dispatch, 'gene')) {
                dispatch({ type: 'app.navBarActive.homeToGene' })
                onGeneFindClick(dispatch)
            }
        },
        onRedirect: () => {
            // We've been redirected to the gene chart page, so reset the home
            // redirect so the home page will display on the next request for
            // it. Set a timeout so the gene chart page gets a chance to
            // display.
            setTimeout(() => {
                dispatch({type: 'app.homeRedirect.reset'})
            },100)
        },
    }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePres)

export default Home
