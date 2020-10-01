const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const { sendEmail } = require("./ses.js");
const email = `rapposelli.giacomo@gmail.com`;

app.use(express.static(__dirname + "/public"));
app.use(compression());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("*", (req, res) => {
    res.redirect("/");
});

app.post("/contact", (req, res) => {
    sendEmail(
        email,
        req.body.subject,
        `From: ${req.body.name}     ${req.body.email} Text: ${req.body.text}`
    );
});

app.listen(process.env.PORT || 3000, function () {
    console.log("I'm listening.");
});
