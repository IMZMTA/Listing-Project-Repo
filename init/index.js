const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
};

const MONGO_URL = process.env.MONGO_URL;

main()
.then(() => {
    console.log("Connected to DB");
})
.catch(e => {
    console.log("Error : ", e);
    process.exit(1);
});

async function main(){
    try{
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch(e){
        console.log("Error : ",e);
    }
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner : "654726bcf0adfb9e3bdac0e0" }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();

//2nd Option

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listings.js");

// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// }

// // Define the main function first
// async function main() {
//     try {
//         await mongoose.connect("mongodb+srv://List-AirBnB:KR2TvJe2PAIkewjE@cluster0.icbc7xs.mongodb.net/AirBnB?retryWrites=true&w=majority", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to DB");
//     } catch (e) {
//         console.log("Error connecting to MongoDB:", e);
//         process.exit(1);
//     }
// }

// // Now call the main function
// main()
//     .then(() => {
//         // Once connected, initialize the database
//         initDB();
//     })
//     .catch((e) => {
//         console.log("Error: ", e);
//     });

// async function initDB() {
//     try {
//         await Listing.deleteMany({});
//         initData.data = initData.data.map((obj) => ({ ...obj, owner: "654726bcf0adfb9e3bdac0e0" }));
//         await Listing.insertMany(initData.data);
//         console.log("Data was initialized");
//     } catch (error) {
//         console.error("Error initializing data:", error);
//     } finally {
//         // Make sure to close the MongoDB connection when initialization is complete
//         mongoose.connection.close();
//     }
// }
