const express = require('express');
const protect=require("../middleware/authMiddleware");
const router = express.Router();

const { createPost, getPost, deletePost, getPostById, likePost } = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getPost);
router.get('/:id', getPostById)
router.post("/:id/like", protect, likePost);
router.delete('/:id', deletePost);

module.exports = router;