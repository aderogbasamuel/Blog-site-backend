const express = require('express');

const router = express.Router();

const { createPost, getPost, deletePost, getPostById } = require('../controllers/postController');

router.post('/', createPost);
router.get('/', getPost);
router.get('/:id', getPostById)
router.delete('/:id', deletePost);

module.exports = router;