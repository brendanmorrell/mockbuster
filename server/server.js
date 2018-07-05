const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const User = require('../db/users.js');

const app = express();
const port = process.env.PORT || 8080;
let currentUser = {};

const github = {
  clientID: '1393fe5adf5f5882f79c',
  clientSecret: '719422b56f245e7c13f60da7223113f3c618e884',
  redirectURI: 'http://localhost:8080/home',
  corsAnywhere: 'https://cors-anywhere.herokuapp.com/',
  signInURL() {
    return `${this.corsAnywhere}https://github.com/login/oauth/authorize?client_id=${
      this.clientID
    }&redirect_uri=&${this.redirectURI}`;
  },
  postCodeURL: function() {
    return `https://github.com/login/oauth/access_token?client_id=${this.clientID}&client_secret=${
      this.clientSecret
    }&code=`;
  },
  authGetUrl: function() {
    return `https://api.github.com/user?`;
  },
};
let isAuthenticated = false;
console.log('​isAuthenticated', isAuthenticated);

const publicPath = path.join(__dirname, './../public/dist');
app.use(bodyParser.json());

app.post('/updatedata', (req, res) => {
  User.update({ githubID: currentUser.githubID }, { movies: req.body }, { multi: true });
});
app.get('/getdata', (req, res) => {
  User.find({ githubID: currentUser.githubID }, (err, userData) => {
    res.json(userData[0]);
  });
});
app.get('/authenticated/' || '/authenticated', (req, res) => {
  if (isAuthenticated) {
    res.sendFile(path.join(publicPath, 'index.html'));
  } else {
    res.redirect('/');
  }
});
app.get('/authenticated/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/bundle.js'));
});

app.get('/home', (req, res) => {
  const url = github.postCodeURL() + req.query.code;
  request.post(url, (err, gitRes, accessToken) => {
    const url = github.authGetUrl() + accessToken;
    const options = {
      url,
      headers: {
        'User-Agent': 'request',
      },
    };
    request.get(options, (err, gitRes, body) => {
      const userData = JSON.parse(body);
      const user = {
        githubID: userData.id,
        githubInfo: userData,
        movies: {
          wantToWatch: {},
          wantToRewatch: {},
          favorites: {},
        },
      };
      User.find({ githubID: user.githubID }, (err, findRes) => {
        if (!findRes.length) {
          User.create(user, (err, res) => {
            User.find({}, (err, newUser) => {
              currentUser.githubID = newUser[0].githubID;
            });
          });
        } else {
          currentUser.githubID = findRes[0].githubID;
        }
      });
      isAuthenticated = true;
      res.redirect('/authenticated/');
    });
  });
});
app.get('*', (req, res) => {
  if (isAuthenticated) {
    const startOfPath = req.path
      .split('')
      .slice(0, 15)
      .join('');
    if (startOfPath === '/authenticated/') {
      res.sendFile(path.join(publicPath, 'index.html'));
    } else if (startOfPath === '/bundle.js') {
      res.redirect('/authenticated/bundle.js');
    } else {
      res.redirect('/authenticated/');
    }
  } else {
    res.sendFile(path.join(__dirname, '../unathenticated/login.html'));
  }
});

app.listen(port, () => console.log(`server listening on port ${port}`));
