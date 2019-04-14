
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Route,
      Switch
} from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import CellType from 'cellType/page'
import Database from 'database/Database'
import DataModel from 'dataModel/DataModel'
import Gene from 'gene/page'
import Dataset from 'dataset/Dataset'
import Home from 'home/Home'
import NamerDialog from 'components/NamerDialog'
import NavBar from 'app/NavBar'
import sessionStoreInit from 'state/sessionStore'
import TrajExplore from 'trajExplore/TrajExplore'
import PageNotFound from 'home/PageNotFound'
import Theme from 'app/Theme'

import 'app/App.css'

const App = ({store}) => {
    // Load any persistent state.
    sessionStoreInit(store)

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
                            <Route path='/cell-type' component={CellType}/>
                            <Route path='/data-model' component={DataModel}/>
                            <Route path='/dataset' component={Dataset}/>
                            <Route path='/gene' component={Gene}/>
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

export default App
