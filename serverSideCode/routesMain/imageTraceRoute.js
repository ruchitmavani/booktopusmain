/**
 * This route is created for converting image into the text
 * And send it as a json msg to the frontend for display purpose
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var multer = require('multer');
var Tesseract = require('tesseract.js');
var path = require('path');
var fs = require('fs');


router.use(cors());

var imageUploadPath = './public/tracedImages/';

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
/**
 * POST '/book/imageTrace'
 * Private route
 */
router.route('/imageTrace')
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

                var imagePath = '../serverSideCode/public/tracedImages/' + req.file.filename;
                try {

                    //console.log(imagePath);
                    //let image = req.file;
                    Tesseract.recognize(imagePath)
                        .then(result => {

                            res.status(200).json({ msg: result.data.text });

                            /**
                             * This deletes the uploaded image after being traced !
                             * We delete the image after tracing just to remove unwanted
                             * images to be uploaded to the system.
                             * We will store the image into the system when the submit 
                             * button is clicked !
                             */
                            fs.unlink(imagePath, (err) => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                                console.log('Traced image successfully deleted !');
                            })
                        })
                        .catch(err => {

                            fs.unlink(imagePath, (err) => {
                                if (err) {
                                    console.error(err)
                                    return
                                }
                            })

                            res.status(400).json({ msg: 'Error in file tracing :' + err });

                        })
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