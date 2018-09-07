import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import TextInputField from '../common/TextInputField';
import ButtonField from '../common/ButtonField';
import * as actions from '../../store/actions';
import { trimValues } from '../../utils';

class NewsletterForm extends Component {

  state = {
    email: '',
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
      return { [name]: value } 
    });
    this.props.clearContactErrors();
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    const { apiErrors, success, ...email } = this.state;
    this.props.subscribe(trimValues(email), () => {
      console.log('Done');
      // You Might Add A redirect Here 
    });
  };

  render() {
    const { email, success, apiErrors } = this.state;
    return (
      <form 
       onSubmit={this.formSubmitHandler}
       className="form container"
      >
        { success ? <div> 
          <p><strong>{success.subscribe} is now subscribed to our newsletter.</strong></p>
          </div> 
          : null
        }
        <TextInputField
          type="email"
          placeholder="Your Email"
          name="email"
          value={email}
          onChange={this.inputChangeHandler}
          autoFocus="true"
        />
         { apiErrors.subscribe && <div className="input__error"> {apiErrors.subscribe}</div> }
         <ButtonField  content={ <> Subscribe </> } />
      </form>
    );
  }
  
}

function mapStateToProps(state) {
  return { 
    apiErrors: state.contact.errors,
    success: state.contact.success
  };
}

export default compose(
  connect(mapStateToProps, actions)
)(NewsletterForm);