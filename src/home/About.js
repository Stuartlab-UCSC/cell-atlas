
// 'About Us' text.

import { connect } from 'react-redux'
import AboutPres from 'home/AboutPres'

const aboutState = {
    'about.aboutExpand': (state = false, action) => {
        if (action.type === 'about.aboutExpand.toggle') {
            return !state
        } else {
            return state
        }
    },
    'about.missionExpand': (state = false, action) => {
        if (action.type === 'about.missionExpand.toggle') {
            return !state
        } else {
            return state
        }
    },
    'about.methodExpand': (state = false, action) => {
        if (action.type === 'about.methodExpand.toggle') {
            return !state
        } else {
            return state
        }
    },
    'about.whatIsExpand': (state = false, action) => {
        if (action.type === 'about.whatIsExpand.toggle') {
            return !state
        } else {
            return state
        }
    },
}

const mapStateToProps = (state) => {
    return {
        expand: {
            about: state['about.aboutExpand'],
            mission: state['about.missionExpand'],
            method: state['about.methodExpand'],
            whatIs: state['about.whatIsExpand'],
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onExpandClick: (ev) => {
            const which = ev.target.closest('.parent').dataset.which
            const type = 'about.' + which + 'Expand.toggle'
            dispatch ({ type })
        },
    }
}

const About = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutPres)


export { About, aboutState }


