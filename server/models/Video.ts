const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    videoViews: {
        type: Number,
        default: 0,
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
},{timestamps: true});

export default mongoose.model('Video',VideoSchema);