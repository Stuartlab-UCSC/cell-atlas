import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App'
import registerServiceWorker from 'app/registerServiceWorker'
import "typeface-open-sans";

ReactDOM.render(
        <App />,
    document.getElementById('root')
);
registerServiceWorker();
