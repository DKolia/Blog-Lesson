const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", (req, res) => {
  Author.find({}, (err, foundAuthors) => {
    res.render("authors/index.ejs", {
      authors: foundAuthors
    })
  })
});

router.get("/new", (req, res) => {
  res.render("authors/new.ejs");
});

router.get("/:id", (req, res) => {
  Author.findById(req.params.id, (err, foundAuthor) => {
    res.render("authors/show.ejs", {
      author: foundAuthor
    });
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  Author.create(req.body, (err, createdAuthor) => {
    console.log(createdAuthor, " is the createdAuthor");
    res.redirect("/authors");
  });
});

module.exports = router;
