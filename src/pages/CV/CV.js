import React, {Component} from 'react';
import ReactMarkdown  from 'react-markdown'
import './CV.sass'

class CV extends Component {
   constructor(props){
      super(props)
      this.state = { cv_markdown: null }
   }

   componentWillMount() {
       const cv_markdown = require("./cv.md");

       fetch(cv_markdown).then((response) => response.text()).then((text) => {
           this.setState({ cv_markdown: text })
       })
   }


   render() {
        return (
                <div>
                    <ReactMarkdown source={this.state.cv_markdown} />
                </div>
        );
   }
}


export default CV;
