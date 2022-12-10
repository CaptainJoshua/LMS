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

router.get('/dashboard/readingAndPhonics', async(req, res, next) => {
    const person = req.user;
    res.render('readingAndPhonics', { person });
});

//* routes for getting the pdf files for the lessons and activities for subjects 
// Start for Unit 1 Filipino
router.get('/dashboard/filipino/Unit1/lesson', async(req, res, next) => {
    const filePath = 'filipino/unit1/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/filipino/Unit1/activity', async(req, res, next) => {
    const filePath = 'filipino/unit1/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});
router.get('/dashboard/filipino/Unit1/quiz', async(req, res, next) => {
    const filePath = 'filipino/unit1/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit 1 Filipino

// Start for Unit 2 Filipino
router.get('/dashboard/filipino/Unit2/lesson', async(req, res, next) => {
    const filePath = 'filipino/unit2/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/filipino/Unit1/activity', async(req, res, next) => {
    const filePath = 'filipino/unit2/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});
router.get('/dashboard/filipino/Unit1/quiz', async(req, res, next) => {
    const filePath = 'filipino/unit2/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit 2 Filipino

// Start for Unit 3 Filipino
router.get('/dashboard/filipino/Unit3/lesson', async(req, res, next) => {
    // create a file path to the file in the filipino folder
    const filePath = 'filipino/unit3/LESSON1.pdf';
    // send the file to the browser
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/filipino/Unit3/activity', async(req, res, next) => {
    const filePath = 'filipino/unit3/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});
router.get('/dashboard/filipino/Unit3/quiz', async(req, res, next) => {
    const filePath = 'filipino/unit3/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit 3 Filipino

// Start for Unit 4 Filipino
router.get('/dashboard/filipino/Unit4/lesson', async(req, res, next) => {
    // create a file path to the file in the filipino folder
    const filePath = 'filipino/unit4/LESSON1.pdf';
    // send the file to the browser
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/filipino/Unit4/activity', async(req, res, next) => {
    const filePath = 'filipino/unit4/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});
router.get('/dashboard/filipino/Unit4/quiz', async(req, res, next) => {
    const filePath = 'filipino/unit4/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit 4 Filipino

// Start for Unit 5 Filipino
router.get('/dashboard/filipino/Unit5/lesson', async(req, res, next) => {
    // create a file path to the file in the filipino folder
    const filePath = 'filipino/unit5/LESSON1.pdf';
    // send the file to the browser
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/filipino/Unit5/activity', async(req, res, next) => {
    const filePath = 'filipino/unit5/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/filipino/Unit5/quiz', async(req, res, next) => {
    const filePath = 'filipino/unit5/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
//! End for Unit 5 Filipino

//* Start for Unit1 Math
router.get('/dashboard/math/Unit1/lesson', async(req, res, next) => {
    const filePath = 'math/unit1/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit1/activity', async(req, res, next) => {
    const filePath = 'math/unit1/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit1/quiz', async(req, res, next) => {
    const filePath = 'math/unit1/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit1 Math

// Start for Unit2 Math
router.get('/dashboard/math/Unit2/lesson', async(req, res, next) => {
    const filePath = 'math/unit2/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit2/activity', async(req, res, next) => {
    const filePath = 'math/unit2/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit2/quiz', async(req, res, next) => {
    const filePath = 'math/unit2/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit2 Math

// Start for Unit3 Math
router.get('/dashboard/math/Unit3/lesson', async(req, res, next) => {
    const filePath = 'math/unit3/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit3/activity', async(req, res, next) => {
    const filePath = 'math/unit3/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit3/quiz', async(req, res, next) => {
    const filePath = 'math/unit3/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit3 Math

// Start for Unit4 Math
router.get('/dashboard/math/Unit4/lesson', async(req, res, next) => {
    const filePath = 'math/unit4/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit4/activity', async(req, res, next) => {
    const filePath = 'math/unit4/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/math/Unit4/quiz', async(req, res, next) => {
    const filePath = 'math/unit4/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
//! End for Unit4 Math

//* Start for Unit1 Reading and Phonics
router.get('/dashboard/readingAndPhonics/Unit1/lesson', async(req, res, next) => {
    const filePath = 'phonics/unit1/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/readingAndPhonics/Unit1/activity', async(req, res, next) => {
    const filePath = 'phonics/unit1/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/readingAndPhonics/Unit1/quiz', async(req, res, next) => {
    const filePath = 'phonics/unit1/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit1 Reading and Phonics

// Start for Unit2 Reading and Phonics
router.get('/dashboard/readingAndPhonics/Unit2/lesson', async(req, res, next) => {
    const filePath = 'phonics/unit2/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/readingAndPhonics/Unit2/activity', async(req, res, next) => {
    const filePath = 'phonics/unit2/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/readingAndPhonics/Unit2/quiz', async(req, res, next) => {
    const filePath = 'phonics/unit2/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
// End for Unit2 Reading and Phonics

// Start for Unit3 Reading and Phonics
router.get('/dashboard/readingAndPhonics/Unit3/lesson', async(req, res, next) => {
    const filePath = 'phonics/unit3/LESSON1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/readingAndPhonics/Unit3/activity', async(req, res, next) => {
    const filePath = 'phonics/unit3/ACTIVITY1.pdf';
    res.sendFile(filePath, { root: './public' });
});

router.get('/dashboard/readingAndPhonics/Unit3/quiz', async(req, res, next) => {
    const filePath = 'phonics/unit3/QUIZ.pdf';
    res.sendFile(filePath, { root: './public' });
});
//! End for Unit3 Reading and Phonics

module.exports = router;