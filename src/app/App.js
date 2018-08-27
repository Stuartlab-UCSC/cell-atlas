
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Link,
      Route,
      Switch
} from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles';

import Help from 'home/Help'
import Home from 'home/Home'
import Analyze from 'analyze/Analyze'
import Result from 'result/Result'
import PageNotFound from 'home/PageNotFound'
import { init as rxInit } from 'app/rxInternals'
import theme from 'app/theme'
import Upload from 'upload/Upload'

import logo from 'app/images/logo.svg'

import 'app/App.css'

const store = rxInit()

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
                            <li><Link to="/result">Results</Link></li>
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
                        <Route path="/result" component={Result}/>
                        <Route path="/help" component={Help}/>
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
)
/*
*/

export default App
