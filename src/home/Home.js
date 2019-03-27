// Home page: logic

import { connect } from 'react-redux'
import HomePres from 'home/HomePres'

const mapStateToProps = (state) => {
    return {
        redirect: state['home.redirect'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRedirect: () => {

            // We've been redirected to the gene chart page, so reset the home
            // redirect so the home page will display on the next request for
            // it. Set a timeout so the gene chart page gets a chance to
            // display.
            setTimeout(() => {
                dispatch({type: 'home.redirect.reset'})
            },100)
        },
    }
}

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePres)

export default Home

