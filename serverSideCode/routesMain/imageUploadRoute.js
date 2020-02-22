/**
 * This route is used for uploading images
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var multer = require('multer');
var path = require('path');
router.use(cors());

var imageUploadPath = './public/uploads/';

/**
 * Image uploading setting is here
 */
// Uploaded images will be stored in disk storage
const storage = multer.diskStorage({
    destination: imageUploadPath,
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

// //initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 3e+6 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('images');

// checking file type 
function checkFileType(file, cb) {

    const validExtentions = /jpeg|png|jpg/;

    const checkExtentionName = validExtentions.test(path.extname(file.originalname).toLowerCase());

    if (checkExtentionName) {
        return cb(null, true);
    }
    else {
        cb('Images only in jpeg ,png or jpg format');
    }
}


router.route('/uploadBook')
    .post(async (req, res, next) => {

        await upload(req, res, (err) => {

            if (err) {
                res.status(400).json({ msg: 'Error :' + err });
            }
            else if (req.file === undefined) {

                res.status(400).json({ msg: 'Please select a file!' });
            }
            else {
                //var imagePath = fs.readFileSync('../public/uploads/' + req.file.filename, { encoding: null });

                var imagePath = '../serverSideCode/public/uploads/' + req.file.filename;
                try {


                } catch (error) {

                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    })

                    res.status(400).json({ msg: 'Error in ' + error });
                }
            }
        })
    })


module.exports = router;