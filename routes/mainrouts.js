const express = require('express');
const router = express.Router();
let baza = require("./../models/mwerlebi");
const bodyParser = require("body-parser");


//get req user
router.get("/", function (req, res) {
    res.render("home")
})
router.get("/user/login", function (req, res) {
    res.render("userlogin")
})


// get req admin 
router.get("/admin", function (req, res) {
    res.render("login")
})

router.get("/admin/dashboard", (req, res)=>{
    res.render("dashboard")
})

router.get("/admin/home", (req, res)=>{
    res.render("home")
})
router.get("/admin/login", (req, res)=>{
    res.render("login")
})
router.get("/admin/tables", function (req, res) {
    baza.find({}, function (err, wigni) {
        if (err) {
            console.log(err);
        } else {
            res.render("tables", {
                title: "wignebis baza",
                wignebi: wigni,
            });
        }
    })
})
router.get("/admin/userprofile", (req, res)=>{
    res.render("userprofile")
})

router.get("/admin/addbook",function (req, res) {
    res.render("addbook")
})



//post req

router.post("/admin/addbook",function (req, res) {

    let newbook = new baza();

    newbook.title = req.body.satauri;
    newbook.avtori = req.body.avtori;
    newbook.janri = req.body.janri;
    newbook.data = req.body.weli;

    newbook.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render("addbook")
        }
    })
})


module.exports = router;