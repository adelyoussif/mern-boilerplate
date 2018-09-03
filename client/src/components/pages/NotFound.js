import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class NotFound extends Component {

  render() {
    return (
      <div>
        <Helmet>
          <title> Dev Server | Page Not Found</title>
        </Helmet>
          ERROR 404, Page Not Found
      </div>
    );
  }

}

export default NotFound;