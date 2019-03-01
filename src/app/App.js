
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Route,
      Switch
} from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import NavBar from 'app/NavBar'
import NamerDialog from 'components/NamerDialog'
import Home from 'home/Home'
import Dataset from 'dataset/Dataset'
import Database from 'database/Database'
import TrajExplore from 'trajExplore/TrajExplore'
/*
import MoleSim from 'moleSim/MoleSim'
import Search from 'search/Search'
import Result from 'result/Result'
import TrajSim from 'trajSim/TrajSim'
import TypePsych from 'typePsych/TypePsych'
import Upload from 'upload/page/Upload'
import Help from 'home/Help'
*/
import PageNotFound from 'home/PageNotFound'
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
                            <Route path='/dataset' component={Dataset}/>
                            <Route path='/sql-query' component={Database}/>
                            <Route path='/traj' component={TrajExplore}/>
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                    <NamerDialog />
                </div>
            </Router>
        </Theme>
    </Provider>
    )
}
/*

                            <Route path='/explore/traj' component={TrajExplore}/>
                            <Route path='/explore/search' component={Search}/>
                            <Route path='/explore/dataset' component={Dataset}/>
                            <Route path='/explore/database' component={Database}/>
                            <Route path='/upload' component={Upload}/>
                            <Route path='/analyze/moleSim' component={MoleSim}/>
                            <Route path='/analyze/typePsych' component={TypePsych}/>
                            <Route path='/analyze/trajSim' component={TrajSim}/>
                            <Route path='/result' component={Result}/>
                            <Route path='/help' component={Help}/>
*/

export default App
