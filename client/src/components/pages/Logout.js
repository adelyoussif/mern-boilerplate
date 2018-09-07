import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class Logout extends Component {

  componentDidMount() {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return <div>See you later</div>;
  }

}

export default connect(null, actions)(Logout);
