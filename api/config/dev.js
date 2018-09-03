module.exports = {
  DB_URL: 'mongodb://localhost:27017/dev', // Database URL
  secret: asdfghjklqwerty,  // jwt
  saltRounds: 10, // bcrypt
  MC_ID: process.env.MC_ID, // Mailchimp
  MC_List: process.env.MC_LIST, // Mailchimp
  gmailUser: process.env.GMAIL_USER, // Gmail Username
  gmailPass: process.env.GMAIL_PASS,  // Gmail Password
  clientURL: 'http://localhost:3000'// CLient URl 
};
