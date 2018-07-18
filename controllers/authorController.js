const express = require("express");
const router = express.Router();
const Author = require("../models/authors.js");
const Article = require("../models/articles.js");

// 1 Index
router.get("/", (req, res) => {
  Author.find({}, (err, foundAuthors) => {
    res.render("authors/index.ejs", {
      authors: foundAuthors
    })
  })
});


//2 New
router.get("/new", (req, res) => {
  res.render("authors/new.ejs");
});


// 3 Show
router.get("/:id", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    console.log()
    console.log("foundAuthor is here--------------(author show route)")
    console.log(foundAuthor);
    res.render("authors/show.ejs", {author: foundAuthor});
  });
});


// 4 Edit
router.get("/:id/edit", (req, res) => {

  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render("authors/edit.ejs", {
      author: foundAuthor
    });
  });
});


// 5 Update
router.put("/:id", (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAuthor) => {
        console.log(updatedAuthor, " this is updatedAuthor");
        res.redirect("/authors")
      });
    });


// 6 Create
router.post("/", (req, res) => {
  console.log(req.body);
  Author.create(req.body, (err, createdAuthor) => {
    console.log(createdAuthor, " is the created Author");
    res.redirect("/authors");
  });
});


// 7 Destroy
router.delete("/:id", (req, res) => {
  Author.findByIdAndRemove(req.params.id, (err, foundAuthor) => {
    const articleIds = [];
    for (let i = 0; i < foundAuthor.articles.length; i++) {
      articleIds.push(foundAuthor.articles[i]._id);
    }
    Article.remove(
      {
        _id : {
          $in: articleIds
        }
			},
			(err, data)=>{
				res.redirect('/authors');
			}
		);
	});
});



module.exports = router;
