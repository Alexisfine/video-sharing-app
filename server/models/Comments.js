const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},{timestamps: true});

module.exports = mongoose.model('Comment',commentsSchema);