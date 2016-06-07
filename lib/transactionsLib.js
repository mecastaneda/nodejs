var Transactions = require('../models/transactions');
var User = require('../models/user');

var TransactionsLib = function() {
  return {
    addTransaction: function(userId, transaction, done) {

      var transac = new Transactions({
        date: transaction.date,
        transactionType: transaction.type,
        receiver:  transaction.receiver,
        currency: transaction.currency,
        amount: transaction.amount,
        _user: userId
      });

      transac.save(function(err) {
        if(err) {
          console.error('Error', err);
          return done(err, null);
        }

        // Updating the user
        //User.findOne({_id: userId})

        console.log('Transaction created');
        done(null, transac);
      })
    }
  };
};

module.exports = TransactionsLib;
