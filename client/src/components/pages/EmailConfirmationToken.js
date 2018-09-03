import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import { trimValues } from '../../utils';
import Spinner from '../common/Spinner';
import EmailConfirmationForm from '../components/EmailConfirmationForm';

class EmailConfirmationToken extends Component {

  state = {
    verifyToken: this.props.match.params.verifytoken,
    apiErrors: ''
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.apiErrors !== nextState.apiErrors) {
      return { apiErrors: nextProps.apiErrors };
    }
    return null;
  }

componentDidMount() {
  const { apiErrors, ...user } = this.state;
    this.props.confirmToken(trimValues(user), () => {
      if(this.props.user) {
        this.props.history.push(`/${this.props.user.username}`);
      }
    });
}
  render() {
    const { apiErrors } = this.state;
    return (
      <div>
         { apiErrors ? 
         <div className="input__error"> 
         {apiErrors.confirm}
         <EmailConfirmationForm />
         </div> 
         : <Spinner /> }
      </div>
    );
  }
  
}

function mapStateToProps(state) {
  return { 
    apiErrors: state.auth.errors,
    user: state.auth.user
  };
}

export default compose(
  connect(mapStateToProps, actions)
)(EmailConfirmationToken);
