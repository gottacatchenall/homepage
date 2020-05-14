import React, {Component} from 'react';
import ReactMarkdown  from 'react-markdown'

class Publications extends Component {
   constructor(props){
      super(props)
      this.state = { pub_markdown: null }
   }

   componentWillMount() {
       const cv_markdown = require("./Publications.md");

       fetch(cv_markdown).then((response) => response.text()).then((text) => {
           this.setState({ pub_markdown: text })
       })
   }


   render() {
        return (
                <div>
                    <ReactMarkdown source={this.state.pub_markdown} />
                </div>
        );
   }
}


export default Publications;
