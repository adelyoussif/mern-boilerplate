import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Landing extends Component {

  render () {
    return (
      <div className="landing">
       <Helmet>
        <title> Dev Server | Landing Page</title>
        <meta name="description" content="Our Landing Page" />
       </Helmet>
       <p> I'm the landing page, please do not leave me like this  </p> 
      </div>
    );
  }
  
}

export default Landing;
