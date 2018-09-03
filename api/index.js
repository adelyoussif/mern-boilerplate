// export DEBUG=App:Debugger,DB:Debugger,Morgan:Debugger
const path = require('path');
const appDebugger = require('debug')('App:Debugger');
const dbDebugger = require('debug')('DB:Debugger');
const morganDebugger = require('debug')('Morgan:Debugger');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const compression = require('compression') // You May Consider using brotli For Compression 
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Use Express 
const app = express();

// To Handle Uncaughted Errors 
process.on('uncaughtException', (ex) => {
  appDebugger(`Uncaught Exception: ${ex.message}`);
  process.exitCode = 1;
});

// To Handle Promise Rejections
process.on('unhandledRejection', (ex) => {
  appDebugger(`Unhandled Rejection: ${ex.message}`);
  process.exitCode = 1;
});

// Connect to The Database Using Mongoose
const DB_URL = keys.DB_URL;
mongoose.connect(DB_URL,  { useNewUrlParser: true })
  .then(() => { dbDebugger(`App is now connected to databse`)})
  .catch((e) => { dbDebugger(`Error: ${e.message} || Error Code: ${e.code}`)})

mongoose.set('useCreateIndex', true);

// Import Models
require('./models/User');

// Add Middlewares // 
// Use Body Parser
app.use(bodyParser.json({type: '*/*'}));
// Use Helmet Middleware -- Do Your Own Configuration 
app.use(helmet());
// Use CORS Middleware -- Edit to Match Your Configuration
const whitelist = [ keys.clientURL ]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
// Use Morgan to Log HTTP Request
app.use(morgan('dev', { stream: { write: msg => morganDebugger(msg) } }));
// Use Compression to Compress Responses
app.use(compression());
// Use Express Rate Limit -- To Limit Requests Rate Per User 
/* app.enable('trust proxy'); */  // add me if you're behind a reverse proxy
const limiter = new RateLimit({
  windowMs: 15*60*1000,  // 15 min
  max: 100, 
  delayMs: 0
});
app.use(limiter); // You may add it to specific routes only

// Import Routes
require('./routes/Router')(app)

//Server Static Files -- It's oky to delete me (:
// Test Me @ http://localhost:8080/static/js.gif 
app.use('/static', express.static(path.join(__dirname, 'public')));

// Use Error Middleware -- to Handle Catched Errors 
app.use((err, req, res, next) => {
  res.status(500);
  res.send({ error: err });
});

// Define PORT 
const port = process.env.PORT || 8080;
// Create http Server 
app.listen(port, () => {
  appDebugger(`Server is Running @ Port ${port}`);
});

// For Later use with SSL 
/* const https = require('https');

const server = https.createServer(credentials, app);

server.listen(port, () => {
  appDebugger(`Server is Running @ Port ${port}`);
}); */
