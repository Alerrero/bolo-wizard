const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "ARTIST"],
        default: "ARTIST"
    }
}, {
    timestamps: true
})


const User = mongoose.model("User", userSchema);

module.exports = {
    userSchema, User
}

