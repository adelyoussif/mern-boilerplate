import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextInputField from '../common/TextInputField';
import ButtonField from '../common/ButtonField';
import * as actions from '../../actions';
import { trimValues } from '../../utils';

class SignupForm extends Component {

  state = {
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    apiErrors: ''
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.apiErrors !== nextState.apiErrors) {
      return { apiErrors: nextProps.apiErrors };
    }
    return null;
  }

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState((prevState, props) => {
      return { [name]: value } 
    });
    this.props.clearErrors(e.target.name, this.props.errors);
  }

  formSubmitHandler = (e)=> {
    e.preventDefault();
    const { apiErrors, ...user } = this.state; 
    this.props.signup(trimValues(user), () => {
      this.props.history.push(`/confirm`);
    });
    console.log(trimValues(user));
  };

  render() {
    const { email, password, username, firstName, lastName, apiErrors } = this.state;
    return (
      <form 
       onSubmit={this.formSubmitHandler}
       className="form container"
      >
        <TextInputField
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={this.inputChangeHandler}
          autoFocus="true"
        />
        <TextInputField
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={this.inputChangeHandler}
        />
        <TextInputField
          placeholder="Username"
          name="username"
          value={username}
          onChange={this.inputChangeHandler}
        />
        { apiErrors.username && <div className="input__error">{apiErrors.username}</div> }
        <TextInputField
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={this.inputChangeHandler}
        />
        { apiErrors.email && <div className="input__error">{apiErrors.email}</div> }
        <TextInputField
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.inputChangeHandler}
        />
        { apiErrors.signup && <div className="input__error">{apiErrors.signup}</div> }
        <ButtonField  content={ 
          <>
          Create an account 
          </> 
          }
        />
      </form>
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
)(SignupForm);