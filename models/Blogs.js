const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model("blogs", blogSchema)