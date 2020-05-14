import React, { Component } from 'react'
import ReactMarkdown  from 'react-markdown'

class Research extends Component {
    constructor(props){
       super(props)
       this.state = { markdown: null }

    }

    componentDidMount() {
        const markdown = require("./Research.md");
        fetch(markdown).then((response) => response.text()).then((text) => {
            this.setState({ markdown: text })
        })
    }
    componentDidUpdate() {
    }



    render(){
        return(
            <div>
            <ReactMarkdown source={this.state.markdown} />
            </div>
        );
    }
}

export default Research;
