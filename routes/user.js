const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
.route("/signup")
.get( userController.renderSignup )
.post( wrapAsync(userController.Signup));

router
.route("/login")
.get( userController.renderLogin)
.post( saveredirectUrl , passport.authenticate('local', {failureRedirect : "/login", failureFlash : true }) , userController.Login);

router.get("/logout", userController.Logout);

module.exports = router;