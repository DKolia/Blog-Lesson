const mongoose = require("mongoose");

const singerSchema = mongoose.Schema({
  name: String
  song: [songSchema]
});

module.exports = mongoose.model("Singer", sincerSchema);
