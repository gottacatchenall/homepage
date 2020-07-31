import React from 'react';
import './main.sass';

import About from './pages/About/About';
import CV from './pages/CV/CV';
import Home from './pages/Home/Home';
import Research from './pages/Research/Research';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <div>

                    {/* nav bar*/}
                    <div className="header">
                        <div className="nav_bar">
                            <div><Link to="/">home</Link></div>
                            <div><Link to="/about">about</Link></div>
                            <div><Link to="/cv">cv</Link></div>

                        </div>
                        <div className="name"> michael catchen </div>
                    </div>

                    {/* routing*/}
                    <Switch>
                        <div className="body_container">
                            <Route path="/about">
                                <About/>
                            </Route>

                            <Route path="/research">
                                <Research/>
                            </Route>

                            <Route path="/cv">
                                <CV/>
                            </Route>

                            <Route exact path="/">
                                <Home />
                            </Route>
                        </div>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
