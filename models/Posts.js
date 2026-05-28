const mongoose= require('mongoose');

const PostSchema=new mongoose.Schema({
  title: String,
  body: String,
  image:String,
  category: String,
  createdAt: {
    type: Date,
      default: Date.now,
  }
});

module.exports=mongoose.model('Post', PostSchema);