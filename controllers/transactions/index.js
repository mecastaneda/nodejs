'use strict';

var userLib = require('../../lib/user')();

module.exports = function(router) {
  router.all('*', isLoggedIn);

  router.get('/', function(req, res, next) {
    var userId = req.user._id;
    userLib.getTransactions(userId, function(err, transactions) {
      if(err) return res.end();
      res.json({"transactions": transactions});
    });
  });

  router.post('/', function(req, res, next) {
    var transaction = req.body;
    var userId = req.user._id;
    transaction.currency = transaction.currency.code;
    console.log('adding', transaction);
    userLib.addTransaction(userId, transaction,
      function(err) {
        if(!err) {
          console.error('Error occurred', err);
          return res.end();
        }
        res.json({"message": "all ok"});
      });
  });

  router.get('/app_id', function (req, res, next) {
    res.send('614936a05f4e45dd929084e0022b365e');
  });

}

function isLoggedIn(req,res,next) {
	if (req.isAuthenticated()) {
    console.log('user IS authenticated');
		return next();
	}
	console.log('user is NOT authenticated');
  return res.status(401).send('You need to log-in first');
}
