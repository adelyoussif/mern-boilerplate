import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  state = {
    showSettings: false
  }

  settingsClickHandler = () => {
    if (!this.state.showSettings) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState({ showSettings: !this.state.showSettings});
  }

  handleOutsideClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.settingsClickHandler();
  }

  navHandler = () => {
    if ( this.props.authenticated && this.props.user) {
      const { username, fullName } = this.props.user;
      const { showSettings } = this.state;
      return (
        <div className="header">
          <div className="header__content container">
            <div className="header__logo">
             <Link to="/"> App Logo </Link>
            </div>
            <div className="header__nav">
              <div className="two">
               <Link to={`/${username}`}>
                  <span> { this.props.user ? `Hello, \u00A0 ${fullName}` : null }</span>
               </Link> 
              </div>
              <div 
                ref={node => { this.node = node; }}
                >
                <button 
                  className="button--icon"
                  onClick={this.settingsClickHandler}
                > <i className="fas fa-caret-down"></i> </button>
                
              </div> 
            </div>
          </div>
          {
            showSettings ? 
            <div className="header__list">
            <Link to="/settings" onClick={this.settingsClickHandler} > Settings </Link>
            <Link to="/logout" onClick={this.settingsClickHandler} > Logout </Link>
            </div>
            : null
          }
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="container header__content">
            <div className="header__logo">
              <Link to="/"> App Logo </Link>
            </div>
            <div className="header__nav">
            <Link to="/login"> Login </Link>
            <Link to="/signup"> Signup </Link>
          </div>
        </div>
      </div>
       
      );
    }
  }

  render() {    
    return (
      <>
      {this.navHandler()}
      </>
    );
  }
  
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Header);
