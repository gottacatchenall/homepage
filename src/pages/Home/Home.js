import React, { Component } from 'react';
import  * as d3 from 'd3';
import Lattice from './components/Lattice';
import './Home.sass';
import { View } from 'react-native';


class Home extends Component {
   constructor(props){
      super(props);
   }

   componentDidMount() {
   }

   componentDidUpdate() {
   }

   render() {
        return (
            <div className="home_container">

            <View style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex: 0.5}}>
                        <Lattice/>
                </View>
                <View style={{flex: 0.5}}>
                    <div className="label_container">
                        <label>community ecology <br/> and complexity </label>
                    </div>
                </View>

            </View>
            </div>

        );
   }
}

export default Home;
