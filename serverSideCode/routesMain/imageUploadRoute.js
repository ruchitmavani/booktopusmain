/**
 * This route is used for uploading images
 */
var express = require('express');
var router = express.Router();
var cors = require('cors');
var multer = require('multer');
var path = require('path');
var bookModel = require('../models/uploadBook.model');

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

                    var newBook = new bookModel({

                        book_title: req.body.book_title,
                        description: req.body.description,
                        authorName: req.body.authorName,
                        branch: req.body.branch,
                        semester: req.body.semester,
                        edition: req.body.edition,
                        isbnCode: req.body.isbnCode,
                        imageName: req.file.filename,
                        availability: 1,
                        uploadedBy_id: req.body.user_id
                    })

                    newBook.save()
                        .then((result, err) => {

                            res.status(200).json({ msg: 'Your book is uploaded successfully.' });
                        })
                        .catch(err => {
                            res.status(400).json({ msg: 'Error :' + err });
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

router.route('/getBookData')
    .get(async (req, res, next) => {

        await bookModel.find()
            .then(docs => {

                res.status(200).json({ bookData: docs });
            })
            .catch(err => {
                res.status(400).json({ msg: 'Error :' + err });
            })
    })

module.exports = router;