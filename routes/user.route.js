const router = require('express').Router();

router.get('/profile', async(req, res, next) => {
    // console.log(req.user);
    const person = req.user;
    res.render('profile', { person });
});

router.get('/dashboard', async(req, res, next) => {
    const person = req.user;
    res.render('dashboard', { person });
});

router.get('/dashboard/english', async(req, res, next) => {
    const person = req.user;
    res.render('english', { person });
});

router.get('/dashboard/math', async(req, res, next) => {
    const person = req.user;
    res.render('math', { person });
});

router.get('/dashboard/filipino', async(req, res, next) => {
    const person = req.user;
    res.render('filipino', { person });
});

router.get('/dashboard/readPhonics', async(req, res, next) => {
    const person = req.user;
    res.render('readPhonics', { person });
});

module.exports = router;