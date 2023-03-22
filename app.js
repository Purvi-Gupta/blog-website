//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash');
const { result } = require("lodash");

const port = process.env.PORT || 3000;
// const posts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// connection to the db

mongoose.connect("mongodb://localhost:27017/blogDB")
.then(()=>console.log(`connected to the database`))
.catch((err)=>console.log(err));

// schema

const postSchema = new mongoose.Schema({
  postTitle : String,
  postBody : String
});

//modal

const Post = new mongoose.model("Post",postSchema);

app.get("/",async (req,res)=>{

  const posts = await Post.find()
  // console.log(posts);
  res.render("home",{
    homeContant:homeStartingContent,
      posts:posts
    });
});

app.get("/about",(req,res)=>{
  res.render("about",{aboutContant:aboutContent});
});

app.get("/contact",(req,res)=>{
  res.render("contact",{contactContant:contactContent});
});

app.get("/compose",(req,res)=>{
    res.render("compose");
  });
  
app.post("/compose",(req,res)=>{
  
  const posts = new Post({
    postTitle : req.body.postTitle,
    postBody : req.body.postBody
  });

  // posts.push(post);

  const result = posts.save()
  .then(()=>{
    console.log(`post store in db`);
    res.redirect("/");
  })
  .catch((err)=>console.log(err));

  
  
});

app.get("/post/:postId",async (req,res)=>{
  
  const requestPara = req.params.postId;

  const post = await Post.findById(requestPara);

  res.render("post",{post:post})

  // posts.forEach((post)=>{
  //   const titlePara = _.lowerCase(post.postTitle);
  //   if (requestPara === titlePara) {
  //       res.render("post",{post:post})
  //   }else{
  //     console.log(`match not found`);
  //   }
  // })

});

app.listen(port, function() {
  console.log("Server started on port " + port);
});








