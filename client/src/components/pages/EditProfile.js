import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditProfile extends Component {

  render() {
    const { firstName, lastName, username, email } = this.props.user;
    return (
      <div>
       <p> {firstName}</p>
       <p> {lastName}</p>
       <p>{username}</p>
       <p>{email}</p>
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

export default connect(mapStateToProps)(EditProfile);