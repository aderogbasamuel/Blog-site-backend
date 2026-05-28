const Post= require('../models/Posts');

const createPost= async(req, res)=>{
  try{
    const posts= await Post.create(req.body);
    res.json(posts);
    
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
}

const getPost= async(req, res)=>{
  try{
    const posts= await Post.find();
    res.json(posts);

  }
  catch(err){
    res.status(500).json({message:err.message})
  }
}


const deletePost= async(req, res)=>{
  try{
     await Post.findByIdAndDelete(req.params.id);
    res.json({
      message: "Post deleted"
    });

  }
  catch(err){
    res.status(500).json({message:err.message})
  }
}


module.exports={
  createPost,
  getPost,
  deletePost
}