const express = require('express');
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require('express-openid-connect');

const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//const UserProfile = require('./controller/model');
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  //.use('/', require('./route'));

// Mongoose database connection
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to MongoDb`);
  }
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   // console.log('root route')
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

app.get('/login', (req, res)=> {
  console.log('Login Success');
  console.log('Redirect to ', process.env.ISSUER_BASE_URL + '/authorize');
  res.oidc.login();
})

// app.get('/logout', (req, res)=> {
//   console.log('logout Success');
//   console.log('Redirect to ', process.env.ISSUER_BASE_URL + '/authorize');
//   res.oidc.logout();
// })

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use('/api-docs', requiresAuth(),swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});