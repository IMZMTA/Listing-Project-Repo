const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//Reviews -> Post review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

//Delete Reviews -> Post review
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;