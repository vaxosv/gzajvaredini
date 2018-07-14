const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const mainRouter = require("./routes/mainrouts");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const clean = require("./clean");
const database = require('./config/database')
const passport = require('passport');
// const expressValidator = require('express-validator');


var session = require('express-session')


//db set
mongoose.connect(database.database);
let db = mongoose.connection;
db.once('open', clean.mongoconnect)
db.on("error", clean.mongoerr)

//view engine
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "pug");
app.use('/public', express.static('public'))

//body oarser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//validatoris middlware must insert !!!

//pasport
app.use(session({secret: 'keyboard cat'})) 
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session())




//routing

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);



//ports
app.listen(process.env.PORT || 80, clean.portcallback)