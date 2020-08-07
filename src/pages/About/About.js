import React, { Component } from 'react';
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
        return (<div>
                    <h1> about  </h1>
                    <p className="about_body">hi--<br/>
                    i'm michael, and this is my website. i'm a graduate student in the <a>Gonzalez Lab</a> at <a>McGill University</a> </p>
                </div>
        );
   }
}

export default About;
