import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Secret extends Component {

  render() {
    return (
      <div>
       <Helmet>
        <title> Dev Server | Our Secret Page</title>
       </Helmet>
        <h1> It's Our Secret Page </h1> 
      </div>
    );
  }
  
}

export default Secret;