const express = require("express");
const exphbs = require("express-handlebars");
const expressLess = require("express-less");

const app = express();
const port = 1337;
const handlebars = require("handlebars");
const resume = require("./cv.json");

app.engine("handlebars", exphbs());
app.use("/style", expressLess(__dirname + "/less"));
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

app.get("/", (req, res) => {
    res.render("resume", {
        ...resume,
        helpers: {
            "_": languageHelper("en")
        }
    });
});

app.listen(port, () => {
    console.log("Server started.");
});
