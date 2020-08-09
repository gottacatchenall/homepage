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

                        <View style={{
                               flex: 1,
                               flexDirection: 'row',
                               justifyContent: 'center',
                               alignItems: 'center',
                               flexWrap: 'wrap-reverse',
                             }}>

                                <View style={{
                                   flex: 1,
                                   minWidth: 750,
                                   width: '40%',
                                   minHeight: 300,
                                    }}>

                                    <div className="lattice_container">
                                        <Lattice/>
                                    </div>
                               </View>

                               <View style={{
                                   flex: 1,
                                   minWidth: 250,
                                   width: '40%',
                                   minHeight: 300,
                               }}>
                                   <div className="label_container">
                                       <label>community ecology <br/> in space and time </label>
                                   </div>
                               </View>
                             </View>

        );
   }
}

export default Home;
