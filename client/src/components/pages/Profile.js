import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {

  render() {
    const { firstName } = this.props.user;
    return (
      <div className="profile container">
       <h1> { this.props.user ? `Hello, ${firstName}` : null }</h1>
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Profile);