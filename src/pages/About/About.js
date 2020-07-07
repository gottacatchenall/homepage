import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './About.sass';

class About extends Component {
   constructor(props){
      super(props);
      this.getMarkdown = this.getMarkdown.bind(this);
   }

   componentDidMount() {
       const markdown = require("./about.md");
       fetch(markdown).then((response) => response.text()).then((text) => {
           console.log(text);
           this.setState({md_text: text});
       });
   }

   componentDidUpdate() {
   }


   getMarkdown(){

   }

   render() {
        //var md = this.state.md_text;
        return (<div><h1> about  </h1></div>
        //        <div> <ReactMarkdown source={md}  /></div>
        );
   }
}

export default About;
