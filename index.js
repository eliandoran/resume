const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 1337;
const handlebars = require("handlebars");
const resume = require("./cv.json");

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.render("resume", resume);
});

app.listen(port, () => {
    console.log("Server started.");
});
