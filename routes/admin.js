const express = require('express');
const router = express.Router();


router.get("/", function (req, res) {
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


router.get("/admin/login", function (req, res) {
    res.render("admin")
})

router.post("/admin/dashboard", function (req, res) {

    let newbook = new baza();

    newbook.title = req.body.satauri;
    newbook.avtori = req.body.avtori;
    newbook.janri = req.body.janri;

    newbook.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.render("admin")
        }
    })
})

module.exports = router;