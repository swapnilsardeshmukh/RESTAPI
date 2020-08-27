
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app=express();

app.set("view engine",'ejs');

app.use(bodyParser.urlencoded({  extended: true}));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true ,useUnifiedTopology: true});


//article schema
const articleSchema ={
  title: String,
  content: String
}

//create model
const Article=mongoose.model("Article",articleSchema);

app.use(express.static("public"));

app.route("/articles").get(function(req,res){
  Article.find(function(err,foundArticles){
    if(!err){
      //console.log(foundArticles);
      res.send(foundArticles);
    }
    else
    {
      res.send(err);
    }

  })
})

.post(function(req,res){
//  console.log(req.body.title);
//  console.log(req.body.content);

  const newArticle = new Article({
    title:req.body.title,
    content:req.body.content
  });

  newArticle.save(function(err){
    if(!err)
    {
      res.send("Successfully added");
    }
    else
    {
      (err);
    }
  });
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err)
    {
      res.send("Successfully added");
    }
    else
    {
      (err);
    }
  })
});

//Request for specific Article

app.route("/articles/:articleTitle")
.get(
//  req.params.articleTitle ="jquery";
  function(req,res){
  Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
    if(foundArticle)
    {
      res.send(foundArticle);
    }
    else
    {
      res.send("No article found");
    }
  })
  }
)
.put(function(req,res){
  Article.updateMany({title:req.params.articleTitle},
    {title:req.body.title, content:req.body.content},
    {overwrite:true},
    function(err){
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send("Whole Article Updated");
    }
  })
})
.patch(function(req,res){
  Article.updateMany({title:req.params.articleTitle},
    {$set:req.body},
    {overwrite:true},
    function(err){
    if(err)
    {
      res.send(err);
    }
    else
    {
      res.send("Given part of Article Updated");
    }
  })

})
.delete(function(req,res){
  Article.deleteOne({title:req.params.articleTitle},function(err){
    if(!err)
    {
      res.send("Successfully deleted provide article");
    }
    else
    {
      (err);
    }
  })
});

//GET/ Articles
// app.get("/articles",function(req,res){
//   Article.find(function(err,foundArticles){
//     if(!err){
//       //console.log(foundArticles);
//       res.send(foundArticles);
//     }
//     else
//     {
//       res.send(err);
//     }
//
//   })
// })

//POST

// app.post("/articles",function(req,res){
// //  console.log(req.body.title);
// //  console.log(req.body.content);
//
//   const newArticle = new Article({
//     title:req.body.title,
//     content:req.body.content
//   });
//
//   newArticle.save(function(err){
//     if(!err)
//     {
//       res.send("Successfully added");
//     }
//     else
//     {
//       (err);
//     }
//   });
// })

//DELETE
// app.delete("/articles",function(req,res){
//   Article.deleteMany(function(err){
//     if(!err)
//     {
//       res.send("Successfully added");
//     }
//     else
//     {
//       (err);
//     }
//   })
// });


app.listen(3000, function(){

      console.log("Server Started Successfully");
});
