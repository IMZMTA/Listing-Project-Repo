const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});

//Router.route
router.route("/")
  .get( wrapAsync(listingController.index))
  .post( isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

//New Route->Create
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router.route("/:id")
  .get( wrapAsync(listingController.showListing))
  .put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
  .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Get Route->Edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;


// //Index Route
// router.get("/", wrapAsync(listingController.index));

//  //Show Route->Read
//  router.get("/:id", wrapAsync(listingController.showListing));

//  //New Create Route->Create
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// //Update Route->Update
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// //Delete Route -> Delete
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));