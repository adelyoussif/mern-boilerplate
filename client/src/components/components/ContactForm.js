import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextInputField from '../common/TextInputField';
import TextAreaField from '../common/TextAreaField';
import ButtonField from '../common/ButtonField';
import * as actions from '../../actions';
import { trimValues } from '../../utils';

class ContactForm extends Component {

  state = {
    name: '',
    email: '',
    subject: '',
    content: '',
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

  formSubmitHandler = async (e)=> {
    e.preventDefault();
    const {apiErrors, success, ...user } = this.state;
    this.props.contact(trimValues(user));
    // You Might Add A redirect Here 
  };

  render() {
    const { name, email, subject, content, success, apiErrors } = this.state;
    return (
      <form 
        onSubmit={this.formSubmitHandler}
        className="form container"
      >
        { success ? <div> 
          <p> We received your message and will get back soon to <strong>{success.contact}.</strong></p>
          </div> 
          : null
        }
        <TextInputField
          placeholder="Your Name"
          name="name"
          value={name}
          onChange={this.inputChangeHandler}
          autoFocus="true"
        />
        <TextInputField
          type="email"
          placeholder="Your Email"
          name="email"
          value={email}
          onChange={this.inputChangeHandler}
        />
         <TextInputField
          placeholder="Add Subject"
          name="subject"
          value={subject}
          onChange={this.inputChangeHandler}
          autoComplete="off"
        />
        <TextAreaField
          placeholder="Just say what you need"
          name="content"
          value={content}
          onChange={this.inputChangeHandler}
        />
         { apiErrors.contact && <div className="input__error"> {apiErrors.contact}</div> }
         <ButtonField  content={ <> Submit </> } />
        
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
)(ContactForm);