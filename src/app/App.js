
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Route,
      Switch
} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import Auth from 'auth/auth'
import CellTypeWork from 'cellTypeWork/page'
import Database from 'database/Database'
import DataModel from 'dataModel/DataModel'
import Dataset from 'dataset/Dataset'
import dotenv from 'dotenv'
import Gene from 'gene/page'
import Home from 'home/Home'
import NamerDialog from 'components/NamerDialog'
import NavBar from 'app/NavBar'
import PageNotFound from 'home/PageNotFound'
import Pipeline from 'pipeline/page'
import sessionStoreInit from 'state/sessionStore'
import Snackbar from 'components/snackbar'
import { SortableMarker } from 'helpers/sortable'
import Theme from 'app/Theme'

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
                            <Route exact path='/' component={Home}/>

                            <Route path='/auth' component={Auth}/>
                            <Route path='/data-model' component={DataModel}/>
                            <Route path='/dataset' component={Dataset}/>
                            <Route path='/gene' component={Gene}/>
                            <Route path='/pipeline' component={Pipeline}/>
                            <Route path='/cell-type' component={CellTypeWork}/>
                            <Route path='/sql-query' component={Database}/>
                            
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                    <Snackbar />
                    <NamerDialog />
                    <SortableMarker />
                </div>
            </Router>
        </Theme>
    </Provider>
    )
}

export default App
