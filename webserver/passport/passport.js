const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../routes/users/userEntity');

passport.serializeUser(function(user, done) {
  console.log("serializeUser",user);

 done(null, user);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser",id);
  users.findById(id, function(err, user) {
 done(err, user);
});
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
      console.log("in side local stratagy" ,email,password,req.body);
        process.nextTick(function() {
          console.log("in side local stratagy 1");

            users.findOne({
                email: email
            }, function(err, user) {
              console.log("in side local stratagy 2 " , user);

                if (err) {
                    return done(err);
                } else if (!user) {
                  console.log("in side local stratagy 3");
                    const error = new Error('Your Email ID is not registered');
                    error.name = 'You have not Registered Yet! Please Sign Up first';
                    return done(error.name);
                } else if (!user.validPassword(password)) {
                    console.log(user ,'validatepassword');
                    const error = new Error('Incorrect password');
                    error.name = 'Please enter correct password!';
                    return done(error.name);;
                } else if(!user.isEmailVerified){
                  const error = new Error('Your Email Id is not varified');
                  error.name = 'Please varify your mail id!';
                    return done(error.name);
                } else {
                    let userData = {};
                    userData._id = user._id;
                    userData.email = user.email;
                    userData.fname = user.fname;
                    userData.lname = user.lname;
                    users.findOne({
                        email: userData.email
                    }, function(err0, user) {
                        if (err0) {
                        } else {
                            user.loggedinStatus = true;
                            user.save(function(err1)
                            {
                                if(err1)
                                {
                                    console.log(err1);
                                }
                            });
                        }
                    });

                    return done(null, userData);
                }
                /* eslint-enable*/
            });
        });
    }));
    module.exports = passport;
