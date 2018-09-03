import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextInputField from '../common/TextInputField';
import ButtonField from '../common/ButtonField';
import * as actions from '../../actions';
import { trimValues } from '../../utils';

class PasswordResetForm extends Component {

  state = {
    login: '',
    apiErrors: '',
    success: ''
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.apiErrors !== nextState.apiErrors) {
      return { apiErrors: nextProps.apiErrors };
    }
    if (nextProps.success !== nextState.success) {
      return { success: nextProps.success };
    }
    return null;
  }

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState((prevState, props) => {
      return { [name]: value} 
    });
  }

  formSubmitHandler = (e)=> {
    e.preventDefault();
    const { ...login } = this.state;
    this.props.resetPassword(trimValues(login));
  };

  render() {
    const { login, apiErrors, success } = this.state;
    
    return (
      <form 
       onSubmit={this.formSubmitHandler}
       className="form container"
      >
        { success && !apiErrors.reset ? <div> 
          <p>
          We sent an password reset mail to <strong>{success.confirm}.</strong> 
          Please follow the instructions in the mail to reset your password.
          </p>
          <p> If it doesn’t arrive, check your spam folder. </p>
          </div> 
          : null
        }
        <TextInputField
          placeholder="Enter Your Email or Username"
          name="login"
          value={login}
          onChange={this.inputChangeHandler}
          autoFocus="true"
        />
        { apiErrors.reset && <div className="input__error"> {apiErrors.reset}</div> }
        <ButtonField  content={ <> Reset password  </> } />
      </form>
    );
  }
  
}

function mapStateToProps(state) {
  return { 
    apiErrors: state.auth.errors,
    success: state.auth.success
  };
}

export default compose(
  connect(mapStateToProps, actions)
)(PasswordResetForm);
