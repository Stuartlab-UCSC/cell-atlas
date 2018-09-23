
// 'About Us' text.

import { connect } from 'react-redux'
import AboutPres from 'home/AboutPres'

const aboutState = {
    'about.about.expand': (state = false, action) => {
        if (action.type === 'about.about.expand.toggle') {
            return !state
        } else {
            return state
        }
    },
    'about.mission.expand': (state = false, action) => {
        if (action.type === 'about.mission.expand.toggle') {
            return !state
        } else {
            return state
        }
    },
    'about.method.expand': (state = false, action) => {
        if (action.type === 'about.method.expand.toggle') {
            return !state
        } else {
            return state
        }
    },
    'about.whatIs.expand': (state = false, action) => {
        if (action.type === 'about.whatIs.expand.toggle') {
            return !state
        } else {
            return state
        }
    },
}

const mapStateToProps = (state) => {
    return {
        expand: {
            'about.about.expand': state['about.about.expand'],
            'about.mission.expand': state['about.mission.expand'],
            'about.method.expand': state['about.method.expand'],
            'about.whatIs.expand': state['about.whatIs.expand'],
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (ev) => {
        
            // Click of the expand icon.
            const type = ev.target.closest('.parent').id  + '.toggle'
            dispatch ({ type })
        },
    }
}

const About = connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutPres)


export { About, aboutState }


