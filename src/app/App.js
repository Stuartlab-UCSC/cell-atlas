
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Route,
      Switch
} from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import Dataset from 'dataset/Dataset'
import Help from 'home/Help'
import Home from 'home/Home'
import MoleSim from 'moleSim/MoleSim'
import NavBar from 'app/NavBar'
import PageNotFound from 'home/PageNotFound'
import Search from 'search/Search'
import Result from 'result/Result'
import TrajExplore from 'trajExplore/TrajExplore'
import TrajSim from 'trajSim/TrajSim'
import TypePsych from 'typePsych/TypePsych'
import Upload from 'upload/page/Upload'
import Theme from 'app/Theme'

import 'app/App.css'


const App = ({store}) => {
    return (
    <Provider store={store}>
        <Theme>
            <CssBaseline />
            <Router>
                <div>
                    <NavBar />
                    <div className='page' >
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route path='/explore/traj' component={TrajExplore}/>
                            <Route path='/explore/search' component={Search}/>
                            <Route path='/explore/dataset' component={Dataset}/>
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
        </Theme>
    </Provider>
    )
}

export default App
