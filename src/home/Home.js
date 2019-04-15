// Home page: logic

import { connect } from 'react-redux'
import HomePres from 'home/HomePres'
import { isValidGeneName } from 'components/geneName'
import { onGeneFindClick } from 'gene/page'

const mapStateToProps = (state) => {
    return {
        redirect: state.app.homeRedirect,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFindGeneClick: (ev) => {
            if (isValidGeneName(dispatch, 'gene')) {
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
