import React, { Component } from 'react'
import  * as d3 from 'd3'
import Lattice from './components/Lattice'
import './Home.sass'

class Home extends Component {
   constructor(props){
      super(props)
   }

   componentDidMount() {
   }

   componentDidUpdate() {
   }

   render() {
        return (
            <div className="home_container">
                <div className="lattice_container">
                    <Lattice/>
                </div>

                <div className="label_container">
                    <label>community ecology <br/> and complexity </label>
                </div>
            </div>
        );
   }
}

export default Home;
