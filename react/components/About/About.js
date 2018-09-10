//./components/About.js
import React, { Component } from 'react';

class About extends Component {
  render(){
      console.log(this.props);
      // Get data from route props
      const news = this.props.news;
    return (<h1>About Page</h1>);
  }
}

export default About