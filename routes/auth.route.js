const router = require('express').Router();
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const { registerValidator } = require('../utils/validators');
const multer = require('multer');
const fs = require('fs');

// image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image');
// 
// const fileFilter = (req, file, cb) => {
//      reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };


router.get('/login', ensureLoggedOut({ redirectTo: '/' }), async(req, res, next) => {
    res.render('login');
});

router.post('/login', ensureLoggedOut({ redirectTo: '/' }),
    passport.authenticate('local', {
        // successRedirect: '/',
        successReturnToOrRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
    }));

router.get('/register', ensureLoggedOut({ redirectTo: '/' }), async(req, res, next) => {
    res.render('register');
});

router.post('/register', upload, //registerValidator,
    ensureLoggedOut({ redirectTo: '/' }),
    async(req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.array().forEach((error) => {
                    req.flash('error', error.msg);
                });
                res.render('register', {
                    username: req.body.username,
                    messages: req.flash(),
                });
                return;
            }

            const { username } = req.body;
            const doesExist = await User.findOne({ username });
            if (doesExist) {
                req.flash('warning', 'Username/email already exists');
                res.redirect('/auth/register');
                return;
            }
            const user = new User(req.body, req.file ? req.file.filename : null);
            await user.save();
            req.flash(
                'success',
                `${user.username} registered successfully, you can now login`
            );
            res.redirect('/auth/login');
        } catch (error) {
            next(error);
        }
    }
);

router.get('/logout', ensureLoggedIn({ redirectTo: '/' }), async(req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        };
        res.redirect('/');
    });
});

module.exports = router;

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/auth/login');
//   }
// }

// function ensureNOTAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.redirect('back');
//   } else {
//     next();
//   }
// }