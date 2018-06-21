const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
let baza = require("./models/mwerlebi")
const mlab = require("./config")


mongoose.connect(mlab.dbLink);
let db = mongoose.connection;

db.once('open', function () {
    console.log("connected to mongodb");
})
db.on("error", function (err) {
    console.log(err);
})
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "pug");
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.get("/admin", function (req, res) {
    baza.find({}, function (err, wigni) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                title: "wignebis baza",
                wignebi: wigni,
            });
        }
    })
});
app.get("/admin/", function (req, res) {
    res.send("hi")
})

app.get("/admin/", function (req, res) {
    res.render("login")
})

app.post("/admin/tables", function (req, res) {

    let newbook = new baza();

    newbook.title = req.body.satauri;
    newbook.avtori = req.body.avtori;
    newbook.janri = req.body.janri;

    newbook.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render("dashboard")
        }
    })
})


app.listen(process.env.PORT || 80, function () {
    console.log("app run in port 80");
})