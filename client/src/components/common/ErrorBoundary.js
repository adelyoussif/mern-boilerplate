import React, { Component } from 'react';

class ErrorBoundary extends Component {
  
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
    // logErrorToMyService(error, errorInfo); -- You can also log the error to an error reporting service
    // logComponentStackToMyService(errorInfo.componentStack); --  You can also log the component stack tree 
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;