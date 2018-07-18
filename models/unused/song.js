const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  singer: [singerSchema]
  lyrics: String
});

const Singer = mongoose.model("Singer", singerSchema);

module.exports = mongoose.model("Song", songSchema);
