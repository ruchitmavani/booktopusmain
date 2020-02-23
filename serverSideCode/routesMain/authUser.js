var express = require('express');
var router = express.Router();
var cors = require('cors');
var auth = require('../middleware/auth');

// User details are stored in this variable 
const userModel = require('../models/register.model');

router.use(cors());

/**
 * GET request :/users/accessAuthintication
 * ACCESS : private
 */
router.route('/accessAuthintication')
    .get(auth, (req, res) => {

        userModel.findById(
            req.user._id
        )
            .select('-password')
            .then(user => res.json(user));
    })

module.exports = router;