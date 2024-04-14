if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path  = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = process.env.MONGO_URL;

const PORT = process.env.PORT || 8085;

async function main(){
    try{
        await mongoose.connect(MONGO_URL,
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }
        )
    }
    catch(e){
        console.log("Error : ",e);
    }
};

main().then(() => {
    console.log("Connected to DB");
}).catch(e => {
    console.log("Error : ", e);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl:MONGO_URL,
    crypto:{
        secret:"myfinesupersecre",
    },
    touchAfter:24*60*60,
});

store.on("error",()=>{
    console.log("Error in Mongo Session store", err);
});

const sessionOptions = {
    store : store,
    secret : "myfinesupersecret",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/", (req,res)=>{
    res.render("listing/home.ejs");
});

// app.get("/login", async(req,res)=>{
//     let fakeUser = new User({
//         email : "abc@gmail.com",
//         username : "deltapo",
//     });

//     let regUser = await User.register(fakeUser, "HeyBoy");
//     res.send(regUser);
// });

app.use("/listing", listingRouter);
app.use("/listing/:id/review", reviewRouter);
app.use("/", userRouter);

// app.get("/testlisting", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "By the Beach",
//         price: 1800,
//         location: "U.P",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");

// });

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res,next) => {
    let { status=500, msg="Something went wrong"} = err;
    res.status(status).render("error.ejs",{msg,err});
});

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});
