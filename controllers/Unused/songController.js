const express = require("express");
const router = express.Router();
const Song = require("../models/song");


// 1 Index
router.get("/", (req, res) => {
  Songs.find({}, (err, foundSongs) => {
    res.render("songs/index.ejs", {
      songs: foundSongs
    });
  });
});


//2 New
router.get("/new", (req, res) => {
  res.render("songs/new.ejs");
});


// 3 Show
router.get("/:id", (req, res) => {
  Song.findById(req.params.id, (err, foundSong) => {
    res.render("songs/show.ejs", {
      song: foundSong
    });
  });
});


// 4 Edit
router.get("/:id/edit", (req, res) => {
  Song.findById(req.params.id, (err, foundSong) => {
    res.render("songs/edit.ejs", {
      song: foundSong
    });
  });
});


// 5 Update
router.put("/:id", (req, res) => {
  Song.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedSong) => {
    console.log(updatedSong, " is the updated Song");
    res.redirect("/song")
  });
});


// 6 Create
router.post("/", (req, res) => {
  console.log(req.body);
  Song.create(req.body, (err, createdSong) => {
    console.log(createdSong, " is the created Song");
    res.redirect("/songs");
  });
});


// 7 Destroy
router.delete("/:id", (req, res) => {
  Song.findByIdAndRemove(req.params.id, (err, deletedSong) => {
    console.log(deletedSong, " is the deleted song");
    res.redirect("/songs")
  });
});


module.exports = router;
