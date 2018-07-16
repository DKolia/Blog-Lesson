const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser")
require("./db/db");


app.use(bodyParser.urlencoded({extended: false}));


const authorController = require("./controllers/authorController.js");
app.use("/authors", authorController);

app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
  console.log("app is running on port 3000");
})
