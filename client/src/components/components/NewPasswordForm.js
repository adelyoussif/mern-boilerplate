import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextInputField from '../common/TextInputField';
import ButtonField from '../common/ButtonField';
import * as actions from '../../store/actions';
import { trimValues } from '../../utils';

class NewPasswordForm extends Component {

  state = {
    password: '',
    verifyToken: this.props.match.params.verifytoken,
    apiErrors: '',
    type: 'text'
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
      return { [name]: value, type: 'password'} 
    });  
  }

  formSubmitHandler = (e)=> {
    e.preventDefault();
    const { apiErrors, type, ...user } = this.state;
    this.props.newPassword(trimValues(user), () => {
      if(this.props.user) {
        this.props.history.push(`/${this.props.user.username}`);
      }
    });
  };

  render() {
    const { password, apiErrors, type } = this.state;
    return (
      <form 
       onSubmit={this.formSubmitHandler}
       className="form container"
      >
        <TextInputField
          type={type}
          placeholder="Enter Your New Password"
          name="password"
          value={password}
          onChange={this.inputChangeHandler}
          autoFocus="true"
        />
        { apiErrors.reset && <div className="input__error"> {apiErrors.reset}</div> }
        <ButtonField  content={ <> Create new password </> } />
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
)(NewPasswordForm);
