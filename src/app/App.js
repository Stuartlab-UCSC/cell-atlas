
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Link,
      Route,
      Switch
} from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Help from 'home/Help'
import Home from 'home/Home'
import Analyze from 'analyze/Analyze'
import Job from 'job/Job'
import PageNotFound from 'home/PageNotFound'
import { init as rxInit } from 'app/rxInternals'
import Upload from 'upload/Upload'

import logo from 'app/images/logo.svg'

import 'app/App.css'

const store = rxInit()

const theme = createMuiTheme({
    // Values of the material-ui default theme are in comments.
    typography: {
        fontFamily: [
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            'Arial',
        ].join(','), //""Roboto", "Helvetica", "Arial", sans-serif"
        fontSize: '16', // 14
    },
    overrides: {
        'MuiTableRow': {
            root: {
                height: '36px', // 56px
            },
            head: {
                fontWeight: '400',
                height: '36px', // 48px
            },
        },
    },
});

const appName = 'CELL ATLAS   '

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <div className='App'>
                    <div className='navBar'>
                        <ul className='menu'>
                            <li className='home'>
                                <Link to="/">{appName}</Link>
                            </li>
                            <li><Link to="/upload">Upload</Link></li>
                            <li><Link to="/analyze">Analyze</Link></li>
                            <li><Link to="/job">Jobs</Link></li>
                            <li><Link to="/help">Help</Link></li>
                        </ul>
                        <img
                            className='logo'
                            src={logo}
                            width='32px'
                            alt='logo'
                        ></img>
                    </div>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/upload" component={Upload}/>
                        <Route path="/analyze" component={Analyze}/>
                        <Route path="/job" component={Job}/>
                        <Route path="/help" component={Help}/>
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
)

export default App
