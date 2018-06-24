const express = require('express');
const router = express.Router();


router.get("/", function (req, res) {
    res.render("home")
})
router.get("/user/login", function (req, res) {
    res.render("userlogin")
})

// app.get("/admin/list", function (req, res) {
//     baza.find({}, function (err, wigni) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("index", {
//                 title: "wignebis baza",
//                 wignebi: wigni,
//             });
//         }
//     })
// });

router.get("/admin", function (req, res) {
    res.render("login")
})

router.post("/admin/tables", function (req, res) {

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


module.exports = router;