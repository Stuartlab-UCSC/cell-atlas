
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Route,
      Switch
} from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'

import Auth from 'auth/auth'
import CellType from 'cellType/page'
import CellTypeDeterm from 'cellTypeDeterm/page'
import Database from 'database/Database'
import DataModel from 'dataModel/DataModel'
import Gene from 'gene/page'
import Dataset from 'dataset/Dataset'
import Home from 'home/Home'
import NamerDialog from 'components/NamerDialog'
import NavBar from 'app/NavBar'
import Pipeline from 'pipeline/page'
import sessionStoreInit from 'state/sessionStore'
import PageNotFound from 'home/PageNotFound'
import Theme from 'app/Theme'
import dotenv from 'dotenv'

import 'app/App.css'

const App = ({store}) => {
    // Load environment variables.
    dotenv.config()
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
                            <Route path='/auth' component={Auth}/>
                            <Route path='/data-model' component={DataModel}/>
                            <Route path='/dataset' component={Dataset}/>
                            <Route path='/gene' component={Gene}/>
                            <Route exact path='/' component={Home}/>
                            <Route path='/pipeline' component={Pipeline}/>
                            <Route path='/prototypes/determ' component={CellTypeDeterm}/>
                            <Route path='/prototypes/cellType' component={CellType}/>
                            <Route path='/sql-query' component={Database}/>
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
