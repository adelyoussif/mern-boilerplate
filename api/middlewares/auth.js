const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const keys = require('../config/keys');

// Generate Tokens 
function generateAuthToken(user) {
  return jwt.sign({email: user.email, _id: user._id}, keys.secret);
}
// Errors Object 
const errors = {
  login: '',
  signup: '',
  empty: '',
  internal: '',
  username: '',
  email: '',
  database: '',
  confirm: ''
};

// Login Auth 
const login = (req, res, next) => {

  const { login, password } = req.body;
  if (!login || !password ) {
    errors.empty = 'Client? Please Fill Your Data';
    return res.status(422).json(errors);
  }

  User.findOne({ $or: [ { email: login }, { username: login } ]})
  .then((existingUser) => {
    if (existingUser.isVerified) {
      bcrypt.compare(password, existingUser.password)
      .then(function(match) {
        if (match) {
          const {password, ...userInfo} = JSON.parse(JSON.stringify(existingUser));
          if (userInfo.isVerified) {
            return res.status(200).json({ 
              token: generateAuthToken(userInfo),
              user: userInfo
            });
          } 
        } else if (!match) {
            errors.login = 'Email and Password did not match';
            return res.status(422).json(errors);
        }
      }); 
    } else if (!existingUser.isVerified){
      errors.confirm = 'Please Confirm Your Email First';
      return res.status(422).json(errors);
    }
  })
  .catch((ex) => {
    errors.login = 'Email or Username Not Found';
    return res.status(422).json(errors);
  });

};
 
// Signup Auth 
const signup = (req, res, next) => {

  let { email, password, username, firstName, lastName } = req.body;
  if (!email || !password || !username || !firstName || !lastName) {
    errors.empty = ' Client? Please Fill Your Data';
    return res.status(422).json(errors);
  }

  User.find({ $or: [ { email } , { username } ]})
    .then((existingUser) => {
       if ( existingUser.length === 0 ) {
        bcrypt.hash(password, keys.saltRounds)
        .then((hash) => {
          const user = new User({
            password: hash,
            email,
            username,
            firstName,
            lastName
          });
          user.save()
          .then((response) => {
            const {password, ...userInfo} = JSON.parse(JSON.stringify(user));
            return res.status(200).json({ user: userInfo });
          })
          .catch((ex) => {
             // ex.errors.email.message  // ex.errors.username.message 
            if (ex.code === 11000) {
              errors.database = 'Something Went Wrong in The Database';
              return res.status(422).json(errors);
            }
            if (ex.errors) {
              errors.database = 'Client?  Please Validate Your Data First';
              return res.status(422).json(errors);
            }
          });
        });
      }  
      if ( existingUser.length === 1 ) {
        if (existingUser[0].email === email && existingUser[0].username === username) {
          errors.username = 'Username Not Available, Pick Another One';
          errors.email = 'Email Already in Use';
          return res.status(422).json(errors);
        } else if ( existingUser[0].email === email ) {
            errors.email = 'Email Already in Use';
            return res.status(422).json(errors);
        } else if ( existingUser[0].username === username ){
            errors.username = 'Username Not Available, Pick Another One';
            return res.status(422).json(errors);
        }
      }
      if ( existingUser.length === 2 ) {
        errors.username = 'Username Not Available, Pick Another One';
        errors.email = 'Email Already in Use';
        return res.status(422).json(errors);
      } 
    })
    .catch((ex) => {
      errors.internal = 'Something Went Wrong, Please Try Again';
      res.status(500).json(errors);
    });
    
};

module.exports = {
  login,
  signup
}
