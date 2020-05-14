import React from 'react';
import './main.sass';

import About from './pages/About/About';
import CV from './pages/CV/CV';
import Home from './pages/Home/Home';
import Research from './pages/Research/Research';
import Publications from './pages/Publications/Publications';


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
                            <div><Link to="/home">home</Link></div>
                            <div><Link to="/about">about</Link></div>
                            <div><Link to="/research">research</Link></div>
                            <div><Link to="/publications">publications</Link></div>
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

                            <Route path="/publications">
                                <Publications/>
                            </Route>

                            <Route path="/cv">
                                <CV/>
                            </Route>

                            <Route path="/home">
                                      <Home data={[5,10,1,3]} size={[500,500]} />
                            </Route>
                        </div>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
