
const express = require('express');
const {verifyToken} = require("../middlewares/verifyToken");
const {addVideo, updateVideo, deleteVideo, getVideo, addView, trend, random, sub, getByTag, search} = require("../controllers/video");

const router = express.Router();

// create video
router.post('/', verifyToken, addVideo)

// update video
router.put('/:id', verifyToken, updateVideo)

// delete video
router.delete('/:id', verifyToken, deleteVideo)

// get video
router.get('/find/:id', getVideo)

// add view
router.put('/view/:id', addView)

// trend
router.get('/trend', trend)

// random
router.get('/random', random)

// subscription
router.get('/sub', verifyToken, sub)

// get video by tags
router.get('/tags', getByTag)

// get video by title
router.get('/search', search)


module.exports = router;