const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.Signup = async (req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({username, email});

        const regUser = await User.register(newUser, password);
        // res.send(regUser);
        req.login(regUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", `${username} is registered, Welcome to WanderLust`);
            res.redirect("/listing");
        });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = async(req, res) => {
    res.render("user/login.ejs");
};

module.exports.Login = async(req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    // if(res.locals.redirectUrl){
    //     return res.redirect(res.locals.redirectUrl);
    // }
    // res.redirect("/listing");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
};

module.exports.Logout = (req,res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out successfully");
        res.redirect("/listing");
    });
};