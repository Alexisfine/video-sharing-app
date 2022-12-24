const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');

const UserRoutes = require('./routes/users');
const VideoRoutes = require('./routes/videos');
const CommentRoutes = require('./routes/comments');
const AuthRoutes = require('./routes/auth');


const app = express();
dotenv.config();

const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('connected to db')
    } catch (err) {
        console.log(err)
    }
}
app.use(cookie());
app.use(express.json());
app.use('/api/users',UserRoutes);
app.use('/api/videos',VideoRoutes);
app.use('/api/comments',CommentRoutes);
app.use('/api/auth',AuthRoutes);


// middleware

// error handler
app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
})

app.listen(8900, ()=>{
    connect();
    console.log('server connected')
})
