const CommentModel = require('../models/Comments');
const VideoModel = require('../models/Videos');
const {createError} = require("../middlewares/error");

const addComment = async (req, res, next) => {
    const newComment = new CommentModel({...req.body, userId: req.user.id})

    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        next(err);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const comment = await CommentModel.findById(req.params.id);
        const video = await VideoModel.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await CommentModel.findByIdAndDelete(req.params.id);
            res.status(200).json('The comment has been deleted')
        } else {
            return next(createError(403, 'You can only delete your comment'))
        }
    } catch (err) {
        next(err);
    }
}

const getComments = async (req, res, next) => {
    try {
        const comments = await CommentModel.find({videoId:req.params.videoId});
        res.status(200).json(comments)
    } catch (err) {
        next(err);
    }
}

module.exports = {addComment, deleteComment, getComments}