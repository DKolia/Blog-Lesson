const express = require("express");
const router = express.Router();
const Article = require("../models/articles");
const Author = require("../models/authors")

// // 1 Index
// router.get("/", (req, res) => {
//   Article.find({}, (err, foundArticles) => {
//     res.render("articles/index.ejs", {
//       articles: foundArticles
//     });
//   });
// });

// 1 Index
router.get("/", async (req, res, next) => {

  try {
    const foundArticles = await Article.find({});
    res.render("articles/index.ejs", {
      articles: foundArticles
    });

  } catch (err) {
    console.log(err);
    next(err);
  }
});


//2 New
router.get("/new", (req, res) => {
  Author.find({}, (err, allAuthors) => {
    console.log();
    res.render("articles/new.ejs", { authors: allAuthors });
  })
});


// // 3 Show
router.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, foundArticle) => {
    Author.findOne({"articles._id": req.params.id}, (err, foundAuthor) => {
      res.render("articles/show.ejs", {
        article: foundArticle, author: foundAuthor
      });
    });
  });
});


// 3 Show -- done -- you may delete
// router.get("/:id", (req, res) => {
//   Article.findById(req.params.id, (err, foundArticle) => {
//
//     res.render("./articles/show.ejs", {
//       article: foundArticle
//     });
//   });
// });


// 4 Edit
// router.get("/:id/edit", (req, res)=>{
// 	Article.findById(req.params.id, (err, foundArticle)=>{
// 		Author.find({}, (err, allAuthors)=>{
// 			Author.findOne({"articles._id":req.params.id}, (err, foundArticleAuthor)=>{
// 				res.render('articles/edit.ejs', {
// 					article: foundArticle,
// 					authors: allAuthors,
//
// 					articleAuthor: foundArticleAuthor
// 				});
//
//
// 			});
// 		});
// 	});
// });

// 4 Edit
router.get("/:id/edit", async (req, res)=>{

  try {
    const foundArticle = await Article.findById(req.params.id);
    res.render("edit.ejs", {
      article: foundArticle
    });

  } catch (err) {
    res.send(err)
  }
});



// // 5 Update
// router.put('/:id', (req, res)=>{
//     Article.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedArticle)=>{
//         Author.findOne({ 'articles._id' : req.params.id }, (err, foundAuthor)=>{
// 		if(foundAuthor._id.toString() !== req.body.authorId){
// 			foundAuthor.articles.id(req.params.id).remove();
// 			foundAuthor.save((err, savedFoundAuthor)=>{
// 				Author.findById(req.body.authorId, (err, newAuthor)=>{
// 					newAuthor.articles.push(updatedArticle);
// 					newAuthor.save((err, savedNewAuthor)=>{
// 			        	        res.redirect('/articles/'+req.params.id);
// 					});
// 				});
// 			});
// 		} else {
// 			foundAuthor.articles.id(req.params.id).remove();
// 			foundAuthor.articles.push(updatedArticle);
// 			foundAuthor.save((err, data)=>{
// 		                res.redirect('/articles/'+req.params.id);
// 			});
// 		}
//         });
//     });
// });

// 5 Update
router.put('/:id', async (req, res)=>{

  try {
    const updatedArticle = await  Article.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect("/articles");
  } catch (err) {
    res.send(err);
  }
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

// // 6 Create
// router.post("/", async (req, res) => {
//
//   try {
//     const createdArticle = await Article.create(req.body);
//     console.log(createdArticle, " this is the createdArticle");
//     // Author.findById() -- 13 -await
//     const foundAuthor = await Author.findById(req.body.authorId)
//     createdArticle.push.foundAuthor
//     // save() -- await
//     foundAuthor.save((err, data) = {
//       res.redirect("/articles");
//     })
//   } catch (err){
//     res.send(err)
//   }
// });

// // 7 Destroy
// router.delete("/:id", (req, res) => {
//   Article.findByIdAndRemove(req.params.id, (err, foundArticle) => {
//     Author.findOne({"articles._id":req.params.id}, (err, foundAuthor) => {
//       foundAuthor.articles.id(req.params.id).remove();
//       foundAuthor.save((err, data)=> {
//         res.redirect("/articles");
//       });
//     });
//   });
// });

// 7 Destroy
router.delete("/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndRemove(req.params.id);
    res.redirect("/articles")
  } catch (err) {
    res.send(err)
  }
});


module.exports = router;
