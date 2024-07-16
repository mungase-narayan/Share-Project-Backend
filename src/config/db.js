const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/share-project";

const initDb = async() =>{
    if(!DB_URL) throw Error("Db not connected!");
    await mongoose.connect(DB_URL);
    console.log("DB connected successfully");    
}
module.exports = initDb;