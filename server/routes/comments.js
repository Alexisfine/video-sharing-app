const express = require('express');
const {verifyToken} = require("../middlewares/verifyToken");
const {addComment, deleteComment, getComments} = require("../controllers/comment");

const router = express.Router();

// Add comment
router.post('/', verifyToken,addComment);

// Delete comment
router.delete('/:id', verifyToken,deleteComment);

// Get comments
router.get('/:videoId',getComments);


module.exports = router;