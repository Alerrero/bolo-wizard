const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
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
        default: "ADMIN"
    }
}, {
    timestamps: true
})

const Admin = mongoose.model("Admin", artistSchema);

module.exports = Admin;