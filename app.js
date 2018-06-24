const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mainRouter = require("./routes/mainrouts")
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


app.use('/',mainRouter);


app.listen(process.env.PORT || 80, function () {
    console.log("app run in port 80");
})