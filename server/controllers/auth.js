const mongoose = require('mongoose');
const UserModel = require('../models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {createError} = require("../middlewares/error");

const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new UserModel({...req.body,password:hash});
        await newUser.save();
        res.status(200).json('user has been created')
    } catch (err) {
        next(err);
    }
}

const signin = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({name:req.body.name});
        if (!user) return next(createError(404, "User not found"));
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong username or password"));

        const token = jwt.sign({id: user._id}, process.env.JWT);
        const {password, ...others} = user._doc;
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(others);
    } catch (err) {
        next(err);
    }
}

const googleAuth = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })
        if (user) {
            const token = jwt.sign({id: user._id}, process.env.JWT);
            res.cookie("access_token",token,{
                httpOnly:true,
            }).status(200).json(user._doc);
        } else {
            const newUser = new UserModel({...req.body, fromGoogle: true});
            const savedUser = await newUser.save();
            const token = jwt.sign({id: savedUser._id}, process.env.JWT);
            res.cookie("access_token",token,{
                httpOnly:true,
            }).status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {signup, signin,googleAuth}