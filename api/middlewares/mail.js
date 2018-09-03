const nodemailer = require('nodemailer');
const Mailchimp = require('mailchimp-api-v3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const keys = require('../config/keys');
const User = require('../models/User');

// // Generate Tokens 
function generateVerifyToken(user) { // Consider adding different token for email verification -- to change expiration time
  return jwt.sign({email: user.email, _id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, keys.secret);}

function generateAuthToken(user) {
  return jwt.sign({email: user.email, _id: user._id}, keys.secret);
}

const mailchimp = new Mailchimp(keys.MC_ID);
const CLIENT_URL = keys.clientURL;

// Mail Service Config
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: keys.gmailUser,
    pass: keys.gmailPass
  }
});

// Errors Cases
const errors = {
  empty: '',
  internal: '',
  database: '',
  reset: '',
  confirm: '',
  contact: '',
  subscribe: ''
};

// Success Cases
const success = {
  confirm: '',
  contact: '',
  subscribe: ''
};

// Contact Form  
const contact = (req, res, next) => {

  const { name, email, subject, content } = req.body;
  
  if ( !name || !email || !subject || !content ) {
    errors.empty = ' Client? Please Fill Your Data';
    return res.status(422).json(errors);
  } else {
    try {
      const htmlBody = `
      <div>
        <h1> ${subject}</h1>
        <p> ${content} </p>
        <p>From ${name} @ ${email}</p>
      <div>
    `;
    
    const mailOptions = {
      from: 'Dev Server',
      to: 'adelyoussif.code@gmail.com',
      subject: `Dev Server | ${subject}`,
      html: htmlBody
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        errors.contact = err.message
        res.status(422).json(errors);
        return process.exit(1);
      } else {
        success.contact = info.accepted[0];
        return res.status(200).json(success);
      }
    });
    } catch (e) {
      errors.contact = 'Something Went Wrong, Try Agian'
      res.status(422).json(errors);
    }
  }

};

// Newsletter Form 
const newsletter = (req, res, next) => {

  const { email } = req.body;
  if ( !email ) {
    errors.empty = ' Client? Please Fill Your Data';
    return res.status(422).json(errors);
  } else {
    mailchimp.post(`/lists/${keys.MC_List}/members`, {
      email_address: email,
      status: 'subscribed'
    }).then(function(result) {
      success.subscribe = result.email_address;
      return res.status(200).json(success);
    }).catch(function(err) {
      errors.subscribe = err.title;
      return res.status(422).json(errors);
    });
  }

};

// Reset Password Form 
const reset = (req, res, next) => {

  const { login } = req.body;
  if ( !login ) {
    errors.empty = ' Client? Please Fill Your Data';
    return res.status(422).json(errors);
  } else {
      User.findOne({ $or: [ { email: login }, { username: login } ]})
        .then((existingUser) => {
          if (existingUser) {
            const { password, ...user } = JSON.parse(JSON.stringify(existingUser));
            const verifyToken = generateVerifyToken(user);     
            const htmlBody = `
            <div>
              <h1> Click the link below to reset your password </h1>
              <a href=${CLIENT_URL}/newpassword/${verifyToken}>Reset Password</a>
              <p> Link expires in one hour </p>
              <p> If you does not request a reset just ignore this email</p>
            <div>
          `;

          const mailOptions = {
            from: 'Dev Server',
            to: existingUser.email,
            subject: 'Dev Server | Reset Your Password',
            html: htmlBody
          };
        
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              res.status(422).json({ error: err.message});
              return process.exit(1);
            } else {
              success.confirm = info.accepted[0];
              return res.status(200).json(success);
            }
          });

          } else if (!existingUser) {
              errors.reset = 'There is no user with these credentials';
              return res.status(422).json(errors);
          }
        })
        .catch((ex) => {
          return res.status(422).json(errors);
        });
  }

};

// create New Password Form 
const newPassword = (req, res, next) => {

  const { password, verifyToken } = req.body;
 
  if ( !password || !verifyToken) {
    errors.empty = ' Client? Please Fill Your Data';
    return res.status(422).json(errors);
  } else if (verifyToken) {
    try {
      const decoded = jwt.verify(verifyToken, keys.secret);
      if (decoded) {
        bcrypt.hash(password, keys.saltRounds)
          .then((hash) => {
            User.findByIdAndUpdate(decoded._id, { password: hash })
              .then((user) => {
                const {password, ...userInfo} = JSON.parse(JSON.stringify(user));
                return res.status(200).json({ 
                  token: generateAuthToken(userInfo),
                  user: userInfo
                });
              })
              .catch((ex) => {
              errors.database = 'Client?  Please Validate Your Data First';
              return res.status(422).json(errors);
              })
          })
      } else {
        if (!decoded) {
          errors.reset = 'Your Token is invalid, Please try again';
          return res.status(422).json(errors);
        }
      }
    } catch (e) {
      errors.reset = e.message;
      return res.status(422).json(errors);
    }
  
  } else {
    errors.internal = 'Something went wrong, please try agian later';
    return res.status(422).json(errors);
  }

};

// Email Confirmation Form 
const confirmEmail = (req, res, next) => {

  const { email } = req.body;
  if (!email) {
    errors.empty = ' Client? Please Fill Your Data';
    return res.status(422).json(errors);

  } else if (email) {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          const verifyToken = generateVerifyToken(user);
          const htmlBody = `
            <div>
              <h1> Click the link below to confirm your email </h1>
              <a href=${CLIENT_URL}/confirm/${verifyToken}>Confirm Your Email</a>
              <p> Link expires in one hour </p>
              <p> If you does not signup with Dev Server just ignore this email</p>
            <div>
          `;
          const mailOptions = {
            from: 'Dev Server',
            to: user.email,
            subject: 'Dev Server | Confirm Your Email',
            html: htmlBody
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              errors.confirm = err.message
              res.status(422).json(errors);
              return process.exit(1);
              
            } else {
              success.confirm = info.accepted[0];
              return res.status(200).json(success);
            }
          });
        } else if (!user) {
          errors.confirm = 'There is no user with these credentials';
          res.status(422).json(errors);
        }
      })
      .catch((e) => {
    
        errors.internal = 'Something went wrond please try again later';
        return res.status(422).json(errors);
      })
  }

};

// Email Confirmation Token
const confirmToken = (req, res, next) => {

  const { verifyToken } = req.body;
  if (!verifyToken) {
    errors.empty = ' Client? Please Fill Your Data';
    return res.status(422).json(errors);
  } else if (verifyToken) {
    try {
      const decoded = jwt.verify(verifyToken, keys.secret);
      if (decoded) {
        User.findByIdAndUpdate( decoded._id, { isVerified: true })
          .then((user) => {
            const {password, ...userInfo} = JSON.parse(JSON.stringify(user));
            return res.status(200).json({ 
              token: generateAuthToken(userInfo),
              user: userInfo
            });
          })
          .catch((ex) => {
          errors.database = 'Client?  Please Validate Your Data First';
          return res.status(422).json(errors);
          })
      } else {
        if (!decoded) {
          errors.confirm = 'Your Token is invalid, Please try again';
          return res.status(422).json(errors);
        }
      }
    } catch (e) {
        errors.confirm = e.message;
        return res.status(422).json(errors);
    }
  } else {
      errors.internal = 'Something went wrong, please try agian later';
      return res.status(422).json(errors);
  }
  
};

module.exports = {
 contact,
 newsletter,
 reset,
 newPassword,
 confirmEmail,
 confirmToken
}
