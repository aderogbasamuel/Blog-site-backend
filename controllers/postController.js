const Post = require('../models/Posts');
const mongoose = require('mongoose')
const createPost = async (req, res) => {
  try {
    const posts = await Post.create(req.body);
    res.json(posts);
    
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog Not found" });
  }
  try {
    const post = await Post.findById(id)
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "error finding blog" })
  }
  
}

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      message: "Post deleted"
    });
    
  }
  catch (err) {
    res.status(500).json({ message: err.message })
  }
}


module.exports = {
  createPost,
  getPost,
  deletePost,
  getPostById
}