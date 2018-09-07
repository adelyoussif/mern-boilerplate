# MERN Boilerplate

### It's just a boilerplate

  * Client based on [create-react-app](https://github.com/facebook/create-react-app)
  * Client and api are totally seperate 
  * Basic Functionality:
      * Signup
      * Login 
      * Logout
      * Email Confirmation 
      * Reset Password
      * Contact Form
      * Newsletter
   * Main Stack: __React__ | __Redux__ | __Express__ | __MongoDB__
   * Main Packages: **mongoose** | **jsonwebtoken** | **bcrypt** | **nodemailer** | **react-router-dom** | **axios** | **node-sass** | **redux-thunk**
  
### Config 

In api/config/dev.js we need to change:
  * Google Credentials: Just gmail address **gmailUser** and password **gmailPass** -- create a new account 
  * Mailchimp Credentials: Create API Key **MC_ID**  and create List and get it's ID  **MC_List**
  * MongoBD URL: if you do not have it locally  **DB_URL**

### Start 
    open your terminal
    cd api 
    yarn install or npm install
    yarn run dev or npm run dev
    api is now running in port 8080

    open another terminal
    cd client 
    yarn install or npm install 
    yarn start or npm start
    client is now running in port 3000
    
    make sure your mongoDB is runnning too 
  

