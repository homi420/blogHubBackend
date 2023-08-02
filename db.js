const mongoose = require("mongoose")
const mongoUri = "mongodb://127.0.0.1:27017/blog"

const connectToMongo = () => {
    mongoose.connect(mongoUri).then(() => {
        console.log("Mongodb Connected Succesfully")
    }).catch(() => { console.log("Failed To Connect With Mongodb") })
}
module.exports = connectToMongo;