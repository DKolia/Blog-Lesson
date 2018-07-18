const express = require("express");
const router = express.Router();
const Singer = require("../models/singer");


// 1 Index
router.get("/", (req, res) => {
  Singer.find({}, (err, foundSinger) => {
    res.render("singers/index.ejs", {
      singers: foundSinger
    })
  })
});


//2 New
router.get("/new", (req, res) => {
  res.render("singers/new.ejs");
});


// 3 Show
router.get("/:id", (req, res) => {
  Singer.findById(req.params.id, (err, foundSinger) => {
    res.render("singers/show.ejs", {
      singer: foundSinger
    });
  });
});


// 4 Edit
router.get("/:id/edit", (req, res) => {

  Singer.findById(req.params.id, (err, foundSinger) => {
    res.render("Singers/edit.ejs", {
      singer: foundSinger
    });
  });
});


// 5 Update
router.put("/:id", (req, res) => {
  Singer.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedSinger) => {
        console.log(updatedSinger, " this is updated Singer");
        res.redirect("/singers")
      });
    });


// 6 Create
router.post("/", (req, res) => {
  console.log(req.body);
  Singer.create(req.body, (err, createdSinger) => {
    console.log(createdSinger, " is the created Singer");
    res.redirect("/singers");
  });
});


// 7 Destroy
router.delete("/:id", (req, res) => {
  Singer.findByIdAndRemove(req.params.id, (err, deletedSinger) => {
    console.log(deletedSinger, " is the deleted Singer");
    res.redirect("/singers")
  });
});



module.exports = router;
