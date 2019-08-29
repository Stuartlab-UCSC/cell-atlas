import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'
import registerServiceWorker from 'app/registerServiceWorker'
import { init as rxInit } from 'state/rxInternals'

const rootEl = document.getElementById('root')

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
