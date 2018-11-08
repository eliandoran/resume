const express = require("express");
const expressHandlebars = require("express-handlebars");
const expressLess = require("express-less");

const helpers = require("./helpers");
const resume = require("./data/cv.json");
const config = require("./data/config.json");

const app = express();

app.engine("handlebars", expressHandlebars({
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
                "url": helpers.urlHelper,
                "formatDate": helpers.momentHelper(language),
                "educationHeader": helpers.educationHeaderHelper(language)
            }
        });
    });    
}

module.exports = app;
