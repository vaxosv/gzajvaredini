const express = require('express');
const router = express.Router();
let baza = require("./../models/mwerlebi");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs')
const passport = require ('passport'); 

// get req admin 
router.get("/", function (req, res) {
    res.render("login")
})

router.get("/dashboard", (req, res) => {
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


router.get("/addbook", function (req, res) {
    res.render("addbook")
})

//post req




// file upload

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "-" + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('newwigni');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}


router.post("/addbook", upload, function (req, res) {

    let newbook = new baza();

    newbook.title = req.body.satauri;
    newbook.avtori = req.body.avtori;
    newbook.janri = req.body.janri;
    newbook.data = req.body.weli;

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (req.file == undefined) {
                console.log('Error: No File Selected!');
            } else {
                newbook.link = req.file.path

                newbook.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        res.render("addbook")
                    }
                })
            }
        }
    });


})


//admin config
const admin = require('./../models/adminmod.js');

router.get('/a', function (req, res) {
    res.render('adming')
})

router.post('/a', function (req, res) {
    const username = req.body.name;
    const password = req.body.pass;

    let newadmin = new admin({
        username: username,
        password: password
    })

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newadmin.password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                return
            }

            newadmin.password = hash
            newadmin.save(function (err) {
                if (err) {
                    console.log(err);
                    return
                } else {
                    res.redirect('/')
                }
            })
        });
    })

})


router.post('/', function (req, res, next) {
    passport.authenticate('local', {
        
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin',
    })(req, res, next);
});

// logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/admin');
});



module.exports = router;