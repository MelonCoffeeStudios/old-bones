module.exports = function(app, passport, game) {
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user,
            game : game
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    app.get("/newchar", isLoggedIn, function(req, res){
      res.render('newchar.ejs', {
        user  : req.user,
        game  : game
      })
    });
    
    app.post("/newchar", isLoggedIn, function(req, res){
      var user = req.user
      user.local.char.name = req.body.char.name;
      user.local.char.race = req.body.char.race;
      user.local.char.class = req.body.char.class;
      user.local.char.lvl = 35;
      user.local.char.xp = 0;
      user.save(function(err){
        res.redirect("/profile")
      })
    });
    
    app.get("/destroychar", isLoggedIn, function(req, res){
      var user = req.user;
      user.local.char = undefined;
      user.save(function(err){
        res.redirect("/profile")
      })
    })
    
    app.get("/game", isLoggedIn, function(req, res) {
        res.render("game.ejs")
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) { //app.get = wait for a browser request at X url
        var user            = req.user;
        user.local.email    = undefined; //undefined = sets the variable to null
        user.local.password = undefined;
        user.local.char     = undefined;
        user.save(function(err) { // returns any error
            res.redirect('/profile'); //takes an authorised user to the appopriate page
        });
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
