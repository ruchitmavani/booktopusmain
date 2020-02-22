const mongoose = require('mongoose');

/**connection to the database */
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@demodb-ynmyj.mongodb.net/booktopus?retryWrites=true&w=majority');

var uploadBookSchema = mongoose.Schema({

    book_title: String,
    description: String,
    authorName: String,
    branch: String,
    semester: String,
    edition: Number,
    isbnCode: Number,
    availability: Boolean,

    uploadedBy_id: {
        type: mongoose.Schema.Types.ObjectId
    },

    uploadedAt: {
        type: Date,
        default: Date.now(),
    }
})

var uploadBookModel = mongoose.model('upload_book_collection', uploadBookSchema);

module.exports = uploadBookModel;