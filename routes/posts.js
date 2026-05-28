const express= require('express');

const router= express.Router();

const {createPost, getPost, deletePost}= require('../controllers/postController');

router.post('/', createPost);
router.get('/', getPost);
router.delete('/:id', deletePost);

module.exports = router;