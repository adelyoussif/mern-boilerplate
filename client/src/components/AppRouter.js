import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Header from './layout/Header';
import Footer from './layout/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Logout from './pages/Logout';
import Secret from './pages/Secret';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import requireAuth from './common/requireAuth';
import PasswordResetForm from './components/PasswordResetForm';
import NewPasswordForm from './components/NewPasswordForm';
import EmailConfirmationForm from './components/EmailConfirmationForm';
import EmailConfirmationToken from './pages/EmailConfirmationToken';
import ContactForm from './components/ContactForm';
import NewsletterForm from './components/NewsletterForm';
import Spinner from './common/Spinner';

class AppRouter extends Component {
  render () {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={SignupForm}/>
            <Route path="/reset" component={PasswordResetForm}/>
            <Route path="/contact" component={ContactForm}/>
            <Route path="/subscribe" component={NewsletterForm}/>
            <Route path="/spinner" component={Spinner}/>
            <Route path="/reset/sent" component={Spinner}/>
            <Route path="/newpassword/:verifytoken" component={NewPasswordForm}/>
            <Route path="/confirm/:verifytoken" component={EmailConfirmationToken}/>
            <Route path="/confirm/" component={EmailConfirmationForm}/>
            <Route path="/secret" component={requireAuth(Secret)}/>
            <Route path="/settings" component={requireAuth(Settings)}/>
            <Route path="/:username" component={requireAuth(Profile)}/>
            <Route  component={NotFound}/>
          </Switch>
          <Footer />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;