const express = require("express");
const exphbs = require("express-handlebars");
const expressLess = require("express-less");

const app = express();
const port = 1337;
const handlebars = require("handlebars");
const resume = require("./cv.json");
const config = require("./config.json");

app.engine("handlebars", exphbs());
app.use("/style", expressLess(__dirname + "/less"));
app.use("/assets", express.static(__dirname + "/assets"));
app.set("view engine", "handlebars");

function languageHelper(language) {
    return (text) => {
        if (text === undefined)
            return undefined;

        if (text[language] !== undefined)
            return text[language];
        
        return text;
    }
}

function urlHelper(url) {
    return /(?<=:\/\/).+/.exec(url);
}

app.get("/", (req, res) => {
    res.render("classic", {
        ...resume,
        ...config,
        helpers: {
            "_": languageHelper("en"),
            "url": urlHelper
        }
    });
});

app.get("/ro/", (req, res) => {
    res.render("classic", {
        ...resume,
        ...config,
        helpers: {
            "_": languageHelper("ro"),
            "url": urlHelper
        }
    });
});

app.get("/modern/", (req, res) => {
    res.render("modern", {
        ...resume,
        ...config,
        helpers: {
            "_": languageHelper("en"),
            "url": urlHelper
        }
    });
});


app.listen(port, () => {
    console.log("Server started.");
});
