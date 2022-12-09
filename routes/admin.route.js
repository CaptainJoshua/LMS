const User = require('../models/user.model');
const router = require('express').Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const registerValidator = require('../utils/validators');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const fs = require('fs');

router.get('/users', async(req, res, next) => {
    try {
        const users = await User.find();
        // res.send(users);
        res.render('manage-users', { users });
    } catch (error) {
        next(error);
    }
});

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

router.post('/update-role', async(req, res, next) => {
    try {
        const { id, role } = req.body;

        // Checking for id and roles in req.body
        if (!id || !role) {
            req.flash('error', 'Invalid request');
            return res.redirect('back');
        }

        // Check for valid mongoose objectID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid id');
            return res.redirect('back');
        }

        // Check for Valid role
        const rolesArray = Object.values(roles);
        if (!rolesArray.includes(role)) {
            req.flash('error', 'Invalid role');
            return res.redirect('back');
        }

        // Admin cannot remove himself/herself as an admin
        if (req.user.id === id) {
            req.flash(
                'error',
                'Admins cannot remove themselves from Admin, ask another admin.'
            );
            return res.redirect('back');
        }

        // Finally update the user
        const user = await User.findByIdAndUpdate(
            id, { role }, { new: true, runValidators: true }
        );

        req.flash('info', `updated role for ${user.username} to ${user.role}`);
        res.redirect('back');
    } catch (error) {
        next(error);
    }
});

router.get(
    '/register',
    // ensureLoggedOut({ redirectTo: '/' }),
    async(req, res, next) => {
        res.render('register');
    }
);

router.post(
    '/register',
    // ensureLoggedOut({ redirectTo: '/' }),
    // registerValidator,
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
    }
);

// Gonna do later the following: 
// 1. Delete user
// 2. Update user
// 3. Upload image
// 4. Delete image

module.exports = router;