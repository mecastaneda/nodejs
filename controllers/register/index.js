'use strict';

var request = require('request'),
userLib = require('../../lib/user.js')();

module.exports = function(router) {

  router.post('/', function(req, res, next) {

    var newUser = req.body;

    request.post('https://www.google.com/recaptcha/api/siteverify', {
      //should always store private keys as environment variables for many reasons
      form: {secret: process.env.RECAPTCHA_PRIVATE_KEY,
        response: req.body.response,
        //optional
        remoteip: req.connection.remoteAddress}
      },
      function (err, _res, body) {

        //if the request to googles verification service returns a body which has false within it means server failed
        //validation, if it doesnt verification passed
        if (body.match(/false/) === null) {
          userLib.addUser(newUser.username, newUser.password).then(
            function success() {
              res.status(200).send('added new user');
            },
            function failed(err) {
              console.log('Err', err);
              res.status(400).json({message: "Email is already being used"})
            }
          );

        } else {
          res.status(500).json({message: "Recaptcha Validation Failed.  Please Re-Enter the reCAPTCHA challenge.", err: err})
        }

      });
    });
  }
