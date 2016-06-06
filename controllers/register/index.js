'use strict';

var request = require('request');

module.exports = function(router) {

  router.post('/', function(req, res, next) {

    console.log('req.body', req.body);

    request.post('http://www.google.com/recaptcha/api/verify', {
            //should always store private keys as environment variables for many reasons
            form: {privatekey: process.env.RECAPTCHA_PRIVATE_KEY,
                //need requestors ip address
                remoteip: req.connection.remoteAddress,
                challenge: req.body.captcha.challenge,
                response: req.body.captcha.response}
        },
        function (err, _res, body) {

            //if the request to googles verification service returns a body which has false within it means server failed
            //validation, if it doesnt verification passed
            if (body.match(/false/) === null) {

               res.status(200).send('email sent');
               //TODO Register the new user in the DB
            } else {
                res.status(500).json({message: "Recaptcha Validation Failed.  Please Re-Enter the reCAPTCHA challenge.", err: err})
            }

        });
  });
}
