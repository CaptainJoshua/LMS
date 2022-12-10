const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const { roles } = require('../utils/constants');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: Date, required: true },
    role: { type: String, enum: [roles.admin, roles.academe, roles.student], default: roles.student },
    gender: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    // Fields not required for registration but for profile update only (optional) 
    grlvl: { type: String, required: false },
    section: { type: String, required: false },
    studnum: { type: String, required: false },
    mobile: { type: String, required: false },
    subjects: [{ type: String, required: false }],
    created: { type: Date, default: Date.now, required: true },
});

UserSchema.pre('save', async function(next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            if (this.username === process.env.ADMIN_USERNAME) {
                this.role = roles.admin;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw createHttpError.InternalServerError(error.message);
    }
};

const User = mongoose.model('user', UserSchema);
module.exports = User;