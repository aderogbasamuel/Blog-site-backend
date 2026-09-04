require("dotenv").config();
const express= require('express');
const cors= require('cors');
const mongoose = require('mongoose');
const app= express();

const postRoutes=require('./routes/posts');
const authRoutes=require('./routes/auth');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Devdrogba:samblog123@cluster0.8sdck76.mongodb.net/?appName=Cluster0').then(()=>{
  console.log("connected to mongodb")
}).catch(err=> console.log(err));

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('sam.exe api running');
});

app.listen(5000,()=> {
  console.log("server running");
})
