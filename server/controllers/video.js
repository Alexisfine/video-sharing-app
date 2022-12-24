const VideoModel = require('../models/Videos');
const UserModel = require('../models/Users');

const {createError} = require("../middlewares/error");

const addVideo = async (req, res, next) => {
    const newVideo = new VideoModel({userId: req.user.id, ...req.body});
    try {
        const saveVideo = await newVideo.save();
        res.status(200).json(saveVideo);
    } catch (err) {
        next(err);
    }
}

const updateVideo = async (req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        if (!video) return next(createError(404,'Video not found'));
        if (req.user.id === video.userId) {
            const updatedVideo = await VideoModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true});
            res.status(200).json(updatedVideo);
        } else {
            return next(createError(403,'You can only update your video'))
        }
    } catch (err) {
        next(err);
    }
}

const deleteVideo = async (req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        if (!video) return next(createError(404,'Video not found'));
        if (req.user.id === video.userId) {
            await VideoModel.findByIdAndDelete(req.params.id);
            res.status(200).json('The video has been deleted');
        } else {
            return next(createError(403,'You can only delete your video'))
        }
    } catch (err) {
        next(err);
    }
}

const getVideo = async (req, res, next) => {
    try {
        const video = await VideoModel.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}

const addView = async (req, res, next) => {
    try {
        await VideoModel.findByIdAndUpdate(req.params.id, {
            $inc:{views:1}
        });
        res.status(200).json('The view has been increased');
    } catch (err) {
        next(err);
    }
}

const random = async (req, res, next) => {
    try {
        const videos = await VideoModel.aggregate([{$sample:{size:40}}]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

const trend = async (req, res, next) => {
    try {
        const videos = await VideoModel.find().sort({videoViews:-1});
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

const sub = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id);
        const subscribedChannels = user.subscribeUsers;

        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return VideoModel.find({userId: channelId});
            })
        );
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
}

const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");

    try {
        const videos = await VideoModel.find({tags:{$in:tags}}).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

const search = async (req, res, next) => {
    const query = req.query.q;

    try {
        const videos = await VideoModel.find({title: {$regex: query, $options: "i"}}).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

module.exports = {addVideo, getVideo, updateVideo, deleteVideo, random, addView, sub, trend, getByTag, search}