import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextInputField from '../common/TextInputField';
import ButtonField from '../common/ButtonField';
import * as actions from '../../actions';

class EmailConfirmationForm extends Component {

  state = {
    email: this.props.user ? this.props.user.email : '',
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

  componentDidMount() {
    this.props.clearErrors();
    const { ...email } = this.state;
    this.props.confirmEmail(email)
  }

  inputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState((prevState, props) => {
      return { [name]: value} 
    });
    this.props.clearErrors();
  }

  formSubmitHandler = (e)=> {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState((prevState, props) => {
      return { [name]: value} 
     }
    );
    const { apiErrors, ...email } = this.state;
    this.props.confirmEmail(email);
  };

  render() {
    const { email, apiErrors, success } = this.state;
    
    return (
      <form 
        onSubmit={this.formSubmitHandler}
        className="form container"
      >
        { success && !apiErrors.confirm ? <div> 
          <p>
          You’re almost done! We sent an activation mail 
          to <strong>{success.confirm}.</strong> Please follow the instructions in the mail to activate your account.
          </p>
          <p> If it doesn’t arrive, check your spam folder. </p>
          </div> 
          : null
        }
        <TextInputField
        type="email"
        placeholder="Enter Your Email"
        name="email"
        value={email}
        onChange={this.inputChangeHandler}
        autoFocus="true"
        />
         { apiErrors.confirm && <div className="input__error"> {apiErrors.confirm}</div> }
         <ButtonField  content={ <> Send Another Confirmation Email  </> } />
      </form>
    );
  }
  
}

function mapStateToProps(state) {
  return { 
    apiErrors: state.auth.errors,
    user: state.auth.user,
    success: state.auth.success
  };
}

export default compose(
  connect(mapStateToProps, actions)
)(EmailConfirmationForm);

