
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Route,
      Switch
} from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles';

import Help from 'home/Help'
import Home from 'home/Home'
import MoleSim from 'moleSim/MoleSim'
import TypePsych from 'typePsych/TypePsych'
import TrajSim from 'trajSim/TrajSim'
import Result from 'result/Result'
import PageNotFound from 'home/PageNotFound'
import { init as rxInit } from 'app/rxInternals'
import theme from 'app/theme'
import Upload from 'upload/Upload'
import NavBar from 'app/NavBar'

import 'app/App.css'

const store = rxInit()

const App = () => {
    return (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <div>
                    <NavBar />
                    <div className='page' >
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/upload' component={Upload}/>
                            <Route path='/analyze/moleSim' component={MoleSim}/>
                            <Route path='/analyze/typePsych' component={TypePsych}/>
                            <Route path='/analyze/trajSim' component={TrajSim}/>
                            <Route path='/result' component={Result}/>
                            <Route path='/help' component={Help}/>
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
    )
}

export default App
