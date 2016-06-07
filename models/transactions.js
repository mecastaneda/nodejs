/**
 * A model for the transactions
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var transactionModel = function() {

  var transactionSchema = Schema({
    date: { type: Date, default: Date.now },
    transactionType: String,
    receiver: String,
    currency: String,
    amount: Number,
    _user: {type: Schema.Types.ObjectId, ref: 'User'}
  });

  return mongoose.model('Transaction', transactionSchema);
}

module.exports = new transactionModel();
