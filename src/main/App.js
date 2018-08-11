
import React from 'react'
import { Provider } from 'react-redux'
import {
      BrowserRouter as Router,
      Link,
      Route,
      Switch
} from 'react-router-dom'

import About from 'home/About.js'
import Help from 'home/Help.js'
import Home from 'home/Home.js'
import Job from 'job/Job.js'
import PageNotFound from 'home/PageNotFound.js'
import { init as rxInit } from 'main/rxInternals'
import Upload from 'upload/Upload.js'

import 'main/App.css'

const store = rxInit()

const App = () => (
        <Provider store={store}>
            <Router>
                <div className='App'>
                    <ul className='AppMenu'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/upload">Upload</Link></li>
                        <li><Link to="/job">Jobs</Link></li>
                        <li><Link to="/help">Help</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/job" component={Job}/>
                        <Route path="/upload" component={Upload}/>
                        <Route path="/help" component={Help}/>
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        </Provider>
)

export default App
