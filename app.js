const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const connectFlash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo'); //* Alternative solution for v4.6.0
const { ensureLoggedIn } = require('connect-ensure-login');
const { roles } = require('./utils/constants');

// Initialization
const app = express();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// folder for static files (css, js, images) 
app.use(express.static('public'));
// folder for uploaded files/images
app.use(express.static('uploads'));


// Init session 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, }, // secure: true, will be added later once we have https enabled on or deployed app 
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI, }),
}));
// For Passport JS Authentication, need to be after session initialization 
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// Connect Flash
app.use(connectFlash());
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use('/user', ensureLoggedIn({ redirectTo: '/auth/login' }), require('./routes/user.route'));
app.use('/admin', ensureLoggedIn({ redirectTo: '/auth/login' }), ensureAdmin, require('./routes/admin.route'));

// 404 Handler
app.use((req, res, next) => {
    next(createHTTPError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
    error.status = error.status || 500;
    res.status(error.status);
    res.render('error_40x', { error })
})

// Server
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}).catch((err) => console.log(err.message));

// Helper Functions
function ensureAdmin(req, res, next) {
    if (req.user.role === roles.admin) {
        next();
    } else {
        req.flash('warning', 'You are not authorized to see this page/route.')
        res.redirect('/');
    }
}

// function ensureAcademe(req, res, next) {
//     if (req.user.role === roles.academe) {
//         next();
//     } else {
//         req.flash('warning', 'You are not authorized to see this page/route.')
//         res.redirect('/');
//     }
// }

// function ensureStudent(req, res, next) {
//     if (req.user.role === roles.student) {
//         next();
//     } else {
//         req.flash('warning', 'You are not authorized to see this page/route.')
//         res.redirect('/');
//     }
// }