const mongoose = require("mongoose");

// Creat our db and connect
mongoose.connect("mongodb://localhost/blog");

mongoose.connection.on("connected", () => {
  console.log("Mongoose has connected");
})

mongoose.connection.on("error", (err) => {
  console.log(err, "Mongoose has encountered an error");
})

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose has disconnected");
})
