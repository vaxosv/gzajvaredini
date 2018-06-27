const express = require('express');
const router = express.Router();
let baza = require("./../models/mwerlebi");
const bodyParser = require("body-parser");



// get req admin 
router.get("/", function (req, res) {
    res.render("login")
})

router.get("/dashboard", (req, res)=>{
    res.render("dashboard")
})
router.get("/tables", function (req, res) {
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


router.get("/addbook",function (req, res) {
    res.render("addbook")
})

//post req

router.post("/addbook",function (req, res) {

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