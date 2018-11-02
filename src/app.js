const express = require("express");
const exphbs = require("express-handlebars");
const expressLess = require("express-less");

const app = express();
const handlebars = require("handlebars");
const resume = require("./data/cv.json");
const config = require("./data/config.json");

const helpers = require("./helpers");

app.engine("handlebars", exphbs({
    defaultLayout: "default"
}));

app.use("/style", expressLess(__dirname + "/../less"));
app.use("/assets", express.static(__dirname + "/../assets"));
app.set("view engine", "handlebars");

const languages = Object.keys(config.uiLanguages);

for (const language of languages) {
    app.get(`/${language}/`, (req, res) => {
        const styleName = req.query.theme || "modern";

        res.render(styleName, {
            ...resume,
            ...config,
            styleName,
            helpers: {
                "_": helpers.languageHelper(language),
                "url": helpers.urlHelper
            }
        });
    });    
}

module.exports = app;
