const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./routes/users');
const VideoRoutes = require('./routes/videos');
const CommentRoutes = require('./routes/comments');

export {}

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

app.use('/api/users',UserRoutes);
app.use('/api/videos',VideoRoutes)
app.use('/api/comments',CommentRoutes)




app.listen(8800, ()=>{
    connect();
    console.log('server connected')
})
