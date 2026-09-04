const Post = require("../models/Posts");
const mongoose = require("mongoose");
const createPost = async (req, res) => {
  try {
    const posts = await Post.create(req.body);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog Not found" });
  }
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "error finding blog" });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      message: "Post deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.some(
      (userId) => userId.toString() === req.user.toString()
    );

    if (alreadyLiked) {
      // Unlike
      post.likes.pull(req.user);
    } else {
      // Like
      post.likes.push(req.user);
    }

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error("LIKE ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost,
  getPostById,
  likePost,
};
