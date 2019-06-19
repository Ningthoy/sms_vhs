var passport = require('passport');
var User = require('../models/users');
var localStrgy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user);
    });
});
passport.use('local.signin', new localStrgy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, function(req, email, password, done){
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('password','Invalid Password').isLength({min: 4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(err){
                messages.push(err.msg);
        });
        return done(null,false,req.flash('error',messages));
    }
    User.findOne({'email':email},function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
           return  done(null, false, {message: 'User not found'});
        }
        if(!user.validatePassword(password)){
            return  done(null, false, {message: 'Password not correct'});
        }
        return done(null, user);
    });
}));
passport.use('local.signup',new localStrgy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},function(req, email, password, done){
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('password','Invalid Password').isLength({min: 4});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(err){
                messages.push(err.msg);
        });
        return done(null,false,req.flash('error',messages));
    }
    User.findOne({'email':email},function(err, user){
            if(err){
                return done(err);
            }
            if(user){
               return  done(null, false, {message: 'Email is already in use'});
            }
            var newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password); 
                
            newUser.save(function(err, result){
                    if(err){
                        return done(err);
                    }
                    if(result){
                        return done(null, newUser);
                    }
            });
    });
}));
passport.use(new GoogleStrategy({
    clientID: '27660355188-t7irekcusdv8381bvts9927vnmsaf0i1.apps.googleusercontent.com',
    clientSecret: '5sYL7Schu_8HU7s6nLhsqffc',
    callbackURL: "http://localhost:3000/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
            User.findOne({'email':profile.emails[0].value},function(err, user){
            if(err){
                return done(err);
            }
            if(user){
                return done(null, user);
            }
                var newUser = new User();
                newUser.email = profile.emails[0].value;
                newUser.photo = profile.photos[0].value;
                newUser.name = profile.displayName;
                //console.log(profile);
                newUser.password = newUser.encryptPassword('bilz'); 
                 newUser.save(function(err, result){
                    if(err){
                        return done(err);
                    }
                    if(result){
                        return done(null, newUser);
                    }
            });
    });
           
  }
));