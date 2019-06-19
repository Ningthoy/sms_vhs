var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Cat = require('../models/category');

var csrfProtection = csrf({ cookie: true });
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});
router.get('/home', isLoggedIn, function(req, res, next) {
    res.render('user/home', { title: 'Admin home' });
});

router.get('/addcategory', isLoggedIn, function(req, res, next) {
    Cat.find({}, function(err, docs) {
        console.log(docs);
        res.render('user/addcategory', { title: 'Add Category', jsfile: 'js/addcat.js', cats: docs, csrfToken: req.csrfToken() });
    });
});


router.get('/getSub/:subId/:catId', isLoggedIn, function(req, res, next) {
    console.log('sucess');
    const subId = req.params.subId;
    const catId = req.params.catId;
    Cat.find({ _id: catId, 'subCats._id': subId }, { 'subCats.$': 1 }, function(err, docs) {
        if (err)
            console.log(err);
        else {
            console.log(docs[0].subCats[0]);
            res.json({ docs: docs[0].subCats[0] });
        }

    });
});


router.post('/saveSubCat', isLoggedIn, function(req, res, next) {
    if (req.body.id) {
        Cat.find({ _id: req.body.catId }, function(err, docs) {
            if (err) {
                res.json({ msg: "Something went wrong. Please try again", success: false });
            } else {
                if (docs.length > 0) {
                    Cat.update({ _id: req.body.catId, 'subCats._id': req.body.id }, {
                        '$set': {
                            'subCats.$.title': req.body.title,
                            'subCats.$.description': req.body.description
                        }
                    }, function(err, result) {
                        if (err)
                            res.json({ msg: "Something went wrong. Please try again", success: false });
                        else
                            res.json({ msg: "Sub Category has been Updated", cats: docs, success: true });
                    });
                }

            }
        });
    } else {
        Cat.find({ _id: req.body.catId }, function(err, docs) {
            if (err) {
                res.json({ msg: "Something went wrong. Please tryagain", success: false });
            } else {
                if (docs.length > 0) {
                    Cat.update({ _id: req.body.catId }, { $push: { subCats: { title: req.body.title, description: req.body.description } } }, function(err, result) {
                        if (err)
                            res.json({ msg: "Something went wrong. Please try again", success: false });
                        else
                            res.json({ msg: "Sub Category has been Added", cats: docs, success: true });
                    });
                }

            }
        });
    }
});


router.get('/subcategory/:cat', isLoggedIn, function(req, res, next) {
    Cat.find({ title: req.params.cat }, function(err, docs) {
        console.log(docs[0]);
        res.render('user/subcategory', { title: 'Sub Category', jsfile: 'js/subcat.js', cats: docs[0], csrfToken: req.csrfToken() });
    });
});

router.get('/items/:cat/:subcat', isLoggedIn, function(req, res, next) {
    Cat.find({ title: req.params.cat }, function(err, docs) {
        console.log(docs[0]);
        res.render('user/items', { title: 'Items', jsfile: 'js/subcat.js', cats: docs[0], csrfToken: req.csrfToken() });
    });
});

router.post('/saveCategory', isLoggedIn, function(req, res, next) {
    console.log("mmmm", req.body.id);
    console.log("lll");
    if (req.body.id) {
        Cat.findOneAndUpdate({ _id: req.body.id }, { $set: { title: req.body.title, description: req.body.description } }, { new: true }, function(err, docs) {
            console.log(docs);
            if (err) {
                res.json({ msg: "Something went wrong. Please tryagain", success: false });
            } else {
                Cat.find({}, function(err, docs) {
                    res.json({ msg: "Category has been Updated", cats: docs, success: true });
                });
            }
        })
    } else {
        new Cat({ title: req.body.title, description: req.body.description }).save(function(err) {
            if (err) {
                res.json({ msg: "Something went wrong. Please tryagain", success: false });
            } else {
                Cat.find({}, function(err, docs) {
                    res.json({ msg: "Category has been added", cats: docs, success: true });
                });
            }
        });
    }
});

router.get('/getCategory/:id', isLoggedIn, function(req, res, next) {
    const id = req.params.id;
    Cat.findById({ _id: id }, function(err, docs) {
        if (err)
            console.log(err);
        else {
            console.log(docs);
            res.json({ docs });
        }

    });
});

router.delete('/delete/:id', (req, res) => {
    Cat.deleteOne({ _id: req.params.id })
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.status.json({ err: err });
        });
});

router.get('/logout', function(req, res, next) {
    req.logOut();
    res.redirect('/user/signin', { title: 'Admin logout', layout: 'signlayout' });
});

router.get('/stockdisk', isLoggedIn, function(req, res, next) {
    res.render('user/stockdisk', { title: 'Stock Disk' });
});

router.get('/stockviewdisk', isLoggedIn, function(req, res, next) {
    res.render('user/stockview', { title: 'Stock View' });
});

router.get('/stockverificationdisk', isLoggedIn, function(req, res, next) {
    res.render('user/stockverification', { title: 'Stock Verification' });
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', { title: 'Admin Sign Up', layout: 'signlayout', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/login', { title: 'Admin Sign In', layout: 'signlayout', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/user/home',
    failureRedirect: '/user/signin',
    failureFlash: true,
}));

router.post('/saveuser', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true,
}));
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/signin' }),
    function(req, res) {
        res.redirect('/user/signup');
    });
module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/signin');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/home');
}