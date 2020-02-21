var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var auth = require('../middleware/auth');

// User details are stored in this variable 
const userModel = require('../models/register.model');
const codeModel = require('../models/verifyEmail.model');
router.use(cors());

process.env.SECRET_KEY = 'djnvbc';

/** Mail sending post method */
// @post /users/sendMail

router.route('/sendMail')


  .post((req, res, next) => {

    const email = req.body.email;

    userModel.findOne({
      email
    })
      .then(doc => {

        if (!doc) {

          var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'booktopus.info@gmail.com',
              pass: 'ruchit6069'
            }
          });

          var digitCode = Math.floor(100000 + Math.random() * 900000);

          const mailOptions = {
            from: 'booktopus.info@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Please verify your email', // Subject line
            html: '<p>To verify your identity, please use the following code:</p><h3>' + digitCode + '</h3><p>Please Do not share with others</p>'// plain text body

          };

          smtpTransport.sendMail(mailOptions, (error, res) => {

            if (error) return res.status(500).json({ msg: 'Internal server error' });

            else {
              /**
               * Deleting existing code from existing email id
               * before we store new email code.. we delete old email codes..
               * after deletion we save a new generated code to the verification collection
               */
              console.log('Deleting existing ')

              codeModel.find({
                email
              })
                .deleteMany()
                .exec()

              console.log('Deleted old codes.. Now storing new code');

              /**
               * Saving new code into the data base
               */
              var newCode = new codeModel({

                email: email,
                sixDigitCode: digitCode,
                expireTime: Math.round((new Date()).getTime() / 1000) + 1800
              })

              newCode
                .save()
                .then(document => {
                  console.log('Saved into the DB');
                }
                )
                .catch(err => {
                  console.log('error' + err);
                })

            }
          })

          res.status(200).json({
            msg: 'Mail sent to email id:' + email
          })
        }

        else {

          return res.status(400).json({
            msg: 'User already exists, Please try again with another email'
          }
          )
        }
      })
      .catch(err => {

        res.status(400).json({ msg: 'Error ' + err });
      })
  })

/* POST user registration form details. */
// @post /users/signup

router.route('/signup')

  .post((req, res, next) => {

    //console.log(req.body);

    const userData = new userModel({

      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      gender: req.body.gender
    })

    var code = req.body.code;

    /**
     * This requestTime is generated when a /users/signup POST request is sended !!
    */
    var requestTime = Math.round((new Date()).getTime() / 1000);

    console.log(userData.first_name + ' ' + userData.last_name + ' ' + userData.email + ' ' + userData.password + ' ' + userData.contact + ' ' + userData.gender);

    if (!userData.first_name || !userData.last_name || !userData.email || !userData.password || !userData.gender || !userData.contact) {
      return res.status(400).json({ msg: 'Please enter all the details' });
    }
    else {

      /** First step we are checking wheather the code is right or not !!!! */
      /**Code is stored in different collection valled 'verificationCollection' */
      codeModel.findOne({ email: userData.email })

        .then((doc, res) => {

          if (doc) // which says that user's email and code is in the database
          {
            if (doc.expireTime < requestTime) {
              res.status(406).json({ msg: 'Your code is expired !! Please try again with the registration process' });
            }

            /** 
             * This is called when a code is not expired
             * And from here, we will match six digit code
             * This is called only when a requestTime > expireTime, Which means when a code is alive
            */
            else {

              if (doc.sixDigitCode === code) {

                /** Here if code are matched then it will store the data */
                /**Registration process starts from here....*/
                /** Checking wheather user is already available or not */
                userModel.findOne({
                  email: userData.email
                })
                  /** result is the respons from mongodb */
                  .then(result => {

                    if (!result) {

                      bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash;
                        userData.save()
                          .then(result => {
                            res.status(200).json(
                              { msg: 'You have successfully registered with email id: ' + result.email });
                          }
                          )
                      })
                    }
                    else {

                      return res.status(400).json({ msg: 'User already exists, please try again with another email id' });
                    }

                  })
                  .catch(err => {
                    //res.send('error ' + err);
                    res.status(400).json({ msg: 'Error' + err });
                  })
              }
              else {
                res.status(400).json({ msg: 'Code mismatched' });
              }
            }

          }
          else {
            res.status(400).json({ msg: 'Your code is expired.... Please register again !!!!' });
          }
        })
        .catch(err => {
          res.status(400).json({ msg: 'Error' + err });
        })
    }

  })

router.route('/register')
  .post((req, res, next) => {

    const userData = new userModel({

      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      gender: req.body.gender
    })

    var code = req.body.code;

    /**
     * This requestTime is generated when a /users/signup POST request is sended !!
    */
    var requestTime = Math.round((new Date()).getTime() / 1000);

    if (!userData.first_name || !userData.last_name || !userData.email || !userData.password || !userData.gender || !userData.contact) {
      console.log(userData.first_name + ' ' + userData.last_name + ' ' + userData.email + ' ' + userData.password + ' ' + userData.gender + ' ' + userData.contact);
      return res.status(400).json({ msg: 'Please enter all the details' });
    }

    codeModel.findOne({
      email: userData.email
    })
      .then(doc => {

        if (doc.sixDigitCode != code) {
          res.status(400).json({
            msg: 'Code is invalid, please try to register again'
          })
        }

        else {

          if (requestTime >= doc.expireTime) {
            res.status(401).json({ msg: 'Your code is expired, please try again later' });
          }

          bcrypt.hash(req.body.password, 10, (err, hash) => {

            if (err) return res.status(400).json({ msg: 'Error :' + err });

            userData.password = hash;
            userData.save()
              .then(result => {
                res.status(200).json({ msg: 'You have successfully registered with email id: ' + result.email })
              })
              .catch(err => {
                res.status(400).json({ msg: 'Error :' + err });
              })
          })
        }
      })
      .catch(err => {
        res.status(400).json({ msg: 'Error :' + err })
      })

  })


/** POST login form */
// @post /users/login

router.route('/login')

  .post((req, res, next) => {

    userModel.findOne({
      email: req.body.email
    })

      .then(result => {

        if (result) {

          if (bcrypt.compareSync(req.body.password, result.password)) {
            const payload = {

              _id: result._id,
              first_name: result.first_name,
              last_name: result.last_name,
              email: result.email
            }

            /** From now we are providing stateless authentication by jwt-tokens */
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            },

              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token,
                  id: result._id,
                  first_name: result.first_name,
                  last_name: result.last_name,
                  email: result.email,
                  msg: 'You are successfully logged in.'
                });
              }
            )

          }
          else {
            //res.json('User does not exists, please enter valid Email and Password');
            res.status(400).json({ msg: 'Wrong password !' });
          }
        }
        else {
          res.status(400).json({ msg: 'User does not exists, please register yourself first!' });
        }
      })
      .catch((err) => {
        res.status(400).json({ msg: 'Error ' + err });
      })
  })

router.route('/profile')

  .get((req, res) => {

    /** Decoding the encoded user data */
    var decoded = jwt.verify(req.header['authorization'], process.env.SECRET_KEY);

    /** setting _id */
    userModel.findOne({
      _id: decoded._id
    })
      .then(result => {

        if (result) {
          res.json(result);
        }
        else {
          res.json('No user found !!');
        }
      })
      .catch(err => {
        res.send('error ' + err);
      })
  })


module.exports = router;
