
import { connect } from 'react-redux'
import Snackbar from 'components/snackbar'

const mapStateToProps = state => {
    return {
        open: state.auth.checkMail,
        message: 'Check your email for a verification link to sign on.',
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClose: (ev, reason) => {
            if (reason === 'clickaway') {
                return
            }
            dispatch({ type: 'auth.checkMail.reset' })
        },
    }
}

const CheckMail = connect(
    mapStateToProps,
    mapDispatchToProps
)(Snackbar)

export default CheckMail
