const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const methodOverride = require("method-override");



require("./db/db");

// This sets up middleware
app.use(methodOverride("_method"));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser()); // This was suggested by a Stack Overflow thread, didn't solve the issue.
// https://stackoverflow.com/questions/18542329/typeerror-cannot-read-property-id-of-undefined
// app.use(express);  // I added this as a stack overflow suggested my "Cannot read property '_id' of undefined" was possibly due to not using express. Upon adding this, my servers stopped connecting.

const authorController = require("./controllers/authorController.js");
app.use("/authors", authorController);


const articleController = require("./controllers/articleController.js");
app.use("/articles", articleController);


app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
  console.log("app is running on port 3000");
})
