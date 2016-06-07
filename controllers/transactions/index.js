'use strict';

//var passport = require('passport');
var transactionsLib = require('../../lib/transactionsLib')();
var userLib = require('../../lib/user')();

module.exports = function(router) {

  router.get('/', function(req, res, next) {
    var userId = req.user._id;
    console.log('userId', userId);
    console.log('req.user', req.user);
    userLib.getTransactions(userId, function(err, transactions) {
      console.log('sending:', {"transactions": transactions});
      res.json({"transactions": transactions});
    })

  });

  router.post('/', function(req, res, next) {
    var transaction = req.body;
    var userId = req.user._id;
    //var userId = req._passport.session.user;
    transactionsLib.addTransaction(userId, transaction,
      function(err) {
        if(!err)
          return res.end();
        res.json({"message": "all ok"});
      });
    /*console.log('transaction', transaction);
    console.log('userId', userId);
    console.log('req.user', req.user);
    res.json({"message": "all ok"}) */
  });

}
