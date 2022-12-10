const User = require('../models/user.model');
const router = require('express').Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const registerValidator = require('../utils/validators');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcrypt');

router.get('/users', async(req, res, next) => {
    try {
        const users = await User.find();
        // res.send(users);
        res.render('manage-users', { users });
    } catch (error) {
        next(error);
    }
});


// for viewing the profile of the user by admin only
router.get('/user/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid id');
            res.redirect('/admin/users');
            return;
        }
        const person = await User.findById(id);
        res.render('profile', { person });
    } catch (error) {
        next(error);
    }
});

// get the form for updating the user by admin only
router.get('/user/update/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid id');
            res.redirect('/admin/users');
            return;
        }
        const person = await User.findById(id);
        res.render('update-user', { person });
    } catch (error) {
        next(error);
    }
});

// update an existing user by admin only
router.post('/user/update/:id', async(req, res, next) => {
    try {
        // save all the updated data, and if the password is updated, hash it
        const hashPassword = async(password) => {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            return password;
        }
        if (req.body.password) {
            req.body.password = await hashPassword(req.body.password);
        }
        const user = await User.findOneAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!user) return res.status(404).send('An error occurred while updating the user');
        res.redirect('/admin/users');

    } catch (error) {
        next(error);
    }
});

router.get('/register', async(req, res, next) => {
    res.render('register');
});

// ! registerValidator is not functioning properly yet  

router.post('/register', async(req, res, next) => {
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
            res.redirect('/');
            return;
        }
        const user = new User(req.body);
        await user.save();
        req.flash(
            'success',
            `${user.name} registered successfully, they can now login`
        );
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});

// route for deleting a user by admin only
router.get('/user/delete/:id', async(req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid id');
            res.redirect('/admin/users');
            return;
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).send('An error occurred while deleting the user');
        res.redirect('/admin/users');
    } catch (error) {
        next(error);
    }
});

// Gonna do later the following: 
// 1. Delete user
// 2. Update user
// 3. Upload image
// 4. Delete image

module.exports = router;