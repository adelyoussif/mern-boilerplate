import React, { Component } from 'react';

import EditProfile from './EditProfile';

class Settings extends Component {

  state = {
    showEditProfile: false
  }

  editProfileClickHandler = () => {
    this.setState({ showEditProfile: !this.state.showEditProfile});
  }
  
  render() {
    const { showEditProfile } = this.state;
    return (
      <div className="container settings"> 
        <button
          onClick={this.editProfileClickHandler}
          className="button--link"
        > 
        Edit Your Profile 
        </button>
        { showEditProfile ? <EditProfile /> : null}
      </div>
    );
  }

}

export default Settings;