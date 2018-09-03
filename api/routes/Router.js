const Auth = require('../middlewares/auth.js');
const Mail = require('../middlewares/mail.js');

module.exports = function(app) {

  app.post('/login',   Auth.login); // Expect { login: 'email or username', password }
  app.post('/signup', Auth.signup); // Expect { email, password, username, firstName, lastName }
  app.post('/contact', Mail.contact); // Expect { name, email, subject, content }
  app.post('/subscribe', Mail.newsletter); // Expect { email }
  app.post('/reset', Mail.reset); // Expect { login: 'email or username' }
  app.post('/newpassword', Mail.newPassword); // Expect { password, verifyToken }
  app.post('/confirm/token', Mail.confirmToken); // Expect { verifyToken }
  app.post('/confirm/email', Mail.confirmEmail); // Expect { email }
  app.get('/', (req, res) => {  // Delete Me 
    return  res.send('<h1 style="text-align:center;color:#000015;margin:48px;">Server is Running @ Client Browser</h1>');
  });
  
}
