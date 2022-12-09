const { body } = require('express-validator');
module.exports = {
    registerValidator: [
        // body('name')
        // .trim()
        // .isLength(2)
        // .withMessage('Name length short, min 2 char required')
        // .isAlpha(),
        // body('age')
        // .trim()
        // .isInt({ min: 0, max: 100 })
        // .withMessage('Age must be between 0 and 100')
        // .toInt(),
        body('username')
        .trim()
        .isLength({ min: 2, max: 20 })
        .withMessage('Username length short, min 2 char required')
        .isAlphanumeric(),
        body('password')
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage('Password length short, min 2 char required'),
    ],
};