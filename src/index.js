import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'
import registerServiceWorker from 'app/registerServiceWorker'
import { init as rxInit } from 'state/rxInternals'

ReactDOM.render(
        <App store={rxInit()} />,
    document.getElementById('root')
);
registerServiceWorker();
