const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true},
    mobile: {type: Number, require: false},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

const userModel = mongoose.model("user", schema)

module.exports = userModel;