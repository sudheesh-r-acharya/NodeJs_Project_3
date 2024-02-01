const mongoose = require("mongoose");

const userModels = new mongoose.Schema({
    username : String,
    age : Number,
    dob : String,
    condition : String,
    Tablet : String,
});

const user = mongoose.model("user" , userModels);

module.exports = user;