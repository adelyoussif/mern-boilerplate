module.exports = {
  DB_URL: process.env.MONGO_URI, // Database URL
  secret: process.env.SECRET,  // jwt
  saltRounds: process.env.SALT_ROUNDS, // bcrypt
  MC_ID: process.env.MC_ID, // Mailchimp
  MC_List: process.env.MC_LIST, // Mailchimp
  gmailUser: process.env.GMAIL_USER, // Gmail Username
  gmailPass: process.env.GMAIL_PASS,  // Gmail Password
  clientURL: process.env.CLIENT_URL // CLient URl 
};
