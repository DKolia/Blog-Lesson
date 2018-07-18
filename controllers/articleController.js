const express = require("express");
const router = express.Router();
const Article = require("../models/articles");
const Author = require("../models/authors")

// 1 Index
router.get("/", (req, res) => {
  Article.find({}, (err, foundArticles) => {
    res.render("articles/index.ejs", {
      articles: foundArticles
    });
  });
});


//2 New
router.get("/new", (req, res) => {
  Author.find({}, (err, allAuthors) => {
    console.log();
    res.render("articles/new.ejs", { authors: allAuthors });
  })
});


// 3 Show
router.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, foundArticle) => {
    console.log("---------------------article:-----------------------");
    console.log(foundArticle);
    console.log("--------------------------------------------");
    Author.findOne({"articles._id": req.params.id}, (err, foundAuthor) => {
      console.log("-------------------author:-------------------------");
      console.log(foundAuthor);
      console.log("--------------------------------------------");

      res.render("articles/show.ejs", {article: foundArticle, author: foundAuthor});
    });
  });
});


// 4 Edit
router.get("/:id/edit", (req, res)=>{
	Article.findById(req.params.id, (err, foundArticle)=>{
		Author.find({}, (err, allAuthors)=>{
			Author.findOne({"articles._id":req.params.id}, (err, foundArticleAuthor)=>{
				res.render('articles/edit.ejs', {
					article: foundArticle,
					authors: allAuthors,

					articleAuthor: foundArticleAuthor
				});


			});
		});
	});
});


// 5 Update
router.put('/:id', (req, res)=>{
    Article.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedArticle)=>{
        Author.findOne({ 'articles._id' : req.params.id }, (err, foundAuthor)=>{
		if(foundAuthor._id.toString() !== req.body.authorId){
			foundAuthor.articles.id(req.params.id).remove();
			foundAuthor.save((err, savedFoundAuthor)=>{
				Author.findById(req.body.authorId, (err, newAuthor)=>{
					newAuthor.articles.push(updatedArticle);
					newAuthor.save((err, savedNewAuthor)=>{
			        	        res.redirect('/articles/'+req.params.id);
					});
				});
			});
		} else {
			foundAuthor.articles.id(req.params.id).remove();
			foundAuthor.articles.push(updatedArticle);
			foundAuthor.save((err, data)=>{
		                res.redirect('/articles/'+req.params.id);
			});
		}
        });
    });
});

// Create
router.post("/", (req, res) => {
  Author.findById(req.body.authorId, (err, foundAuthor) => {
    Article.create(req.body, (err, createdArticle) => {

      foundAuthor.articles.push(createdArticle);
      foundAuthor.save((err, data) => {
        res.redirect("/articles");
      });
    });
  });
});


// 7 Destroy
router.delete("/:id", (req, res) => {
  Article.findByIdAndRemove(req.params.id, (err, foundArticle) => {
    Author.findOne({"articles._id":req.params.id}, (err, foundAuthor) => {
      foundAuthor.articles.id(req.params.id).remove();
      foundAuthor.save((err, data)=> {
        res.redirect("/articles");
      });
    });
  });
});


module.exports = router;
