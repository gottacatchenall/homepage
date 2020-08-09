import React, { Component } from 'react';
import { View } from 'react-native';

import ReactMarkdown from 'react-markdown';
import './About.sass';

class About extends Component {
   constructor(props){
      super(props);
   }

   componentDidMount() {
   }

   componentDidUpdate() {
   }



   render() {
        //var md = this.state.md_text;
        return (
            <View style={{
                   flex: 1,
                   flexDirection: 'row',
                 }}>
            <div className="about_container">
                    <h1> about  </h1> <br/>
                    <p className="about_body">hi—<br/><br/>
                    i'm michael, and this is my website. i'm a graduate student in the <a href="http://www.gonzalezlab.weebly.com">Gonzalez Lab</a> at McGill University.

                    <br/><br/> i study <a href="https://en.wikipedia.org/wiki/Community_(ecology)">community ecology</a> using <a href="https://en.wikipedia.org/wiki/Theoretical_ecology">computer simulation models and math</a>, with the goals of understanding how humans are affecting Earth's <a href="https://en.wikipedia.org/wiki/Biodiversity"> biodiversity</a>, building software to <a href="https://en.wikipedia.org/wiki/Ecological_forecasting">forecast ecological systems</a>, and <a href="https://en.wikipedia.org/wiki/Wildlife_corridor">designing landscapes</a> that best mitigate <a href="https://en.wikipedia.org/wiki/Holocene_extinction"> biodiversity loss</a> and its <a href="https://en.wikipedia.org/wiki/Ecosystem_service"> impacts on humanity</a>.


                    <br/> <br/><br/>
                    <p className="email_text"> i can be reached at <label className="email"> nrxszvo.xzgxsvm@nzro.nxtroo.xz </label><br/><a href="http://rumkin.com/tools/cipher/atbash.php">decode this cypher</a></p></p>

                </div>
            </View>
        );
   }
}

export default About;
