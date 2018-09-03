import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

  render() {
    
    return (
      <div className="footer">
        <div className=" container footer__content">
          <div>
          <p> &copy; Dev Server 2018 </p>
          </div>
          <div>
          <Link to="/contact"> Contacts Us </Link>
          <Link to="/subscribe"> Our Newsletter </Link>
          </div>
        </div>
      </div>
    );
  }

}

export default Footer;