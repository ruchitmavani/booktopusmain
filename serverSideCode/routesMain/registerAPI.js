var express = require('express');
var router = express.Router();
var cors = require('cors');
var bcrypt = require('bcrypt');

// User details are stored in this variable 
const userModel = require('../models/register.model');
const codeModel = require('../models/verifyEmail.model');
router.use(cors());

process.env.SECRET_KEY = 'djnvbc';

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

        // console.log(userData.first_name + ' ' + userData.last_name + ' ' + userData.email + ' ' + userData.password + ' ' + userData.contact + ' ' + code);

        /**
         * This requestTime is generated when a /users/signup POST request is sended !!
        */
        var requestTime = Math.round((new Date()).getTime() / 1000);

        if (!userData.first_name || !userData.last_name || !userData.email || !userData.password || !userData.gender || !userData.contact) {
            console.log(userData.first_name + ' ' + userData.last_name + ' ' + userData.email + ' ' + userData.password + ' ' + userData.gender + ' ' + userData.contact);
            return res.status(400).json({ msg: 'Please enter all the details' }).end();
        };

        codeModel.findOne({
            email: userData.email
        })
            .then((doc, err) => {

                var dbCode = doc.sixDigitCode;

                if (err) return res.status(400).json({ msg: 'Error :' + err });

                else if (dbCode !== code) {
                    res.status(400).json({
                        msg: 'Code is invalid, please try to register again'
                    }).end();

                }

                else {

                    if (requestTime >= doc.expireTime) {
                        res.status(401).json({ msg: 'Your code is expired, please try again later' }).end();
                    };

                    bcrypt.hash(req.body.password, 10, (err, hash) => {

                        if (err) return res.status(400).json({ msg: 'Error :' + err }).end();

                        userData.password = hash;
                        userData.save()
                            .then((result, err) => {
                                if (err) throw err;
                                res.status(200).json({ msg: 'You have successfully registered with email id: ' + result.email }).end();
                            })
                            .catch(err => {
                                res.status(400).json({ msg: 'Error :' + err }).end();
                            });
                    })
                }
            })
            .catch(err => {
                res.status(400).json({ msg: 'Error :' + err }).end();
            })
    });

module.exports = router;