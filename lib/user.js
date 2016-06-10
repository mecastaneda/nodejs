'use strict';

var User = require('../models/user');

var UserLibrary = function() {
  return {
    addUser: function(email, password) {
      var user = new User({
        email: email,
        password: password
      });

      return user.save();
    },
    addDefaultUsers: function() { //add two users
      var u1 = new User({
        email: 'test@currency.com',
        password: 'qwerty1'
      });

      //Ignore errors. In this case, the errors will be for duplicate keys as we run this app more than once.
      u1.save();
    },
    serialize: function(user, done) {
      done(null, user.id);
    },
    deserialize: function(id, done) {
      User.findOne({
        _id: id
      }, function(err, user) {
        done(null, user);
      });
    },

    addTransaction: function(userId, transaction, done) {
      User.findOne({
        _id: userId
      }, function(err, user) {
        user.transactions.push(transaction);
        user.save(done);
      });
    },

    getTransactions: function(userId, done) {
      User.findOne({
        _id: userId
      }, function(err, user) {
        done(null, user.transactions);
      });
    }
  };
};

module.exports = UserLibrary;
