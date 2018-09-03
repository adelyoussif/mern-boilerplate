import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import TextInputField from '../common/TextInputField';
import ButtonField from '../common/ButtonField';
import * as actions from '../../actions';
import { trimValues } from '../../utils';

class LoginForm extends Component {

  state = {
    login: '',
    password: '',
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
      return { [name]: value} 
    });
    this.props.clearErrors(e.target.name, this.props.errors);
  }

  formSubmitHandler = (e)=> {
    e.preventDefault();
    const {apiErrors, ...user } = this.state;
    this.props.login(trimValues(user), () => {
      if(this.props.user) {
        this.props.history.push(`/${this.props.user.username}`);
      } else {
        this.props.history.push('/');
      }
    });
  };

  render() {
    const { login, password, apiErrors } = this.state;
    return (
      <form 
       onSubmit={this.formSubmitHandler}
       className="form container"
      > 
        <TextInputField
          placeholder="Email or Username"
          name="login"
          value={login}
          onChange={this.inputChangeHandler}
          autoFocus="true"
        />
        <TextInputField
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.inputChangeHandler}
          autoComplete="off"
        />
          { apiErrors.login && !apiErrors.confirm ? <div className="input__error"> {apiErrors.login} </div> : null}
          { apiErrors.confirm ?
            <div>
              <div className="input__error"> {apiErrors.confirm} </div>
              <div className="button--link"> <Link to="/confirm"> Need confirmation email? </Link> </div>
            </div> 
            : null
          }
        <ButtonField  content={ <> Login </> } />
        <div>
         <div className="button--link"> <Link to="/reset"> Forget Your Password? </Link> </div>
        </div>
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
)(LoginForm);
