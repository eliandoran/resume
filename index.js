const express = require("express");
const app = express();
const port = 1337;

app.get("/", (req, res) => {
    res.send("Resume goes here.");
});

app.listen(port, () => {
    console.log("Server started.");
});
