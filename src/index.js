import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'
import registerServiceWorker from 'app/registerServiceWorker'
import { init as rxInit } from 'state/rxInternals'

const rootEl = document.getElementById('root')


// TODO pull redux into this with:
// https://medium.com/@brianhan/hot-reloading-cra-without-eject-b54af352c642
ReactDOM.render(
    <App store={rxInit()} />,
    rootEl
)

if (module.hot) {
    module.hot.accept('./app/App', () => {
        const NextApp = require('./app/App').default
        ReactDOM.render(
            <NextApp />,
            rootEl
        )
    })
}
registerServiceWorker();
