'use strict';

var express = require('express'),
    passport = require('passport'),
    auth = require('../lib/auth'),
    userLib = require('./user')(),
    db = require('../lib/database'),
    crypto = require('../lib/crypto'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    morgan = require('morgan');

module.exports = function spec(app) {
  app.on('middleware:after:session', function configPassport(eventargs) {
    app.use(morgan('dev')); // log every request to the console
    //Tell passport to use our newly created local strategy for authentication
    passport.use(auth.localStrategy());

    app.use(cookieParser())
    app.use(bodyParser.json());

    app.use(session({
      secret: 'L0r3m 1p5uM',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));
    //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
    passport.serializeUser(userLib.serialize);
    passport.deserializeUser(userLib.deserialize);
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(flash());
  });
  return {
    onconfig: function(config, next) {

      var dbConfig = config.get('databaseConfig'),
      cryptConfig = config.get('bcrypt');

      crypto.setCryptLevel(cryptConfig.difficulty);
      db.config(dbConfig);
      userLib.addUsers();
      next(null, config);
    }
  };

};
